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

// Seeded when first client accepts — PLACEHOLDER: replace with final legal text before launch
const SEED_CONTENT = "Erano Consulting Service Agreement v1 — PLACEHOLDER: client to supply final text.";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

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
