"use client";

import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { StepHeading } from "../form-helpers";
import type { OnboardingFormData } from "../onboarding-types";

const QUESTIONS: { field: "graRegistered" | "vatRegistered" | "outstandingObligations"; label: string }[] = [
  { field: "graRegistered",          label: "Are you registered with the Ghana Revenue Authority (GRA)?" },
  { field: "vatRegistered",          label: "Are you VAT registered?" },
  { field: "outstandingObligations", label: "Do you have any outstanding tax obligations?" },
];

export function Step5Compliance() {
  const { control, formState: { errors } } = useFormContext<OnboardingFormData>();

  return (
    <div>
      <StepHeading
        title="Compliance status"
        subtitle="Tick the correct answer for each question."
      />
      <div className="space-y-6">
        {QUESTIONS.map(({ field, label }) => (
          <div key={field}>
            <p className="text-ui-sm font-medium text-navy mb-3">{label} *</p>
            <Controller
              control={control}
              name={field}
              render={({ field: f }) => (
                <div className="grid grid-cols-2 gap-2" role="group" aria-label={label}>
                  {(["yes", "no"] as const).map((opt) => (
                    <label
                      key={opt}
                      className={cn(
                        "flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors select-none",
                        f.value === opt
                          ? "border-gold bg-gold/5 text-navy font-semibold"
                          : "border-line bg-white text-body hover:border-navy/30",
                      )}
                    >
                      <input
                        type="radio"
                        value={opt}
                        checked={f.value === opt}
                        onChange={() => f.onChange(opt)}
                        className="sr-only"
                        aria-label={opt === "yes" ? "Yes" : "No"}
                      />
                      <span className="text-ui-sm">{opt === "yes" ? "Yes" : "No"}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors[field] && (
              <p role="alert" className="text-xs text-red-600 mt-1">
                {errors[field]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
