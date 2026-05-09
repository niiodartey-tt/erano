"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Users, FileText, FolderOpen, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  exact?: boolean;
}

const NAV: NavItem[] = [
  { icon: LayoutDashboard, label: "Inbox",            href: "/admin",            exact: true },
  { icon: Users,           label: "All Clients",      href: "/admin/clients" },
  { icon: FileText,        label: "Invoice Manager",  href: "/admin/invoices" },
  { icon: FolderOpen,      label: "Document Manager", href: "/admin/documents" },
];

export default function AdminSidebar({ pendingCount }: { pendingCount: number }) {
  const pathname = usePathname();

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <aside
      className="hidden md:flex flex-col w-[260px] shrink-0 h-screen sticky top-0 bg-navy"
      aria-label="Admin navigation"
    >
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-xl font-extrabold tracking-tight text-white">ERANO</p>
        <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-gold mt-0.5">
          Admin
        </p>
        <span className="mt-3 block h-0.5 w-8 bg-gold" aria-hidden="true" />
      </div>

      <nav className="flex-1 overflow-y-auto py-4" aria-label="Admin menu">
        <ul role="list" className="flex flex-col gap-0.5 px-3">
          {NAV.map(({ icon: Icon, label, href, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm min-h-[44px] transition-colors border-l-2",
                    active
                      ? "border-gold text-gold bg-white/10"
                      : "border-transparent text-white/60 hover:text-white hover:bg-white/5",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {href === "/admin" && pendingCount > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gold text-navy text-[11px] font-bold">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors min-h-[44px]"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
