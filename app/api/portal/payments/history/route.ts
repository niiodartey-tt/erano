import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const cookieStore = await cookies();

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

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("payment_proofs")
    .select("id, amount_paid, currency, payment_method, transaction_reference, status, uploaded_at, file_path")
    .eq("client_id", user.id)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("payments/history fetch:", error.code);
    return NextResponse.json({ error: "Failed to fetch payment history." }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
