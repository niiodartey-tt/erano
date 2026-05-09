"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CreditCard, Bell, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortal, isStateAtLeast } from "@/context/PortalContext";
import type { AccountState } from "@/lib/validateState";

interface MobileNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  show: (s: AccountState) => boolean;
}

const MOBILE_NAV: MobileNavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard",     href: "/portal/dashboard",     show: () => true },
  { icon: FileText,        label: "Invoice",        href: "/portal/invoice",       show: (s) => isStateAtLeast(s, "awaiting_agreement") },
  { icon: CreditCard,      label: "Payments",       href: "/portal/payments",      show: (s) => isStateAtLeast(s, "awaiting_payment") },
  { icon: Bell,            label: "Notifications",  href: "/portal/notifications", show: () => true },
  { icon: User,            label: "Profile",        href: "/portal/profile",       show: () => true },
];

export default function PortalMobileNav() {
  const pathname = usePathname();
  const { accountState } = usePortal();
  const visible = MOBILE_NAV.filter((item) => item.show(accountState));

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-line"
      aria-label="Mobile navigation"
    >
      <div className="flex h-16">
        {visible.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium min-h-[44px] transition-colors",
                active ? "text-gold" : "text-body hover:text-navy",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
