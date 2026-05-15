import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/email";
import { AccountExpiredEmail, subject as emailSubject } from "@/emails/AccountExpiredEmail";
import { render } from "@react-email/render";

const ALERT_THRESHOLD_MS = 25 * 60 * 60 * 1000; // 25 hours

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
    await logCron(supabase, 0, 1, [{ timer_id: "fetch", error: fetchError.message }], Date.now() - startedAt);
    return NextResponse.json({ error: "Failed to fetch expired timers." }, { status: 500 });
  }

  const timers = expiredTimers ?? [];
  let errorsEncountered = 0;
  const errorDetails: Array<{ timer_id: string; error: string }> = [];

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
      const msg = err instanceof Error ? err.message : String(err);
      console.error("process timer:", timer.id, msg);
      errorsEncountered++;
      errorDetails.push({ timer_id: timer.id, error: msg });
    }
  }

  await logCron(supabase, timers.length, errorsEncountered, errorDetails, Date.now() - startedAt);

  // Alert if last successful run was more than 25 hours ago
  try {
    const { data: lastSuccess } = await supabase
      .from("cron_log")
      .select("ran_at")
      .eq("job_name", "check-expired-timers")
      .eq("errors_encountered", 0)
      .order("ran_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!lastSuccess || Date.now() - new Date(lastSuccess.ran_at).getTime() > ALERT_THRESHOLD_MS) {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: "[Erano] CRON ALERT: check-expired-timers has not run successfully in 25+ hours",
          html: `<p>The <strong>check-expired-timers</strong> cron job has not completed without errors in over 25 hours. Last successful run: ${lastSuccess?.ran_at ?? "never"}. Please investigate immediately.</p>`,
        });
      }
    }
  } catch (alertErr) {
    console.error("cron alert:", alertErr instanceof Error ? alertErr.message : alertErr);
  }

  return NextResponse.json({ processed: timers.length, errors: errorsEncountered });
}

async function logCron(
  supabase: ReturnType<typeof createServerClient>,
  recordsProcessed: number,
  errorsEncountered: number,
  errorDetails: Array<{ timer_id: string; error: string }>,
  durationMs: number,
) {
  await supabase.from("cron_log").insert({
    job_name:           "check-expired-timers",
    records_processed:  recordsProcessed,
    errors_encountered: errorsEncountered,
    error_details:      errorDetails.length > 0 ? errorDetails : null,
    duration_ms:        durationMs,
  });
}
