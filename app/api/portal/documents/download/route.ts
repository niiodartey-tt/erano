import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { getDocumentUploadUrl } from "@/lib/storage";

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
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const filePath = request.nextUrl.searchParams.get("path");
  if (!filePath) return NextResponse.json({ error: "path is required." }, { status: 400 });

  const supabase = createServerClient();

  // Ownership check — prevents IDOR
  const { data: upload } = await supabase
    .from("document_uploads")
    .select("id")
    .eq("file_path", filePath)
    .eq("client_id", user.id)
    .maybeSingle();

  if (!upload) return NextResponse.json({ error: "File not found." }, { status: 404 });

  try {
    const signedUrl = await getDocumentUploadUrl(filePath);
    return NextResponse.json({ signedUrl });
  } catch (err) {
    console.error("documents/download signed URL:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to generate download link." }, { status: 500 });
  }
}
