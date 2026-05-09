import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments — Erano Consulting",
  description: "Submit payment proof and view your payment history.",
};

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
