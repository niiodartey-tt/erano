import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

const PAGE_SIZE = 20;

const VALID_STATES = new Set([
  "pending", "awaiting_agreement", "awaiting_payment",
  "awaiting_confirmation", "active", "expired",
]);

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

export async function GET(request: Request) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();
  const { data: userRow } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (!userRow || userRow.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page   = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10) || 0);
  const state  = searchParams.get("state") ?? "";
  const search = (searchParams.get("search") ?? "").trim();

  if (state && !VALID_STATES.has(state)) {
    return NextResponse.json({ error: "Invalid state filter" }, { status: 400 });
  }

  // Two-step search: find matching user_ids from client_profiles first
  let matchingIds: string[] | null = null;
  if (search) {
    const { data: matches } = await supabase
      .from("client_profiles")
      .select("user_id")
      .or(`legal_name.ilike.%${search}%,contact_name.ilike.%${search}%`);
    matchingIds = matches?.map((m) => m.user_id) ?? [];
    if (matchingIds.length === 0) {
      return NextResponse.json({ clients: [], total: 0, page, pageSize: PAGE_SIZE });
    }
  }

  let query = supabase
    .from("users")
    .select("id, account_state, created_at, client_profiles(contact_name, legal_name, packages(name))", { count: "exact" })
    .eq("role", "client")
    .order("created_at", { ascending: false })
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

  if (state)        query = query.eq("account_state", state);
  if (matchingIds)  query = query.in("id", matchingIds);

  const { data, count, error } = await query;

  if (error) {
    console.error("admin/clients GET:", error.code);
    return NextResponse.json({ error: "Failed to load clients." }, { status: 500 });
  }

  return NextResponse.json({ clients: data ?? [], total: count ?? 0, page, pageSize: PAGE_SIZE });
}
