import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My invoice — Erano Consulting",
  description: "View your Erano Consulting service invoice and payment details.",
};

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
