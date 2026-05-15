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
    .from("invoices")
    .select("id, invoice_number, final_price_ghs, status, generated_at, service_end_date, packages(name)")
    .eq("client_id", user.id)
    .order("generated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("invoice/me fetch error:", error.code);
    return NextResponse.json({ error: "Failed to fetch invoice." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "No invoice found." }, { status: 404 });
  }

  const packageName = (data.packages as unknown as { name: string } | null)?.name ?? null;

  return NextResponse.json({
    id:               data.id,
    invoice_number:   data.invoice_number,
    final_price_ghs:  Number(data.final_price_ghs),
    status:           data.status,
    generated_at:     data.generated_at,
    service_end_date: (data.service_end_date as string | null) ?? null,
    package_name:     packageName,
  });
}
