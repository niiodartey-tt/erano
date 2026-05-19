import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { STEPS } from "./onboarding-types";

interface OnboardingSidebarProps {
  currentStep: number;
}

export function OnboardingSidebar({ currentStep }: OnboardingSidebarProps) {
  const allDone = currentStep >= STEPS.length;

  return (
    <aside className="hidden lg:flex flex-col w-[360px] shrink-0 bg-navy text-white sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex-1 p-10">
        <p className="text-eyebrow uppercase tracking-widest text-white/50 mb-4">
          Client onboarding
        </p>
        <h2 className="text-sub font-bold text-white mb-3">
          Let&apos;s get you started with Erano
        </h2>
        <p className="text-ui-sm text-white/50 mb-10 leading-relaxed">
          Complete this form in under 5 minutes. Our team will contact you
          within 24 hours.
        </p>

        <nav aria-label="Form progress">
          <ol className="space-y-1">
            {STEPS.map((step, idx) => {
              const isDone = allDone || idx < currentStep;
              const isActive = !allDone && idx === currentStep;
              return (
                <li key={step.label} className="flex items-center gap-3 py-2">
                  <span
                    className={cn(
                      "flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-xs font-bold transition-colors",
                      isDone || isActive
                        ? "bg-gold text-white"
                        : "border border-white/25 text-white/30",
                    )}
                    aria-hidden="true"
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-ui-sm transition-colors",
                      isActive && "text-white font-medium",
                      !isActive && isDone && "text-white/60",
                      !isActive && !isDone && "text-white/30",
                    )}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="px-10 pb-8">
        <p className="text-xs text-white/30">
          Your data is secure.{" "}
          <Link
            href="/privacy"
            className="text-white/50 underline hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </aside>
  );
}
