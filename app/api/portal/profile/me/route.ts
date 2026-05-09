import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const cookieStore = cookies();

  const authClient = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() { /* read-only verification */ },
      },
    },
  );

  const { data: { user }, error: authError } = await authClient.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("client_profiles")
    .select("legal_name, contact_name, contact_role, contact_phone, address, packages(name)")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("profile/me fetch error:", error.code);
    return NextResponse.json({ error: "Failed to fetch profile." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  const packageName =
    (data.packages as { name: string }[] | null)?.[0]?.name ?? null;

  return NextResponse.json({
    legal_name:    data.legal_name,
    contact_name:  data.contact_name,
    contact_role:  data.contact_role,
    contact_phone: data.contact_phone,
    address:       data.address,
    package_name:  packageName,
    email:         user.email ?? "",
  });
}
