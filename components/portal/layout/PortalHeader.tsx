"use client";

import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import NotificationBell from "@/components/portal/notifications/NotificationBell";

const PAGE_TITLES: Record<string, string> = {
  "/portal/dashboard":     "Dashboard",
  "/portal/invoice":       "My Invoice",
  "/portal/payments":      "Payments",
  "/portal/documents":     "My Documents",
  "/portal/services":      "My Services",
  "/portal/notifications": "Notifications",
  "/portal/profile":       "Profile",
};

export default function PortalHeader() {
  const pathname = usePathname();
  const { userName, toggleMobileNav } = usePortal();

  const pageTitle = PAGE_TITLES[pathname] ?? "Portal";

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-line shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileNav}
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-navy hover:bg-off transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <h1 className="text-base md:text-lg font-semibold text-navy">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <NotificationBell />

        <span className="hidden sm:block w-px h-6 bg-line" aria-hidden="true" />

        <button
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-off transition-colors min-h-[44px]"
          aria-label="Account menu"
        >
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white text-xs font-semibold shrink-0"
            aria-hidden="true"
          >
            {initials}
          </span>
          <span className="hidden sm:block max-w-[120px] text-sm font-medium text-navy truncate">
            {userName}
          </span>
          <ChevronDown className="hidden sm:block h-4 w-4 text-body shrink-0" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
