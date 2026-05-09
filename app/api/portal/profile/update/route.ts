import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { requireState, StateValidationError } from "@/lib/validateState";
import { z } from "zod";

const updateSchema = z.object({
  contactName:  z.string().min(2).max(200).trim(),
  contactRole:  z.string().min(2).max(100).trim(),
  contactPhone: z.string().min(7).max(30).trim(),
  address:      z.string().min(5).max(500).trim(),
});

export async function PATCH(request: Request) {
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

  try {
    await requireState(user.id, [
      "pending",
      "awaiting_agreement",
      "awaiting_payment",
      "awaiting_confirmation",
      "active",
    ]);
  } catch (err) {
    if (err instanceof StateValidationError) {
      return NextResponse.json(
        { error: "Profile updates are not permitted in your current account state." },
        { status: 403 },
      );
    }
    console.error("requireState error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const result = updateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  const { contactName, contactRole, contactPhone, address } = result.data;
  const supabase = createServerClient();

  const { error: updateError } = await supabase
    .from("client_profiles")
    .update({
      contact_name:  contactName,
      contact_role:  contactRole,
      contact_phone: contactPhone,
      address,
    })
    .eq("user_id", user.id);

  if (updateError) {
    console.error("profile_update DB error:", updateError.code);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }

  await supabase.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "client",
    action:      "profile_updated",
    target_type: "client_profile",
    target_id:   user.id,
  });

  return NextResponse.json({ success: true });
}
