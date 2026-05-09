import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { requireState, StateValidationError } from "@/lib/validateState";
import { validateMimeType, InvalidMimeTypeError } from "@/lib/validateMime";
import { checkDuplicateTransactionRef } from "@/lib/checkDuplicateRef";
import { generatePaymentProofPath } from "@/lib/generateStoragePath";
import { uploadFile } from "@/lib/storage";
import { sendEmail } from "@/lib/email";
import { PaymentProofReceivedEmail, subject as emailSubjectFn } from "@/emails/PaymentProofReceivedEmail";
import { render } from "@react-email/render";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const uploadSchema = z.object({
  amount_paid:           z.coerce.number().positive("Amount must be greater than 0"),
  currency:              z.enum(["GHS", "USD"]),
  payment_date:          z.string().min(1).refine(
    (d) => new Date(d + "T00:00:00") <= new Date(),
    "Payment date cannot be in the future",
  ),
  payment_method:        z.enum(["Bank Transfer", "Cheque", "Cash"]),
  bank_name:             z.string().min(1).max(100).trim(),
  transaction_reference: z.string().min(3).max(100).trim(),
  notes:                 z.string().max(500).optional(),
});

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

  const supabase = createServerClient();

  try {
    await requireState(user.id, ["awaiting_payment"]);
  } catch (err) {
    if (err instanceof StateValidationError) {
      return NextResponse.json({ error: "Action not allowed in current state." }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to validate state." }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const fields = {
    amount_paid:           formData.get("amount_paid"),
    currency:              formData.get("currency"),
    payment_date:          formData.get("payment_date"),
    payment_method:        formData.get("payment_method"),
    bank_name:             formData.get("bank_name"),
    transaction_reference: formData.get("transaction_reference"),
    notes:                 formData.get("notes") || undefined,
  };

  const parsed = uploadSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { amount_paid, currency, payment_date, payment_method, bank_name, transaction_reference, notes } = parsed.data;

  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof File)) {
    return NextResponse.json({ error: "Proof of payment file is required." }, { status: 400 });
  }
  if (fileEntry.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File must be 5MB or smaller." }, { status: 400 });
  }

  const arrayBuffer = await fileEntry.arrayBuffer();
  let detectedMime: string;
  try {
    detectedMime = await validateMimeType(arrayBuffer, "paymentProofs");
  } catch (err) {
    if (err instanceof InvalidMimeTypeError) {
      return NextResponse.json({ error: "Invalid file type. Only PDF, JPEG, and PNG are accepted." }, { status: 400 });
    }
    return NextResponse.json({ error: "File validation failed." }, { status: 500 });
  }

  try {
    const isDuplicate = await checkDuplicateTransactionRef(transaction_reference);
    if (isDuplicate) {
      return NextResponse.json({ error: "This transaction reference has already been used." }, { status: 409 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to validate transaction reference." }, { status: 500 });
  }

  const filePath = generatePaymentProofPath(user.id, fileEntry.name);
  try {
    await uploadFile("payment-proofs", filePath, Buffer.from(arrayBuffer), detectedMime);
  } catch (err) {
    console.error("storage upload:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "File upload failed. Please try again." }, { status: 500 });
  }

  const { data: invoice } = await supabase
    .from("invoices")
    .select("id")
    .eq("client_id", user.id)
    .order("generated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: proof, error: proofErr } = await supabase
    .from("payment_proofs")
    .insert({
      client_id:             user.id,
      invoice_id:            invoice?.id ?? null,
      file_url:              filePath,
      file_path:             filePath,
      transaction_reference,
      amount_paid,
      currency,
      payment_method,
      bank_name,
      payment_date,
      notes:                 notes ?? null,
      status:                "pending",
    })
    .select("id")
    .single();

  if (proofErr || !proof) {
    console.error("payment_proofs insert:", proofErr?.code);
    return NextResponse.json({ error: "Failed to save payment record." }, { status: 500 });
  }

  const { error: stateErr } = await supabase
    .from("users")
    .update({ account_state: "awaiting_confirmation" })
    .eq("id", user.id);
  if (stateErr) {
    return NextResponse.json({ error: "Failed to update account state." }, { status: 500 });
  }

  await supabase.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "client",
    action:      "payment_proof_uploaded",
    target_type: "payment_proof",
    target_id:   proof.id,
    metadata:    { transaction_reference, amount_paid, currency },
  });

  // Admin notification + email — non-fatal
  try {
    const [{ data: prof }, { data: adminUser }] = await Promise.all([
      supabase.from("client_profiles").select("contact_name, legal_name, packages(name)").eq("user_id", user.id).maybeSingle(),
      supabase.from("users").select("id").eq("role", "admin").limit(1).maybeSingle(),
    ]);

    if (adminUser) {
      await supabase.from("notifications").insert({
        user_id: adminUser.id,
        type:    "payment_proof_uploaded",
        message: `Payment proof uploaded by ${prof?.contact_name ?? "a client"} (${prof?.legal_name ?? ""})`,
        link:    "/admin/payments",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const clientName  = prof?.contact_name ?? "Client";
      const businessName = prof?.legal_name ?? "";
      const amountStr   = `${currency} ${amount_paid.toFixed(2)}`;
      const adminUrl    = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://erano.vercel.app"}/admin/payments`;
      const html = await render(PaymentProofReceivedEmail({ clientName, businessName, transactionReference: transaction_reference, amountPaid: amountStr, adminUrl }));
      await sendEmail({ to: adminEmail, subject: emailSubjectFn(businessName), html });
    }
  } catch (notifErr) {
    console.error("admin notification:", notifErr instanceof Error ? notifErr.message : notifErr);
  }

  return NextResponse.json({ success: true, proof_id: proof.id }, { status: 201 });
}
