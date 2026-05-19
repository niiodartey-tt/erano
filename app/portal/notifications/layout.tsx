import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications — Erano Client Portal",
  description: "View and manage your in-app notifications.",
};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
