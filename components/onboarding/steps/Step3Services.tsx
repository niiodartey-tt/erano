"use client";

import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { StepHeading } from "../form-helpers";
import type { OnboardingFormData } from "../onboarding-types";

const SERVICE_OPTIONS = [
  "Accountancy Services",
  "Audit & Assurance",
  "Tax Advisory",
  "VAT Compliance",
  "Payroll",
  "Bookkeeping",
  "Business Registration",
  "Advisory & Consulting",
];

export function Step3Services() {
  const { control, formState: { errors } } = useFormContext<OnboardingFormData>();

  return (
    <div>
      <StepHeading
        title="Services needed"
        subtitle="Tick all that apply. At least one required."
      />

      <Controller
        control={control}
        name="services"
        render={({ field }) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Services needed">
            {SERVICE_OPTIONS.map((service) => {
              const isChecked = field.value.includes(service);
              return (
                <label
                  key={service}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 border rounded-lg cursor-pointer transition-colors select-none",
                    isChecked ? "border-gold bg-gold/5 text-navy" : "border-line bg-white text-body hover:border-navy/30",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      field.onChange(
                        isChecked
                          ? field.value.filter((s) => s !== service)
                          : [...field.value, service],
                      );
                    }}
                    className="sr-only"
                    aria-label={service}
                  />
                  <span
                    className={cn(
                      "flex items-center justify-center w-[18px] h-[18px] rounded border shrink-0 transition-colors",
                      isChecked ? "bg-gold border-gold" : "border-line bg-white",
                    )}
                    aria-hidden="true"
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </span>
                  <span className="text-ui-sm font-medium">{service}</span>
                </label>
              );
            })}
          </div>
        )}
      />

      {errors.services && (
        <p role="alert" className="text-xs text-red-600 mt-3">
          {errors.services.message}
        </p>
      )}
    </div>
  );
}
