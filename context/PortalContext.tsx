"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { AccountState } from "@/lib/validateState";

export const STATE_ORDER: AccountState[] = [
  "pending",
  "awaiting_agreement",
  "awaiting_payment",
  "awaiting_confirmation",
  "active",
  "expired",
];

export function isStateAtLeast(current: AccountState, min: AccountState): boolean {
  return STATE_ORDER.indexOf(current) >= STATE_ORDER.indexOf(min);
}

interface PortalContextValue {
  accountState: AccountState;
  userName: string;
  userId: string;
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

interface PortalProviderProps {
  accountState: AccountState;
  userName: string;
  userId: string;
  children: ReactNode;
}

export function PortalProvider({
  accountState,
  userName,
  userId,
  children,
}: PortalProviderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function toggleMobileNav() {
    setIsMobileNavOpen((prev) => !prev);
  }

  return (
    <PortalContext.Provider
      value={{ accountState, userName, userId, isMobileNavOpen, toggleMobileNav }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}
