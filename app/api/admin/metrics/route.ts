import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

async function getAuthUser() {
  const cookieStore = cookies();
  const authClient = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() { /* read-only in route handler */ },
      },
    },
  );
  return authClient.auth.getUser();
}

export async function GET() {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();

  const { data: userRow } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!userRow || userRow.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const byState = (state: string) =>
    supabase.from("users").select("*", { count: "exact", head: true }).eq("role", "client").eq("account_state", state);

  const [
    { count: totalClients },
    { count: pendingCount },
    { count: agreementCount },
    { count: paymentCount },
    { count: awaitingCount },
    { count: activeCount },
    { count: expiredCount },
    { data: submissions, error: subError },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }).eq("role", "client"),
    byState("pending"),
    byState("awaiting_agreement"),
    byState("awaiting_payment"),
    byState("awaiting_confirmation"),
    byState("active"),
    byState("expired"),
    supabase
      .from("users")
      .select("id, account_state, created_at, client_profiles(contact_name, legal_name, industry, packages(name))")
      .eq("role", "client")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  if (subError) {
    console.error("admin/metrics submissions:", subError.code);
    return NextResponse.json({ error: "Failed to load submissions." }, { status: 500 });
  }

  return NextResponse.json({
    metrics: {
      total_clients:         totalClients  ?? 0,
      pending_submissions:   pendingCount  ?? 0,
      awaiting_confirmation: awaitingCount ?? 0,
      active_clients:        activeCount   ?? 0,
    },
    state_counts: {
      pending:               pendingCount   ?? 0,
      awaiting_agreement:    agreementCount ?? 0,
      awaiting_payment:      paymentCount   ?? 0,
      awaiting_confirmation: awaitingCount  ?? 0,
      active:                activeCount    ?? 0,
      expired:               expiredCount   ?? 0,
    },
    submissions: submissions ?? [],
  });
}
