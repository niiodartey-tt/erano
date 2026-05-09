import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { requireState, StateValidationError } from "@/lib/validateState";
import { validateMimeType, InvalidMimeTypeError } from "@/lib/validateMime";
import { generateDocumentUploadPath } from "@/lib/generateStoragePath";
import { uploadFile } from "@/lib/storage";
import { sendEmail } from "@/lib/email";
import { DocumentUploadedEmail, subject as emailSubjectFn } from "@/emails/DocumentUploadedEmail";
import { render } from "@react-email/render";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const requestIdSchema = z.string().uuid("Invalid request ID");

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
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await requireState(user.id, ["active"]);
  } catch (err) {
    if (err instanceof StateValidationError) {
      return NextResponse.json({ error: "Document uploads are only available on active accounts." }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to validate account state." }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const requestIdRaw = formData.get("requestId");
  const parsed = requestIdSchema.safeParse(requestIdRaw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request ID." }, { status: 400 });
  const requestId = parsed.data;

  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof File)) {
    return NextResponse.json({ error: "A file is required." }, { status: 400 });
  }
  if (fileEntry.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File must be 10MB or smaller." }, { status: 400 });
  }

  const supabase = createServerClient();

  // IDOR check — request must belong to this user
  const { data: docRequest } = await supabase
    .from("document_requests")
    .select("id, title, client_id")
    .eq("id", requestId)
    .eq("client_id", user.id)
    .maybeSingle();

  if (!docRequest) {
    return NextResponse.json({ error: "Document request not found." }, { status: 404 });
  }

  const arrayBuffer = await fileEntry.arrayBuffer();

  let detectedMime: string;
  try {
    detectedMime = await validateMimeType(arrayBuffer, "documentUploads");
  } catch (err) {
    if (err instanceof InvalidMimeTypeError) {
      return NextResponse.json({ error: "Invalid file type. Only PDF, JPEG, PNG, XLSX, and DOCX are accepted." }, { status: 400 });
    }
    return NextResponse.json({ error: "File validation failed." }, { status: 500 });
  }

  const filePath = generateDocumentUploadPath(user.id, requestId, fileEntry.name);
  try {
    await uploadFile("document-uploads", filePath, Buffer.from(arrayBuffer), detectedMime);
  } catch (err) {
    console.error("document upload storage:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "File upload failed. Please try again." }, { status: 500 });
  }

  const { data: uploadRow, error: uploadErr } = await supabase
    .from("document_uploads")
    .insert({ request_id: requestId, client_id: user.id, file_url: filePath, file_path: filePath })
    .select("id")
    .single();

  if (uploadErr || !uploadRow) {
    console.error("document_uploads insert:", uploadErr?.code);
    return NextResponse.json({ error: "Failed to save upload record." }, { status: 500 });
  }

  await supabase
    .from("document_requests")
    .update({ status: "uploaded" })
    .eq("id", requestId);

  await supabase.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "client",
    action:      "document_uploaded",
    target_type: "document_upload",
    target_id:   uploadRow.id,
    metadata:    { request_id: requestId, document_title: docRequest.title },
  });

  // Admin notification + email — non-fatal
  try {
    const [{ data: prof }, { data: adminUser }] = await Promise.all([
      supabase.from("client_profiles").select("contact_name, legal_name").eq("user_id", user.id).maybeSingle(),
      supabase.from("users").select("id").eq("role", "admin").limit(1).maybeSingle(),
    ]);

    if (adminUser) {
      await supabase.from("notifications").insert({
        user_id: adminUser.id,
        type:    "document_uploaded",
        message: `Document uploaded by ${prof?.contact_name ?? "a client"}: "${docRequest.title}"`,
        link:    "/admin/clients",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const clientName   = prof?.contact_name ?? "Client";
      const businessName = prof?.legal_name ?? "";
      const adminUrl     = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://erano.vercel.app"}/admin/clients`;
      const html = await render(DocumentUploadedEmail({ clientName, businessName, documentTitle: docRequest.title, adminUrl }));
      await sendEmail({ to: adminEmail, subject: emailSubjectFn(businessName), html });
    }
  } catch (notifErr) {
    console.error("document upload notification:", notifErr instanceof Error ? notifErr.message : notifErr);
  }

  return NextResponse.json({ success: true, upload_id: uploadRow.id }, { status: 201 });
}
