import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/email";
import { AccountReactivatedEmail, subject } from "@/emails/AccountReactivatedEmail";
import { render } from "@react-email/render";
import { verifyCsrfOrigin } from "@/lib/csrf";
import { adminReactivateRatelimit } from "@/lib/ratelimit";
import { calculatePaymentDeadline } from "@/lib/businessDays";

async function getAuthUser() {
  const cookieStore = await cookies();
  const c = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );
  return c.auth.getUser();
}

export async function POST(req: Request) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServerClient();
  const { data: adminRow } = await service.from("users").select("role").eq("id", user.id).single();
  if (!adminRow || adminRow.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { success: rateLimitOk } = await adminReactivateRatelimit.limit(`reactivate:${user.id}`);
  if (!rateLimitOk) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  try {
    verifyCsrfOrigin(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { client_id?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { client_id } = body;
  if (!client_id) return NextResponse.json({ error: "client_id is required" }, { status: 400 });

  const { data: clientUser } = await service
    .from("users")
    .select("id, email, account_state")
    .eq("id", client_id)
    .single();

  if (!clientUser) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  if (clientUser.account_state !== "expired") {
    return NextResponse.json({ error: "Account is not expired" }, { status: 422 });
  }

  // Determine new state: if T&Cs version changed since client last accepted, require re-acceptance
  const [{ data: latestVersion }, { data: lastAgreement }] = await Promise.all([
    service.from("agreement_versions").select("id").order("version_number", { ascending: false }).limit(1).maybeSingle(),
    service.from("agreements").select("version_id").eq("client_id", client_id).order("accepted_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  const newState: string =
    latestVersion && lastAgreement && latestVersion.id === lastAgreement.version_id
      ? "awaiting_payment"
      : "awaiting_agreement";

  // Deactivate all existing timers
  await service.from("payment_timers").update({ is_active: false }).eq("client_id", client_id);

  const now      = new Date();
  const expiresAt = calculatePaymentDeadline(now);

  const { error: timerErr } = await service.from("payment_timers").insert({
    client_id,
    started_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    is_active:  true,
  });
  if (timerErr) {
    console.error("[reactivate] timer_insert:", timerErr.code, timerErr.message);
    return NextResponse.json({ error: "Failed to create payment timer" }, { status: 500 });
  }

  const { error: stateErr } = await service
    .from("users")
    .update({ account_state: newState })
    .eq("id", client_id);
  if (stateErr) {
    console.error("[reactivate] state_update:", stateErr.code, stateErr.message);
    return NextResponse.json({ error: "Failed to update account state" }, { status: 500 });
  }

  await service.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "admin",
    action:      "account_reactivated",
    target_type: "user",
    target_id:   client_id,
    metadata:    { new_state: newState, expires_at: expiresAt.toISOString() },
  });

  try {
    const { data: prof } = await service
      .from("client_profiles")
      .select("contact_name")
      .eq("user_id", client_id)
      .maybeSingle();

    await service.from("notifications").insert({
      user_id: client_id,
      type:    "account_reactivated",
      message: "Your account has been reactivated. Please complete payment within 5 business days.",
      link:    "/portal/payments",
    });

    if (clientUser.email) {
      const contactName  = (prof?.contact_name as string | undefined) ?? "Client";
      const expiresAtStr = expiresAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      const html = await render(AccountReactivatedEmail({ contactName, expiresAt: expiresAtStr }));
      await sendEmail({ to: clientUser.email, subject, html });
    }
  } catch (e) {
    console.error("[reactivate] notification:", e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ newState, expiresAt: expiresAt.toISOString() });
}
