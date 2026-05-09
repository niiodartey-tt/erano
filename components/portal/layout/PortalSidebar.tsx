"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, FileText, CreditCard,
  FolderOpen, Briefcase, Bell, User, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortal, isStateAtLeast } from "@/context/PortalContext";
import type { AccountState } from "@/lib/validateState";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  show: (s: AccountState) => boolean;
}

const NAV: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard",     href: "/portal/dashboard",     show: () => true },
  { icon: FileText,        label: "My Invoice",    href: "/portal/invoice",       show: (s) => isStateAtLeast(s, "awaiting_agreement") },
  { icon: CreditCard,      label: "Payments",      href: "/portal/payments",      show: (s) => isStateAtLeast(s, "awaiting_payment") },
  { icon: FolderOpen,      label: "My Documents",  href: "/portal/documents",     show: (s) => s === "active" },
  { icon: Briefcase,       label: "My Services",   href: "/portal/services",      show: (s) => s === "active" },
  { icon: Bell,            label: "Notifications", href: "/portal/notifications", show: () => true },
  { icon: User,            label: "Profile",       href: "/portal/profile",       show: () => true },
];

const BADGE: Record<AccountState, { label: string; cls: string }> = {
  pending:               { label: "Pending",     cls: "bg-gray-100 text-gray-600" },
  awaiting_agreement:    { label: "Agreement",   cls: "bg-blue-50 text-blue-700" },
  awaiting_payment:      { label: "Payment Due", cls: "bg-amber-50 text-amber-700" },
  awaiting_confirmation: { label: "Confirming",  cls: "bg-purple-50 text-purple-700" },
  active:                { label: "Active",      cls: "bg-green-50 text-green-700" },
  expired:               { label: "Expired",     cls: "bg-red-50 text-red-700" },
};

export default function PortalSidebar({ accountState }: { accountState: AccountState }) {
  const pathname = usePathname();
  const { isMobileNavOpen, toggleMobileNav } = usePortal();
  const badge = BADGE[accountState];

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleMobileNav}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 flex flex-col w-[260px] h-screen bg-navy transition-transform duration-300 ease-in-out",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        aria-label="Portal navigation"
      >
        <div className="px-5 py-6 border-b border-white/10">
          <p className="text-xl font-extrabold tracking-tight text-white">ERANO</p>
          <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-gold mt-0.5">
            Consulting
          </p>
          <span className="mt-3 block h-0.5 w-8 bg-gold" aria-hidden="true" />
          <span className={cn("mt-3 inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium", badge.cls)}>
            {badge.label}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4" aria-label="Portal menu">
          <ul role="list" className="flex flex-col gap-0.5 px-3">
            {NAV.filter((item) => item.show(accountState)).map(({ icon: Icon, label, href }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => { if (isMobileNavOpen) toggleMobileNav(); }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm min-h-[44px] transition-colors border-l-2",
                      active
                        ? "border-gold text-gold bg-white/10"
                        : "border-transparent text-white/60 hover:text-white hover:bg-white/5",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {label}
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
    </>
  );
}
