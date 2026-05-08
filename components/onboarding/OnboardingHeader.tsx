import Link from "next/link";

export function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-white border-b border-line shadow-nav">
      <Link
        href="/"
        className="text-navy font-bold text-lg tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded"
        aria-label="Erano Consulting — return to homepage"
      >
        ERANO
      </Link>
      <Link
        href="/login"
        className="text-xs text-body hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded px-1"
      >
        Already have an account?{" "}
        <span className="font-semibold text-navy underline underline-offset-2">
          Log in
        </span>
      </Link>
    </header>
  );
}
