import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Services — Erano Client Portal",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
