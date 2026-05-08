import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Set your password — Erano Consulting",
  description: "Create your Erano Consulting account password",
};

export default function SetPasswordLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
