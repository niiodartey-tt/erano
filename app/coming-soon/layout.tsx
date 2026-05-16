import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Coming Soon — Erano Consulting",
  description: "Erano Consulting — Tax Advisory, Audit, Accounting. Coming soon.",
  robots:      { index: false, follow: false },
};

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
