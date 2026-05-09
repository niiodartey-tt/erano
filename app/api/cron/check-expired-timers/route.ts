import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/email";
import { AccountExpiredEmail, subject as emailSubject } from "@/emails/AccountExpiredEmail";
import { render } from "@react-email/render";

export async function GET(request: Request) {
  const cronSecret = request.headers.get("authorization");
  if (cronSecret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();
  const supabase = createServerClient();

  const { data: expiredTimers, error: fetchError } = await supabase
    .from("payment_timers")
    .select("id, client_id, expires_at")
    .eq("is_active", true)
    .lt("expires_at", new Date().toISOString());

  if (fetchError) {
    await logCron(supabase, 0, 1, Date.now() - startedAt);
    return NextResponse.json({ error: "Failed to fetch expired timers." }, { status: 500 });
  }

  const timers = expiredTimers ?? [];
  let errorsEncountered = 0;

  for (const timer of timers) {
    try {
      await supabase.from("payment_timers").update({ is_active: false }).eq("id", timer.id);

      await supabase.from("users").update({ account_state: "expired" }).eq("id", timer.client_id);

      await supabase.from("notifications").insert({
        user_id: timer.client_id,
        type:    "account_expired",
        message: "Your payment window has closed. Please contact us to reactivate your account.",
        link:    "/portal/dashboard",
      });

      await supabase.from("audit_log").insert({
        actor_id:    null,
        actor_role:  null,
        action:      "account_expired_by_cron",
        target_type: "user",
        target_id:   timer.client_id,
        metadata:    { timer_id: timer.id, expires_at: timer.expires_at },
      });

      // Email — non-fatal
      try {
        const { data: userData } = await supabase
          .from("users")
          .select("email")
          .eq("id", timer.client_id)
          .single();
        const { data: prof } = await supabase
          .from("client_profiles")
          .select("contact_name")
          .eq("user_id", timer.client_id)
          .maybeSingle();

        if (userData?.email) {
          const html = await render(AccountExpiredEmail({ contactName: prof?.contact_name ?? "Client" }));
          await sendEmail({ to: userData.email, subject: emailSubject, html });
        }
      } catch (emailErr) {
        console.error("expired email:", emailErr instanceof Error ? emailErr.message : emailErr);
      }
    } catch (err) {
      console.error("process timer:", timer.id, err instanceof Error ? err.message : err);
      errorsEncountered++;
    }
  }

  await logCron(supabase, timers.length, errorsEncountered, Date.now() - startedAt);

  return NextResponse.json({ processed: timers.length, errors: errorsEncountered });
}

async function logCron(
  supabase: ReturnType<typeof createServerClient>,
  recordsProcessed: number,
  errorsEncountered: number,
  durationMs: number,
) {
  await supabase.from("cron_log").insert({
    job_name:           "check-expired-timers",
    records_processed:  recordsProcessed,
    errors_encountered: errorsEncountered,
    duration_ms:        durationMs,
  });
}
