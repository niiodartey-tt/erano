// SERVER SIDE ONLY — never import this file in client components
import { createServerClient } from "@/lib/supabase-server";

// Always use production callback URL — must match Supabase redirect allowlist.
// Do not use NEXT_PUBLIC_SITE_URL here as preview URLs are not in the allowlist.
const CALLBACK_URL = "https://erano.vercel.app/auth/callback";

export async function generateMagicLink(email: string): Promise<string> {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: CALLBACK_URL,
    },
  });

  if (error) throw new Error(`Failed to generate magic link: ${error.message}`);
  if (!data.properties?.action_link) throw new Error("No action link returned");
  const actionUrl = new URL(data.properties.action_link);
  actionUrl.searchParams.set("redirect_to", CALLBACK_URL);
  return actionUrl.toString();
}
