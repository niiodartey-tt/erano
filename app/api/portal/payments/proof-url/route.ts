import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { getPaymentProofUrl } from "@/lib/storage";

export async function GET(request: NextRequest) {
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
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "path parameter is required." }, { status: 400 });
  }

  // Ownership check — client can only fetch their own files
  const supabase = createServerClient();
  const { data: proof } = await supabase
    .from("payment_proofs")
    .select("id")
    .eq("client_id", user.id)
    .eq("file_path", path)
    .maybeSingle();

  if (!proof) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  try {
    const url = await getPaymentProofUrl(path);
    return NextResponse.redirect(url, 302);
  } catch {
    return NextResponse.json({ error: "Failed to generate download URL." }, { status: 500 });
  }
}
