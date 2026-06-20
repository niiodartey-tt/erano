import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { requireState, StateValidationError } from "@/lib/validateState";
import { calculatePaymentDeadline } from "@/lib/businessDays";
import { sendEmail } from "@/lib/email";
import { AgreementAcceptedEmail, subject as emailSubject } from "@/emails/AgreementAcceptedEmail";
import { render } from "@react-email/render";
import { verifyCsrfOrigin } from "@/lib/csrf";
import { agreementRatelimit } from "@/lib/ratelimit";

const SEED_CONTENT = "1. Introduction and Acceptance. These Terms & Conditions (\"Terms\") govern the engagement between Erano Consulting (\"Erano,\" \"we,\" \"us,\" or \"our\") and any client who registers for, accesses, or uses Erano's services, including the client portal (\"Client,\" \"you,\" or \"your\"). By creating an account, accepting these Terms during onboarding, or otherwise engaging Erano's services, you agree to be bound by these Terms. If you do not agree to these Terms, you should not proceed with onboarding or use of the client portal. 2. Scope of Services. Erano provides accounting, financial advisory, and related consultancy services to businesses and individuals (the \"Services\"). The specific scope, deliverables, and timeline for Services provided to you will be set out in your selected service package, invoice, or a separate engagement letter (\"Engagement Details\"). Erano reserves the right to determine the appropriate methodology, personnel, and approach for delivering the Services, in line with applicable professional standards. 3. Fees and Payment. Fees for Services are set out in the applicable invoice or Engagement Details and are payable in the currency specified. Payment is due by the date specified on the invoice unless otherwise agreed in writing. Erano accepts payment via bank transfer to the account details provided on the invoice. Where a Client submits proof of payment, Erano will confirm receipt within a reasonable time. Services or deliverables tied to a specific payment milestone may be withheld until payment is confirmed. Erano reserves the right to suspend Services for accounts with overdue payments, following reasonable notice to the Client. 4. Client Obligations. You agree to: provide accurate, complete, and timely information and documentation reasonably required for Erano to perform the Services; maintain the confidentiality and security of your account credentials and notify Erano promptly of any unauthorized access; and use the client portal only for its intended purpose and in compliance with applicable law. 5. Confidentiality and Data Protection. Each party agrees to keep confidential any non-public information disclosed by the other party in connection with the Services, except where disclosure is required by law or regulation. Erano will take reasonable technical and organizational measures to protect personal and financial data submitted through the client portal, in line with applicable data protection laws in Ghana. Documents and information you upload will be used solely for the purpose of delivering the Services. 6. Intellectual Property. Any reports, analyses, templates, or other deliverables prepared by Erano specifically for you under an engagement become your property upon full payment, unless otherwise agreed. Erano retains ownership of its underlying methodologies, tools, templates, and proprietary processes. 7. Limitation of Liability. Erano will perform the Services with reasonable skill and care, in line with applicable professional standards. However, to the maximum extent permitted by law: Erano's total liability arising from or in connection with the Services shall not exceed the total fees paid by you for the specific engagement giving rise to the claim; Erano shall not be liable for indirect, incidental, or consequential losses, including loss of profit or business opportunity; and nothing in these Terms limits liability for fraud, gross negligence, or any liability that cannot be excluded under applicable law. 8. Term and Termination. These Terms remain in effect for as long as you maintain an active account or engagement with Erano. Either party may terminate an engagement by providing written notice, subject to any minimum notice period specified in the Engagement Details. Upon termination, you remain responsible for payment of fees for Services already rendered. Erano may retain copies of records as required by applicable professional, regulatory, or legal obligations. 9. Amendments. Erano may update these Terms from time to time. Material changes will be communicated to active Clients via the email address or notification system associated with their account. Continued use of the Services after such notice constitutes acceptance of the updated Terms. 10. Governing Law and Dispute Resolution. These Terms are governed by the laws of the Republic of Ghana. The parties agree to first attempt to resolve any dispute arising from these Terms through good-faith negotiation. If a dispute cannot be resolved amicably within a reasonable period, it shall be subject to the exclusive jurisdiction of the courts of Ghana. 11. Contact. For questions regarding these Terms, please contact Erano Consulting through the contact details provided on our website or client portal.";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const authClient = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    },
  );

  const { data: { user }, error: authError } = await authClient.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success: rateLimitOk } = await agreementRatelimit.limit(`agree:${user.id}`);
  if (!rateLimitOk) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  try {
    verifyCsrfOrigin(request);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = createServerClient();

  try {
    await requireState(user.id, ["awaiting_agreement"]);
  } catch (err) {
    if (err instanceof StateValidationError) {
      return NextResponse.json({ error: "Action not allowed in current state." }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to validate state." }, { status: 500 });
  }

  // Get latest version or seed version 1
  type AgreementVersion = { id: string; version_number: number };
  let version: AgreementVersion | null;

  const { data: fetched } = await supabase
    .from("agreement_versions")
    .select("id, version_number")
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!fetched) {
    const { data: seeded, error: seedErr } = await supabase
      .from("agreement_versions")
      .insert({ content: SEED_CONTENT, version_number: 1 })
      .select("id, version_number")
      .single();
    if (seedErr || !seeded) {
      return NextResponse.json({ error: "Failed to retrieve agreement version." }, { status: 500 });
    }
    version = seeded;
  } else {
    version = fetched;
  }

  // 409 if already accepted this version
  const { data: existing } = await supabase
    .from("agreements")
    .select("id")
    .eq("client_id", user.id)
    .eq("version_id", version.id)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "Agreement already accepted." }, { status: 409 });
  }

  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const { error: agreementErr } = await supabase
    .from("agreements")
    .insert({ client_id: user.id, version_id: version.id, ip_address: ipAddress });
  if (agreementErr) {
    return NextResponse.json({ error: "Failed to record agreement." }, { status: 500 });
  }

  // Fetch most recent invoice to determine if free package
  const { data: invoice } = await supabase
    .from("invoices")
    .select("final_price_ghs, id")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isFree = (invoice?.final_price_ghs ?? -1) === 0;

  if (isFree) {
    const serviceStart = new Date();
    const serviceEnd   = new Date(serviceStart);
    serviceEnd.setFullYear(serviceEnd.getFullYear() + 1);

    if (invoice?.id) {
      await supabase
        .from("invoices")
        .update({
          status:             "paid",
          service_start_date: serviceStart.toISOString().split("T")[0],
          service_end_date:   serviceEnd.toISOString().split("T")[0],
        })
        .eq("id", invoice.id);
    }

    const { error: stateErrFree } = await supabase
      .from("users")
      .update({ account_state: "active" })
      .eq("id", user.id);
    if (stateErrFree) {
      return NextResponse.json({ error: "Failed to update account state." }, { status: 500 });
    }

    await supabase.from("notifications").insert({
      user_id: user.id,
      type:    "agreement_accepted",
      message: "Your account is now active. Welcome to Erano Consulting.",
      link:    "/portal/dashboard",
    });

    await supabase.from("audit_log").insert({
      actor_id:    user.id,
      actor_role:  "client",
      action:      "agreement_accepted_free",
      target_type: "agreement",
      metadata:    { version_number: version.version_number, ip_address: ipAddress },
    });

    try {
      const { data: prof } = await supabase
        .from("client_profiles")
        .select("contact_name, packages(name)")
        .eq("user_id", user.id)
        .maybeSingle();

      const contactName = prof?.contact_name ?? "Client";
      const packageName = (prof?.packages as { name: string }[] | null)?.[0]?.name ?? "Service";

      const html = await render(AgreementAcceptedEmail({ contactName, packageName, expiresAt: null }));
      await sendEmail({ to: user.email!, subject: emailSubject, html });
    } catch (emailErr) {
      console.error("free agreement email:", emailErr instanceof Error ? emailErr.message : emailErr);
    }

    return NextResponse.json({ success: true, free: true });
  }

  // Paid path — existing logic unchanged
  const now = new Date();
  const expiresAt = calculatePaymentDeadline(now);

  const { error: timerErr } = await supabase
    .from("payment_timers")
    .insert({
      client_id:  user.id,
      started_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      is_active:  true,
    });
  if (timerErr) {
    console.error("payment_timers insert:", timerErr.code);
    return NextResponse.json({ error: "Failed to create payment timer." }, { status: 500 });
  }

  const { error: stateErr } = await supabase
    .from("users")
    .update({ account_state: "awaiting_payment" })
    .eq("id", user.id);
  if (stateErr) {
    return NextResponse.json({ error: "Failed to update account state." }, { status: 500 });
  }

  await supabase.from("notifications").insert({
    user_id: user.id,
    type:    "agreement_accepted",
    message: "Your service agreement has been accepted. Please complete payment within 5 business days.",
    link:    "/portal/invoice",
  });

  await supabase.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "client",
    action:      "agreement_accepted",
    target_type: "agreement",
    metadata:    { version_number: version.version_number, ip_address: ipAddress },
  });

  // Email — non-fatal
  try {
    const { data: prof } = await supabase
      .from("client_profiles")
      .select("contact_name, packages(name)")
      .eq("user_id", user.id)
      .maybeSingle();

    const contactName = prof?.contact_name ?? "Client";
    const packageName = (prof?.packages as { name: string }[] | null)?.[0]?.name ?? "Service";
    const expiresAtStr = expiresAt.toLocaleDateString("en-GH", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const html = await render(AgreementAcceptedEmail({ contactName, packageName, expiresAt: expiresAtStr }));
    await sendEmail({ to: user.email!, subject: emailSubject, html });
  } catch (emailErr) {
    console.error("agreement email:", emailErr instanceof Error ? emailErr.message : emailErr);
  }

  return NextResponse.json({ success: true, expires_at: expiresAt.toISOString() });
}
