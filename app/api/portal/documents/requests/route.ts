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
        setAll() { /* read-only */ },
      },
    },
  );

  const { data: { user }, error: authError } = await authClient.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("document_requests")
    .select("id, title, description, category, status, created_at, document_uploads(id, uploaded_at)")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("documents/requests GET:", error.code);
    return NextResponse.json({ error: "Failed to load document requests." }, { status: 500 });
  }

  return NextResponse.json({ requests: data ?? [] });
}
