"use client";

import { useFormContext } from "react-hook-form";
import { Field, StepHeading, inputCls, selectCls } from "../form-helpers";
import type { OnboardingFormData } from "../onboarding-types";

const BIZ_TYPES = [
  "Sole Proprietorship", "Partnership", "Limited Liability Company",
  "Public Limited Company", "Non-Governmental Organisation",
  "Co-operative Society", "Other",
];

const INDUSTRIES = [
  "Agriculture & Agribusiness", "Banking & Finance", "Construction & Real Estate",
  "Education", "Energy & Utilities", "Healthcare & Pharmaceuticals",
  "Hospitality & Tourism", "Information Technology", "Insurance",
  "Legal & Professional Services", "Manufacturing", "Media & Entertainment",
  "Mining & Extractives", "Non-Governmental Organisation", "Oil & Gas",
  "Retail & E-Commerce", "Telecommunications", "Transport & Logistics", "Other",
];

export function Step1Business() {
  const { register, formState: { errors } } = useFormContext<OnboardingFormData>();

  return (
    <div>
      <StepHeading
        title="Business information"
        subtitle="Tell us about your business. Fields marked * are required."
      />
      <div className="space-y-5">
        <Field label="Legal business name *" id="legalName" error={errors.legalName?.message}>
          <input id="legalName" type="text" {...register("legalName")}
            className={inputCls(!!errors.legalName)} aria-invalid={!!errors.legalName}
            aria-describedby={errors.legalName ? "legalName-err" : undefined} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Trading name" id="tradingName" optional>
            <input id="tradingName" type="text" {...register("tradingName")} className={inputCls(false)} />
          </Field>
          <Field label="Registration number" id="regNumber" optional>
            <input id="regNumber" type="text" {...register("regNumber")} className={inputCls(false)} />
          </Field>
        </div>

        <Field label="Business type *" id="bizType" error={errors.bizType?.message}>
          <div className="relative">
            <select id="bizType" {...register("bizType")}
              className={selectCls(!!errors.bizType)} aria-invalid={!!errors.bizType}
              aria-describedby={errors.bizType ? "bizType-err" : undefined}>
              <option value="">Select type</option>
              {BIZ_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="h-4 w-4 text-navy/40" fill="none" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </Field>

        <Field label="Country *" id="country" error={errors.country?.message}>
          <input id="country" type="text" {...register("country")}
            className={inputCls(!!errors.country)} aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-err" : undefined} />
        </Field>

        <Field label="Industry *" id="industry" error={errors.industry?.message}>
          <div className="relative">
            <select id="industry" {...register("industry")}
              className={selectCls(!!errors.industry)} aria-invalid={!!errors.industry}
              aria-describedby={errors.industry ? "industry-err" : undefined}>
              <option value="">Select industry</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="h-4 w-4 text-navy/40" fill="none" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
}
