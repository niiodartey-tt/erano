import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { z } from "zod";
import { verifyCsrfOrigin } from "@/lib/csrf";
import { generateInvoicePdf } from "@/lib/generateInvoicePdf";
import { generateInvoicePath } from "@/lib/generateStoragePath";
import { uploadFile } from "@/lib/storage";
import { sendEmail } from "@/lib/email";
import { InvoiceReadyEmail, subject as invoiceSubject } from "@/emails/InvoiceReadyEmail";
import { render } from "@react-email/render";

const schema = z.object({
  client_id:        z.string().uuid(),
  custom_price_ghs: z.number().positive().optional(),
});

async function getAuthUser() {
  const cookieStore = cookies();
  const c = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );
  return c.auth.getUser();
}

export async function POST(request: Request) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServerClient();
  const { data: adminRow } = await service.from("users").select("role").eq("id", user.id).single();
  if (!adminRow || adminRow.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try { verifyCsrfOrigin(request); } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const result = schema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });

  const { client_id, custom_price_ghs } = result.data;

  const { data: client } = await service
    .from("users").select("id, email, account_state").eq("id", client_id).eq("role", "client").single();
  if (!client) return NextResponse.json({ error: "Client not found." }, { status: 404 });
  if (client.account_state !== "pending") return NextResponse.json({ error: "Client is not in pending state." }, { status: 409 });

  const { data: rawProfile } = await service
    .from("client_profiles")
    .select("legal_name, address, contact_name, package_id, packages:package_id(name, description, price_ghs)")
    .eq("user_id", client_id).maybeSingle();

  if (!rawProfile) return NextResponse.json({ error: "Client profile not found." }, { status: 404 });

  const pkg = rawProfile.packages as unknown as { name: string; description: string; price_ghs: number | null } | null;
  if (!pkg) return NextResponse.json({ error: "No package assigned to client." }, { status: 409 });

  let finalPriceGhs: number;
  if (pkg.name === "Custom") {
    if (!custom_price_ghs) return NextResponse.json({ error: "custom_price_ghs is required for Custom package." }, { status: 400 });
    finalPriceGhs = custom_price_ghs;
    await service.from("client_profiles").update({ custom_price_ghs }).eq("user_id", client_id);
  } else {
    if (!pkg.price_ghs) return NextResponse.json({ error: "Package has no price." }, { status: 409 });
    finalPriceGhs = Number(pkg.price_ghs);
  }

  const year = new Date().getFullYear();
  const { data: lastInvoice } = await service
    .from("invoices").select("invoice_number")
    .like("invoice_number", `ERN-${year}-%`)
    .order("invoice_number", { ascending: false }).limit(1).maybeSingle();

  const seq = lastInvoice ? parseInt(lastInvoice.invoice_number.split("-")[2], 10) + 1 : 1;
  const invoiceNumber = `ERN-${year}-${String(seq).padStart(4, "0")}`;

  const bankDetails = process.env.INVOICE_BANK_NAME ? {
    bank:          process.env.INVOICE_BANK_NAME,
    accountName:   process.env.INVOICE_BANK_ACCOUNT_NAME ?? "",
    accountNumber: process.env.INVOICE_BANK_ACCOUNT_NUMBER ?? "",
    branch:        process.env.INVOICE_BANK_BRANCH ?? "",
  } : undefined;

  const pdfBytes = await generateInvoicePdf({
    invoiceNumber, generatedAt: new Date().toISOString(),
    clientLegalName: rawProfile.legal_name, clientAddress: rawProfile.address,
    packageName: pkg.name, packageDescription: pkg.description, finalPriceGhs, bankDetails,
  });

  const storagePath = generateInvoicePath(client_id, invoiceNumber);
  await uploadFile("invoices", storagePath, Buffer.from(pdfBytes), "application/pdf");

  const { data: inserted, error: insertErr } = await service
    .from("invoices")
    .insert({ client_id, package_id: rawProfile.package_id ?? null, invoice_number: invoiceNumber, final_price_ghs: finalPriceGhs, file_path: storagePath, status: "generated" })
    .select("id").single();
  if (insertErr || !inserted) return NextResponse.json({ error: "Failed to create invoice." }, { status: 500 });

  const { error: stateErr } = await service.from("users").update({ account_state: "awaiting_agreement" }).eq("id", client_id);
  if (stateErr) return NextResponse.json({ error: "Failed to update client state." }, { status: 500 });

  await service.from("audit_log").insert({
    actor_id: user.id, actor_role: "admin", action: "invoice_generated",
    target_type: "invoice", target_id: client_id,
    metadata: { invoice_number: invoiceNumber, final_price_ghs: finalPriceGhs },
  });

  try {
    await sendEmail({ to: client.email, subject: invoiceSubject(invoiceNumber), html: await render(InvoiceReadyEmail({ contactName: rawProfile.contact_name, invoiceNumber, packageName: pkg.name })) });
  } catch (err) { console.error("invoice_email:", err); }

  try {
    await service.from("notifications").insert({ user_id: client_id, type: "invoice_ready", message: `Your invoice ${invoiceNumber} is ready. Please review your agreement and invoice.` });
  } catch (err) { console.error("invoice_notification:", err); }

  return NextResponse.json({ success: true, invoice_number: invoiceNumber }, { status: 201 });
}
