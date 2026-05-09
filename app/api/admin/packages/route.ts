import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

async function getAuthUser() {
  const cookieStore = cookies();
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

  const { data: packages, error } = await service
    .from("packages")
    .select("id, name, description, price_ghs")
    .eq("is_active", true)
    .order("price_ghs", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("packages_fetch:", error.code);
    return NextResponse.json({ error: "Failed to fetch packages." }, { status: 500 });
  }

  return NextResponse.json({ packages: packages ?? [] });
}
