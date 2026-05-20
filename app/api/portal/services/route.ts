// SERVER SIDE ONLY
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const cookieStore = await cookies();
  const authClient = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );

  const { data: { user }, error: authError } = await authClient.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServerClient();

  const [{ data: profile, error: profErr }, { data: userRow }] = await Promise.all([
    service
      .from("client_profiles")
      .select("services_needed, packages:package_id(name, description, price_ghs)")
      .eq("user_id", user.id)
      .single(),
    service.from("users").select("account_state").eq("id", user.id).single(),
  ]);

  if (profErr) {
    console.error("[services] profile fetch:", profErr.code, profErr.message);
    return NextResponse.json({ error: "Failed to fetch services." }, { status: 500 });
  }
  if (!profile) return NextResponse.json({ error: "Profile not found." }, { status: 404 });

  const pkg = profile.packages as unknown as
    { name: string; description: string; price_ghs: number | null } | null;

  return NextResponse.json({
    services_needed: (profile.services_needed as string[]) ?? [],
    package:         pkg ?? null,
    account_state:   userRow?.account_state ?? null,
  });
}
