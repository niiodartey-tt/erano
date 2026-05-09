import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Documents — Erano Consulting",
  description: "View and upload documents requested by your advisor.",
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
