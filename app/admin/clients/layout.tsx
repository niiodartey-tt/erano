import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients — Erano Admin",
};

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
