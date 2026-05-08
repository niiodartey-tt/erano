import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign in — Erano Consulting",
  description: "Sign in to your Erano Consulting client portal",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
