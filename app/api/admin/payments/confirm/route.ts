import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/email";
import { PaymentConfirmedEmail, subject } from "@/emails/PaymentConfirmedEmail";
import { render } from "@react-email/render";
import { verifyCsrfOrigin } from "@/lib/csrf";

async function getAuthUser() {
  const cookieStore = cookies();
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

  try {
    verifyCsrfOrigin(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { client_id?: string; proof_id?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { client_id, proof_id } = body;
  if (!client_id || !proof_id) return NextResponse.json({ error: "client_id and proof_id required" }, { status: 400 });

  const { error: proofErr } = await service.from("payment_proofs").update({ status: "approved" }).eq("id", proof_id);
  if (proofErr) return NextResponse.json({ error: "Failed to update proof" }, { status: 500 });

  const { error: stateErr } = await service.from("users").update({ account_state: "active" }).eq("id", client_id);
  if (stateErr) return NextResponse.json({ error: "Failed to update account state" }, { status: 500 });

  const { data: latestInvoice } = await service
    .from("invoices").select("id").eq("client_id", client_id)
    .order("generated_at", { ascending: false }).limit(1).maybeSingle();
  if (latestInvoice) {
    await service.from("invoices").update({ status: "paid" }).eq("id", latestInvoice.id);
  }

  await service.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "admin",
    action:      "payment_confirmed",
    target_type: "payment_proof",
    target_id:   proof_id,
    metadata:    { client_id },
  });

  try {
    const [{ data: prof }, { data: clientUser }] = await Promise.all([
      service.from("client_profiles").select("contact_name, packages:package_id(name)").eq("user_id", client_id).maybeSingle(),
      service.from("users").select("email").eq("id", client_id).single(),
    ]);

    await service.from("notifications").insert({
      user_id: client_id,
      type:    "payment_confirmed",
      message: "Your payment has been confirmed. Your account is now active.",
      link:    "/portal/dashboard",
    });

    if (clientUser?.email) {
      const contactName = (prof?.contact_name as string | undefined) ?? "Client";
      const pkg = prof?.packages as unknown as { name: string } | null;
      const packageName = pkg?.name ?? "your package";
      const html = await render(PaymentConfirmedEmail({ contactName, packageName }));
      await sendEmail({ to: clientUser.email, subject, html });
    }
  } catch (e) {
    console.error("payment confirm notification:", e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ success: true });
}
