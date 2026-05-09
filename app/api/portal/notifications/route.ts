import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { z } from "zod";

const patchSchema = z.object({ id: z.string().uuid() });

async function getAuthUser() {
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
  return authClient.auth.getUser();
}

export async function GET() {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("id, type, message, read, link, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("notifications/GET:", error.code);
    return NextResponse.json({ error: "Failed to load notifications." }, { status: 500 });
  }

  return NextResponse.json({ notifications: data ?? [] });
}

export async function PATCH(request: Request) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as unknown;
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const supabase = createServerClient();
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", parsed.data.id)
    .eq("user_id", user.id);

  if (error) {
    console.error("notifications/PATCH:", error.code);
    return NextResponse.json({ error: "Failed to update notification." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
