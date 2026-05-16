"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminContextValue {
  adminId: string;
  adminName: string;
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

interface AdminProviderProps {
  adminId: string;
  adminName: string;
  children: ReactNode;
}

export function AdminProvider({ adminId, adminName, children }: AdminProviderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen((v) => !v);

  return (
    <AdminContext.Provider value={{ adminId, adminName, isMobileNavOpen, toggleMobileNav }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
