import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Privacy Policy — Erano Consulting",
  description: "How Erano Consulting collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy — Erano Consulting",
    url:   "https://eranoconsulting.com/privacy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
