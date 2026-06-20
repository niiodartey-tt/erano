import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { render } from "@react-email/render";
import { PasswordChangedEmail, subject as passwordChangedSubject } from "@/emails/PasswordChangedEmail";
import { sendEmail } from "@/lib/email";
import { passwordFlagRatelimit } from "@/lib/ratelimit";

export async function POST() {
  const cookieStore = await cookies();

  // Verify the authenticated user via session cookie
  const authClient = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() { /* no-op — read-only verification */ },
      },
    },
  );

  const { data: { user }, error: authError } = await authClient.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success: rateLimitOk } = await passwordFlagRatelimit.limit(`pwflag:${user.id}`);
  if (!rateLimitOk) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  // Service role client for privileged DB writes
  const supabase = createServerClient();

  const { error: updateError } = await supabase
    .from("users")
    .update({ must_change_password: false })
    .eq("id", user.id);

  if (updateError) {
    console.error("clear-password-flag update error:", updateError);
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }

  await supabase.from("audit_log").insert({
    actor_id:    user.id,
    actor_role:  "client",
    action:      "password_changed_on_first_login",
    target_type: "user",
    target_id:   user.id,
  });

  try {
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("contact_name")
      .eq("user_id", user.id)
      .maybeSingle();
    const contactName = profile?.contact_name ?? "there";
    const emailHtml = await render(PasswordChangedEmail({ contactName }));
    await sendEmail({ to: user.email!, subject: passwordChangedSubject, html: emailHtml });
  } catch (emailErr) {
    console.error("[clear-password-flag] Password changed email failed:", emailErr instanceof Error ? emailErr.message : emailErr);
  }

  return NextResponse.json({ success: true });
}
