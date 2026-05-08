"use client";

import { useFormContext } from "react-hook-form";
import { Field, StepHeading, inputCls } from "../form-helpers";
import type { OnboardingFormData } from "../onboarding-types";

export function Step2Contact() {
  const { register, formState: { errors } } = useFormContext<OnboardingFormData>();

  return (
    <div>
      <StepHeading
        title="Contact details"
        subtitle="Who is the primary contact for this account?"
      />
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full name *" id="contactName" error={errors.contactName?.message}>
            <input id="contactName" type="text" {...register("contactName")}
              className={inputCls(!!errors.contactName)} aria-invalid={!!errors.contactName}
              aria-describedby={errors.contactName ? "contactName-err" : undefined} />
          </Field>
          <Field label="Role / title *" id="contactRole" error={errors.contactRole?.message}>
            <input id="contactRole" type="text" placeholder="e.g. Managing Director"
              {...register("contactRole")}
              className={inputCls(!!errors.contactRole)} aria-invalid={!!errors.contactRole}
              aria-describedby={errors.contactRole ? "contactRole-err" : undefined} />
          </Field>
        </div>

        <Field label="Email address *" id="contactEmail" error={errors.contactEmail?.message}>
          <input id="contactEmail" type="email" {...register("contactEmail")}
            className={inputCls(!!errors.contactEmail)} aria-invalid={!!errors.contactEmail}
            aria-describedby={errors.contactEmail ? "contactEmail-err" : undefined} />
        </Field>

        <Field label="Phone number *" id="contactPhone" error={errors.contactPhone?.message}>
          <input id="contactPhone" type="tel" placeholder="+233 55 000 0000"
            {...register("contactPhone")}
            className={inputCls(!!errors.contactPhone)} aria-invalid={!!errors.contactPhone}
            aria-describedby={errors.contactPhone ? "contactPhone-err" : undefined} />
        </Field>

        <Field label="Office address *" id="address" error={errors.address?.message}>
          <textarea id="address" rows={3} placeholder="Building, street, city, region"
            {...register("address")}
            className={inputCls(!!errors.address) + " resize-none"}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-err" : undefined} />
        </Field>
      </div>
    </div>
  );
}
