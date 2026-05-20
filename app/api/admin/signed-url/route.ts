import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { generateSignedUrl, SIGNED_URL_EXPIRY } from "@/lib/storage";

const ALLOWED_BUCKETS: Record<string, number> = {
  "payment-proofs":    SIGNED_URL_EXPIRY.paymentProofs,
  "document-uploads":  SIGNED_URL_EXPIRY.documentUploads,
  "invoices":          SIGNED_URL_EXPIRY.invoices,
};

async function getAuthUser() {
  const cookieStore = await cookies();
  const c = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );
  return c.auth.getUser();
}

export async function GET(req: NextRequest) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { createServerClient } = await import("@/lib/supabase-server");
  const service = createServerClient();
  const { data: adminRow } = await service.from("users").select("role").eq("id", user.id).single();
  if (!adminRow || adminRow.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const bucket = req.nextUrl.searchParams.get("bucket");
  const path   = req.nextUrl.searchParams.get("path");

  if (!bucket || !path) return NextResponse.json({ error: "bucket and path required" }, { status: 400 });

  const expiry = ALLOWED_BUCKETS[bucket];
  if (expiry === undefined) return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });

  let url: string;
  try {
    url = await generateSignedUrl(bucket, path, expiry);
  } catch {
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
  }

  try {
    await service.from("audit_log").insert({
      actor_id:    user.id,
      actor_role:  "admin",
      action:      "file_accessed",
      target_type: "storage",
      metadata:    { bucket, path },
    });
  } catch (auditErr) {
    console.error("audit_log insert (file_accessed):", auditErr instanceof Error ? auditErr.message : auditErr);
  }

  return NextResponse.redirect(url, 302);
}
