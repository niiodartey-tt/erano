"use client";

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface AdminContextValue {
  adminId: string;
  adminName: string;
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  pendingCount: number;
  setPendingCount: Dispatch<SetStateAction<number>>;
  triggerDashboardRefresh: () => void;
  dashboardRefreshKey: number;
}

const AdminContext = createContext<AdminContextValue | null>(null);

interface AdminProviderProps {
  adminId: string;
  adminName: string;
  initialPendingCount?: number;
  children: ReactNode;
}

export function AdminProvider({ adminId, adminName, initialPendingCount = 0, children }: AdminProviderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen((v) => !v);
  const [pendingCount, setPendingCount] = useState(initialPendingCount);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);
  const triggerDashboardRefresh = () => setDashboardRefreshKey((k) => k + 1);

  return (
    <AdminContext.Provider value={{
      adminId, adminName, isMobileNavOpen, toggleMobileNav,
      pendingCount, setPendingCount, triggerDashboardRefresh, dashboardRefreshKey,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
