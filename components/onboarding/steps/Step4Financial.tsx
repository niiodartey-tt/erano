"use client";

import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Field, StepHeading, inputCls } from "../form-helpers";
import type { OnboardingFormData } from "../onboarding-types";

const TURNOVER_OPTIONS = [
  "Below GHS 100,000",
  "GHS 100,000 – 500,000",
  "GHS 500,001 – 1,000,000",
  "Above GHS 1,000,000",
];

function RadioCard({ name, value, checked, onChange, children }: {
  name: string; value: string; checked: boolean;
  onChange: () => void; children: React.ReactNode;
}) {
  return (
    <label className={cn(
      "flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors select-none",
      checked ? "border-gold bg-gold/5 text-navy font-medium" : "border-line bg-white text-body hover:border-navy/30",
    )}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={cn("w-4 h-4 rounded-full border shrink-0 transition-colors",
        checked ? "border-gold bg-gold" : "border-line bg-white")} aria-hidden="true" />
      <span className="text-ui-sm">{children}</span>
    </label>
  );
}

export function Step4Financial() {
  const { register, control, formState: { errors } } = useFormContext<OnboardingFormData>();

  return (
    <div>
      <StepHeading title="Financial profile" subtitle="This helps us match you with the right team." />
      <div className="space-y-6">
        <div>
          <p className="text-ui-sm font-medium text-navy mb-3">Annual turnover bracket *</p>
          <Controller control={control} name="turnover" render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TURNOVER_OPTIONS.map((opt) => (
                <RadioCard key={opt} name="turnover" value={opt} checked={field.value === opt} onChange={() => field.onChange(opt)}>
                  {opt}
                </RadioCard>
              ))}
            </div>
          )} />
          {errors.turnover && <p role="alert" className="text-xs text-red-600 mt-1">{errors.turnover.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Number of employees *" id="employees" error={errors.employees?.message}>
            <input id="employees" type="number" min={1} {...register("employees", { valueAsNumber: true })}
              className={inputCls(!!errors.employees)} aria-invalid={!!errors.employees}
              aria-describedby={errors.employees ? "employees-err" : undefined} />
          </Field>
          <Field label="Last audited year" id="lastAudit" optional>
            <input id="lastAudit" type="text" placeholder="e.g. 2023" {...register("lastAudit")} className={inputCls(false)} />
          </Field>
        </div>

        <div>
          <p className="text-ui-sm font-medium text-navy mb-3">Do you currently have an accountant? *</p>
          <Controller control={control} name="hasAccountant" render={({ field }) => (
            <div className="grid grid-cols-2 gap-2">
              {(["yes", "no"] as const).map((opt) => (
                <RadioCard key={opt} name="hasAccountant" value={opt} checked={field.value === opt} onChange={() => field.onChange(opt)}>
                  {opt === "yes" ? "Yes" : "No"}
                </RadioCard>
              ))}
            </div>
          )} />
          {errors.hasAccountant && <p role="alert" className="text-xs text-red-600 mt-1">{errors.hasAccountant.message}</p>}
        </div>
      </div>
    </div>
  );
}
