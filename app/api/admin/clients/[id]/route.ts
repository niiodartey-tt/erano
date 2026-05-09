import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { getInvoiceUrl } from "@/lib/storage";

async function getAuthUser() {
  const cookieStore = cookies();
  const c = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );
  return c.auth.getUser();
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServerClient();
  const { data: adminRow } = await service.from("users").select("role").eq("id", user.id).single();
  if (!adminRow || adminRow.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const clientId = params.id;

  const { data: clientRow, error: clientErr } = await service
    .from("users")
    .select("id, email, role, account_state, created_at")
    .eq("id", clientId).eq("role", "client").single();
  if (clientErr || !clientRow) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { data: rawProfile } = await service
    .from("client_profiles")
    .select("legal_name, trading_name, reg_number, business_type, industry, country, contact_name, contact_role, contact_email, contact_phone, address, services_needed, turnover_bracket, employee_count, has_accountant, last_audited_year, gra_registered, vat_registered, outstanding_obligations, custom_price_ghs, packages:package_id(name, description, price_ghs)")
    .eq("user_id", clientId)
    .maybeSingle();

  const [
    { data: invoice },
    { data: agreementRow },
    { data: timer },
    { data: proofs },
    { data: docRequests },
    { data: auditLog },
  ] = await Promise.all([
    service.from("invoices").select("invoice_number, final_price_ghs, status, generated_at, file_path").eq("client_id", clientId).order("generated_at", { ascending: false }).limit(1).maybeSingle(),
    service.from("agreements").select("accepted_at, agreement_versions(version_number)").eq("client_id", clientId).order("accepted_at", { ascending: false }).limit(1).maybeSingle(),
    service.from("payment_timers").select("expires_at, is_active").eq("client_id", clientId).eq("is_active", true).maybeSingle(),
    service.from("payment_proofs").select("id, amount_paid, currency, transaction_reference, status, uploaded_at, file_path").eq("client_id", clientId).order("uploaded_at", { ascending: false }),
    service.from("document_requests").select("id, title, description, category, status, created_at, document_uploads(id, file_path, uploaded_at)").eq("client_id", clientId).order("created_at", { ascending: false }),
    service.from("audit_log").select("id, action, actor_role, created_at, metadata").or(`actor_id.eq.${clientId},target_id.eq.${clientId}`).order("created_at", { ascending: false }).limit(10),
  ]);

  let invoiceSignedUrl: string | null = null;
  if (invoice?.file_path) {
    try { invoiceSignedUrl = await getInvoiceUrl(invoice.file_path); } catch { /* ignore */ }
  }

  const agreementVersion = (agreementRow as { agreement_versions: { version_number: number } | null } | null)?.agreement_versions;
  const profile = rawProfile as Record<string, unknown> | null;
  const pkg = profile ? (profile.packages as { name: string; description: string; price_ghs: number | null } | null) : null;
  const profileFields = profile
    ? Object.fromEntries(Object.entries(profile).filter(([k]) => k !== "packages"))
    : {};

  return NextResponse.json({
    user:       clientRow,
    profile:    profileFields,
    package:    pkg ?? null,
    invoice:    invoice ? { ...invoice, signed_url: invoiceSignedUrl } : null,
    agreement:  agreementRow ? { accepted_at: agreementRow.accepted_at, version_number: agreementVersion?.version_number ?? 1 } : null,
    timer:      timer ?? null,
    proofs:     proofs ?? [],
    doc_requests: docRequests ?? [],
    audit_log:  auditLog ?? [],
  });
}
