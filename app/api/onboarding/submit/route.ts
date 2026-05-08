import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase-server";
import { onboardingRatelimit, getClientIp } from "@/lib/ratelimit";
import { generateMagicLink } from "@/lib/magicLink";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/emails/WelcomeEmail";

const submitSchema = z.object({
  legalName:              z.string().min(2).max(200),
  tradingName:            z.string().max(200).optional(),
  regNumber:              z.string().max(100).optional(),
  bizType:                z.string().min(1).max(100),
  industry:               z.string().min(1).max(100),
  country:                z.string().min(1).max(100),
  contactName:            z.string().min(2).max(200),
  contactRole:            z.string().min(2).max(100),
  contactEmail:           z.string().email().max(200),
  contactPhone:           z.string().min(7).max(30),
  address:                z.string().min(5).max(500),
  services:               z.array(z.string()).min(1),
  turnover:               z.string().min(1),
  employees:              z.number().min(1),
  lastAudit:              z.string().optional(),
  hasAccountant:          z.enum(["yes", "no"]),
  graRegistered:          z.enum(["yes", "no"]),
  vatRegistered:          z.enum(["yes", "no"]),
  outstandingObligations: z.enum(["yes", "no"]),
  packageId:              z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ip   = getClientIp(request);

    // Honeypot — silently accept but do not process
    if (body.website) {
      const supabase = createServerClient();
      await supabase.from("audit_log").insert({
        action: "bot_submission_rejected", target_type: "submission", metadata: { ip },
      });
      return NextResponse.json({ success: true });
    }

    // Rate limiting
    const { success } = await onboardingRatelimit.limit(ip);
    if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    console.log("[ONBOARDING] Submission received from IP:", ip);

    // Input validation
    const result = submitSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    const data = result.data;

    const supabase = createServerClient();

    // Duplicate email check
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", data.contactEmail)
      .maybeSingle();
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.contactEmail,
      email_confirm: true,
    });
    if (authError || !authData?.user) {
      console.error("Auth user creation failed:", authError?.message);
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }
    const userId = authData.user.id;
    console.log("[ONBOARDING] Auth user created:", userId);

    // Insert users record
    const { error: usersError } = await supabase.from("users").insert({
      id:                  userId,
      email:               data.contactEmail,
      role:                "client",
      account_state:       "pending",
      must_change_password: true,
    });
    if (usersError) {
      console.error("users insert failed:", usersError.message);
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    // Insert client_profiles record
    const { error: profileError } = await supabase.from("client_profiles").insert({
      user_id:               userId,
      legal_name:            data.legalName,
      trading_name:          data.tradingName   || null,
      reg_number:            data.regNumber     || null,
      business_type:         data.bizType,
      industry:              data.industry,
      country:               data.country,
      contact_name:          data.contactName,
      contact_role:          data.contactRole,
      contact_email:         data.contactEmail,
      contact_phone:         data.contactPhone,
      address:               data.address,
      services_needed:       data.services,
      turnover_bracket:      data.turnover,
      employee_count:        data.employees,
      has_accountant:        data.hasAccountant === "yes",
      last_audited_year:     data.lastAudit || null,
      gra_registered:        data.graRegistered === "yes",
      vat_registered:        data.vatRegistered === "yes",
      outstanding_obligations: data.outstandingObligations === "yes",
      package_id:            data.packageId,
    });
    if (profileError) {
      console.error("client_profiles insert failed:", profileError.message);
      await supabase.from("users").delete().eq("id", userId);
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    // Generate magic link (non-fatal)
    let magicLinkUrl = "";
    try {
      magicLinkUrl = await generateMagicLink(data.contactEmail);
    } catch (error) {
      console.error("[ONBOARDING] Magic link generation failed:", error instanceof Error ? error.message : error);
    }

    // Send welcome email (non-fatal)
    try {
      console.log("[ONBOARDING] Attempting to send welcome email to:", data.contactEmail);
      const emailHtml = await render(WelcomeEmail({ contactName: data.contactName, magicLinkUrl }));
      await sendEmail({
        to:      data.contactEmail,
        subject: "Welcome to Erano Consulting — activate your account",
        html:    emailHtml,
      });
    } catch (error) {
      console.error("[ONBOARDING] Welcome email failed:", error instanceof Error ? error.message : error);
    }

    // Audit log
    await supabase.from("audit_log").insert({
      actor_id:    userId,
      actor_role:  "client",
      action:      "account_created",
      target_type: "user",
      target_id:   userId,
      metadata:    { ip, packageId: data.packageId, industry: data.industry },
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error("Onboarding submit error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
