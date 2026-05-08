import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get started — Erano Consulting",
  description:
    "Start your journey with Erano Consulting. Complete this form to set up your account.",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
