import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { verifyCsrfOrigin } from "@/lib/csrf";

const VALID_STATES = new Set([
  "pending", "awaiting_agreement", "awaiting_payment",
  "awaiting_confirmation", "active", "expired",
]);

async function getAuthUser() {
  const cookieStore = await cookies();
  const c = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } },
  );
  return c.auth.getUser();
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { data: { user }, error: authError } = await getAuthUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const service = createServerClient();
  const { data: adminRow } = await service.from("users").select("role").eq("id", user.id).single();
  if (!adminRow || adminRow.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    verifyCsrfOrigin(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const clientId = (await params).id;

  let body: { state?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { state } = body;
  if (!state || !VALID_STATES.has(state)) {
    return NextResponse.json({ error: "Invalid state value" }, { status: 400 });
  }

  const { data: clientRow } = await service.from("users").select("id").eq("id", clientId).eq("role", "client").maybeSingle();
  if (!clientRow) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const { error: updateErr } = await service
    .from("users")
    .update({ account_state: state })
    .eq("id", clientId);
  if (updateErr) return NextResponse.json({ error: "Update failed" }, { status: 500 });

  await service.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "admin",
    action:      "account_state_updated",
    target_type: "user",
    target_id:   clientId,
    metadata:    { new_state: state },
  });

  return NextResponse.json({ success: true });
}
