// SERVER SIDE ONLY — never import this file in client components
import { createServerClient } from "@/lib/supabase-server";

export async function generateMagicLink(email: string): Promise<string> {
  const supabase = createServerClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) throw new Error("Missing NEXT_PUBLIC_SITE_URL");

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) throw new Error(`Failed to generate magic link: ${error.message}`);
  if (!data.properties?.action_link) throw new Error("No action link returned");

  return data.properties.action_link;
}
