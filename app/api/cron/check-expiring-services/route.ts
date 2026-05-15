import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/email";
import { ServiceExpiryReminderEmail, subject } from "@/emails/ServiceExpiryReminderEmail";
import { render } from "@react-email/render";

const REMINDER_DAYS = [30, 14, 7];
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233559331276";
const RENEWAL_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("I would like to discuss renewal of my Erano Consulting service.")}`;

export async function GET(request: Request) {
  const cronSecret = request.headers.get("authorization");
  if (cronSecret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();
  const supabase  = createServerClient();
  const today     = new Date();
  today.setHours(0, 0, 0, 0);

  let recordsProcessed = 0;
  let errorsEncountered = 0;
  const errorDetails: Array<{ invoice_id: string; days_remaining: number; error: string }> = [];

  for (const daysRemaining of REMINDER_DAYS) {
    const target = new Date(today);
    target.setDate(target.getDate() + daysRemaining);
    const targetDate = target.toISOString().slice(0, 10);

    const { data: invoices, error: fetchErr } = await supabase
      .from("invoices")
      .select("id, client_id, service_end_date, packages(name)")
      .eq("status", "paid")
      .eq("service_end_date", targetDate);

    if (fetchErr) {
      console.error(`[check-expiring-services] fetch d=${daysRemaining}:`, fetchErr.message);
      errorsEncountered++;
      errorDetails.push({ invoice_id: "fetch", days_remaining: daysRemaining, error: fetchErr.message });
      continue;
    }

    for (const invoice of invoices ?? []) {
      try {
        const notifType = `service_expiring_${daysRemaining}d`;
        const { data: existing } = await supabase
          .from("notifications")
          .select("id")
          .eq("user_id", invoice.client_id)
          .eq("type", notifType)
          .gte("created_at", today.toISOString())
          .maybeSingle();

        if (existing) continue;

        const [{ data: prof }, { data: userData }] = await Promise.all([
          supabase.from("client_profiles").select("contact_name").eq("user_id", invoice.client_id).maybeSingle(),
          supabase.from("users").select("email").eq("id", invoice.client_id).single(),
        ]);

        await supabase.from("notifications").insert({
          user_id: invoice.client_id,
          type:    notifType,
          message: `Your service expires in ${daysRemaining} days. Contact us to renew.`,
          link:    "/portal/dashboard",
        });

        if (userData?.email) {
          const contactName = (prof?.contact_name as string | undefined) ?? "Client";
          const packageName = (invoice.packages as unknown as { name: string } | null)?.name ?? "your package";
          const expiresOn   = new Date(invoice.service_end_date as string).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
          const html = await render(ServiceExpiryReminderEmail({ contactName, packageName, expiresOn, daysRemaining, renewalUrl: RENEWAL_URL }));
          await sendEmail({ to: userData.email, subject: subject(daysRemaining), html });
        }

        recordsProcessed++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[check-expiring-services] invoice ${invoice.id}:`, msg);
        errorsEncountered++;
        errorDetails.push({ invoice_id: invoice.id, days_remaining: daysRemaining, error: msg });
      }
    }
  }

  await supabase.from("cron_log").insert({
    job_name:           "check-expiring-services",
    records_processed:  recordsProcessed,
    errors_encountered: errorsEncountered,
    error_details:      errorDetails.length > 0 ? errorDetails : null,
    duration_ms:        Date.now() - startedAt,
  });

  return NextResponse.json({ processed: recordsProcessed, errors: errorsEncountered });
}
