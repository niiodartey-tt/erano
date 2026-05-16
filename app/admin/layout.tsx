import { createServerClient as createSsrClient } from "@supabase/ssr";
import { createServerClient as createServiceClient } from "@/lib/supabase-server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminProvider } from "@/context/AdminContext";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import { IdleTimeout } from "@/components/ui/IdleTimeout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") ?? "";
  if (pathname === "/admin/login") return <>{children}</>;

  const cookieStore = cookies();

  const supabase = createSsrClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Read-only in Server Components
          }
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const service = createServiceClient();
  const { data: userRow } = await service
    .from("users")
    .select("role, email")
    .eq("id", user.id)
    .single();

  if (!userRow) redirect("/admin/login");
  if (userRow.role !== "admin") redirect("/portal/dashboard");

  const adminName = user.user_metadata?.full_name as string | undefined
    ?? userRow.email
    ?? "Admin";

  const { count: pendingCount } = await service
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "client")
    .eq("account_state", "pending");

  return (
    <AdminProvider adminId={user.id} adminName={adminName}>
      <div className="flex min-h-screen bg-ink">
        <AdminSidebar pendingCount={pendingCount ?? 0} />
        <div className="flex flex-1 flex-col min-w-0">
          <AdminHeader />
          <main id="main-content" className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <IdleTimeout loginUrl="/admin/login" />
    </AdminProvider>
  );
}
