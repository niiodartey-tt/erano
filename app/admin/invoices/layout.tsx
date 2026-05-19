import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Invoices — Erano Admin",
};

export default function InvoicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
