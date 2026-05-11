import { createServerClient as createSsrClient } from "@supabase/ssr";
import { createServerClient as createServiceClient } from "@/lib/supabase-server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AccountState } from "@/lib/validateState";
import { PortalProvider } from "@/context/PortalContext";
import PortalSidebar from "@/components/portal/layout/PortalSidebar";
import PortalHeader from "@/components/portal/layout/PortalHeader";
import PortalMobileNav from "@/components/portal/layout/PortalMobileNav";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const headersList = headers();
  const invokePath = headersList.get("x-invoke-path") ?? "";
  const isSetPasswordPath = invokePath.includes("set-password");

  // Cookie-based client — validates JWT without bypassing RLS
  const supabase = createSsrClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Read-only in Server Components — session refresh not possible here
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && !isSetPasswordPath) redirect("/login");
  if (!user) return <>{children}</>;

  // Service role client — bypasses RLS to reliably read the users row
  const admin = createServiceClient();
  const { data: profile } = await admin
    .from("users")
    .select("role, account_state, must_change_password")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");
  if (profile.role !== "client") redirect("/admin");

  if (profile.must_change_password && !invokePath.includes("set-password")) {
    redirect("/portal/set-password");
  }

  const accountState = profile.account_state as AccountState;

  const { data: clientProfile } = await admin
    .from("client_profiles")
    .select("contact_name")
    .eq("user_id", user.id)
    .single();

  const userName = clientProfile?.contact_name ?? user.email ?? "User";

  return (
    <PortalProvider accountState={accountState} userName={userName} userId={user.id}>
      <div className="flex min-h-screen bg-off">
        <PortalSidebar accountState={accountState} />
        <div className="flex flex-1 flex-col min-w-0">
          <PortalHeader />
          <main id="main-content" className="flex-1 overflow-y-auto pb-16 md:pb-0">
            {children}
          </main>
        </div>
        <PortalMobileNav />
      </div>
    </PortalProvider>
  );
}
