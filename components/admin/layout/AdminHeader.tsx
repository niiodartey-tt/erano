"use client";

import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const PAGE_TITLES: Record<string, string> = {
  "/admin":            "Inbox",
  "/admin/clients":    "All Clients",
  "/admin/invoices":   "Invoice Manager",
  "/admin/documents":  "Document Manager",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const { adminName } = useAdmin();

  const pageTitle = PAGE_TITLES[pathname] ?? PAGE_TITLES[Object.keys(PAGE_TITLES).find((k) => k !== "/admin" && pathname.startsWith(k)) ?? ""] ?? "Admin";

  const initials = adminName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-navy border-b border-white/10 shrink-0">
      <h1 className="text-base md:text-lg font-semibold text-white">{pageTitle}</h1>

      <div className="flex items-center gap-2 md:gap-3">
        <span className="hidden sm:block w-px h-6 bg-white/10" aria-hidden="true" />
        <button
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors min-h-[44px]"
          aria-label="Admin account menu"
        >
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-navy text-xs font-semibold shrink-0"
            aria-hidden="true"
          >
            {initials}
          </span>
          <span className="hidden sm:block max-w-[160px] text-sm font-medium text-white truncate">
            {adminName}
          </span>
          <ChevronDown className="hidden sm:block h-4 w-4 text-white/40 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
