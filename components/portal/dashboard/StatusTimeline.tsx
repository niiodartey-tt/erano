"use client";

import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Application submitted",
  "Team review",
  "Agreement & invoice",
  "Account activated",
];

export default function StatusTimeline({ activeStep }: { activeStep: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex flex-col" aria-label="Application status">
      {STEPS.map((label, idx) => {
        const n = idx + 1;
        const complete = n < activeStep;
        const active  = n === activeStep;
        const locked  = n > activeStep;
        const last    = idx === STEPS.length - 1;

        return (
          <li key={label} className="relative flex items-start gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 w-0.5 h-full",
                  complete ? "bg-gold/30" : "bg-line",
                )}
                aria-hidden="true"
              />
            )}

            <span
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                complete && "bg-gold text-white",
                active  && "bg-navy text-white",
                locked  && "bg-off text-body border border-line",
              )}
              aria-hidden="true"
            >
              {complete && <Check className="h-4 w-4" />}
              {active && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
              )}
              {locked && <Lock className="h-3.5 w-3.5" />}
            </span>

            <div className="flex flex-col justify-center min-h-[2rem]">
              <p
                className={cn(
                  "text-sm",
                  complete && "font-medium text-navy",
                  active  && "font-semibold text-navy",
                  locked  && "text-body/50",
                )}
              >
                {label}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
