"use client";

import { createContext, useContext, type ReactNode } from "react";

interface AdminContextValue {
  adminId: string;
  adminName: string;
}

const AdminContext = createContext<AdminContextValue | null>(null);

interface AdminProviderProps {
  adminId: string;
  adminName: string;
  children: ReactNode;
}

export function AdminProvider({ adminId, adminName, children }: AdminProviderProps) {
  return (
    <AdminContext.Provider value={{ adminId, adminName }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
