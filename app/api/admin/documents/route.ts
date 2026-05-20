import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

async function getAuthUser() {
  const cookieStore = await cookies();
  const c = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );
  return c.auth.getUser();
}

export async function GET() {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServerClient();
  const { data: adminRow } = await service.from("users").select("role").eq("id", user.id).single();
  if (!adminRow || adminRow.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: requests, error } = await service
    .from("document_requests")
    .select("id, client_id, title, category, status, created_at, document_uploads(id)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("documents_list:", error.code, error.message);
    return NextResponse.json({ error: "Failed to fetch document requests." }, { status: 500 });
  }

  if (!requests || requests.length === 0) return NextResponse.json({ requests: [] });

  const clientIds = Array.from(new Set(requests.map((r) => r.client_id)));
  const { data: profiles } = await service
    .from("client_profiles")
    .select("user_id, contact_name, legal_name")
    .in("user_id", clientIds);

  const profileMap = new Map((profiles ?? []).map((p) => [p.user_id, p]));

  const result = requests.map((r) => ({
    id:           r.id,
    client_id:    r.client_id,
    contact_name: profileMap.get(r.client_id)?.contact_name ?? null,
    legal_name:   profileMap.get(r.client_id)?.legal_name ?? null,
    title:        r.title,
    category:     r.category,
    status:       r.status,
    created_at:   r.created_at,
    upload_count: Array.isArray(r.document_uploads) ? r.document_uploads.length : 0,
  }));

  return NextResponse.json({ requests: result });
}
