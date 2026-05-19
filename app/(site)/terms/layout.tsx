import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Terms of Service — Erano Consulting",
  description: "The terms governing use of Erano Consulting's website and professional services.",
  openGraph: {
    title: "Terms of Service — Erano Consulting",
    url:   "https://eranoconsulting.com/terms",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
