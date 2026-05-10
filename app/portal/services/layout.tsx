import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Services — Erano Consulting",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
