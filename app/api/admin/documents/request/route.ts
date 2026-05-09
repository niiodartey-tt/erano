import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail } from "@/lib/email";
import { DocumentRequestedEmail, subject } from "@/emails/DocumentRequestedEmail";
import { render } from "@react-email/render";
import { verifyCsrfOrigin } from "@/lib/csrf";

const VALID_CATEGORIES = new Set(["Financial", "Legal", "Compliance", "Tax", "Other"]);

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

  let body: { client_id?: string; title?: string; description?: string; category?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { client_id, title, description, category } = body;
  if (!client_id || !title?.trim() || !description?.trim() || !category) {
    return NextResponse.json({ error: "client_id, title, description, and category are required" }, { status: 400 });
  }
  if (!VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const { data: docReq, error: insertErr } = await service
    .from("document_requests")
    .insert({
      client_id,
      requested_by: user.id,
      title:        title.trim(),
      description:  description.trim(),
      category,
      status:       "pending",
    })
    .select("id")
    .single();

  if (insertErr || !docReq) return NextResponse.json({ error: "Failed to create request" }, { status: 500 });

  await service.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "admin",
    action:      "document_requested",
    target_type: "document_request",
    target_id:   docReq.id,
    metadata:    { client_id, title: title.trim(), category },
  });

  try {
    const [{ data: prof }, { data: clientUser }] = await Promise.all([
      service.from("client_profiles").select("contact_name").eq("user_id", client_id).maybeSingle(),
      service.from("users").select("email").eq("id", client_id).single(),
    ]);

    await service.from("notifications").insert({
      user_id: client_id,
      type:    "document_requested",
      message: `A document has been requested: ${title.trim()}`,
      link:    "/portal/documents",
    });

    if (clientUser?.email) {
      const contactName = (prof?.contact_name as string | undefined) ?? "Client";
      const html = await render(DocumentRequestedEmail({
        contactName,
        documentTitle: title.trim(),
        description:   description.trim(),
        category,
      }));
      await sendEmail({ to: clientUser.email, subject: subject(title.trim()), html });
    }
  } catch (e) {
    console.error("document request notification:", e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ success: true, request_id: docReq.id }, { status: 201 });
}
