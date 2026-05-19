import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { render } from "@react-email/render";
import { PasswordChangedEmail, subject as passwordChangedSubject } from "@/emails/PasswordChangedEmail";
import { sendEmail } from "@/lib/email";

export async function POST() {
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

  const { data: profile } = await supabase
    .from("client_profiles")
    .select("contact_name")
    .eq("user_id", user.id)
    .maybeSingle();
  const contactName = profile?.contact_name ?? "there";

  try {
    const emailHtml = await render(PasswordChangedEmail({ contactName }));
    await sendEmail({ to: user.email!, subject: passwordChangedSubject, html: emailHtml });
  } catch (emailErr) {
    console.error("[password-changed-notification] Email failed:", emailErr instanceof Error ? emailErr.message : emailErr);
  }

  return NextResponse.json({ success: true });
}
