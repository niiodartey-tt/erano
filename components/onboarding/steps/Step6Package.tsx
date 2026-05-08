"use client";

import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { StepHeading } from "../form-helpers";
import type { OnboardingFormData, Package } from "../onboarding-types";

const POPULAR = "Growth Booster";

interface Step6Props {
  packages: Package[];
  packagesLoading: boolean;
}

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true" aria-label="Loading packages">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-36 rounded-lg bg-line/50 animate-pulse" />
      ))}
    </div>
  );
}

export function Step6Package({ packages, packagesLoading }: Step6Props) {
  const { control, formState: { errors } } = useFormContext<OnboardingFormData>();

  return (
    <div>
      <StepHeading
        title="Package selection"
        subtitle="Select one package. Pricing will be discussed on your consultation call."
      />

      {packagesLoading ? (
        <SkeletonCards />
      ) : (
        <Controller
          control={control}
          name="packageId"
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-label="Package options">
              {packages.map((pkg) => {
                const selected = field.value === pkg.id;
                const popular = pkg.name === POPULAR;
                return (
                  <label
                    key={pkg.id}
                    className={cn(
                      "relative flex flex-col gap-2 p-4 border rounded-lg cursor-pointer transition-colors",
                      selected ? "border-gold bg-gold/5" : "border-line bg-white hover:border-navy/30",
                    )}
                  >
                    <input
                      type="radio"
                      value={pkg.id}
                      checked={selected}
                      onChange={() => field.onChange(pkg.id)}
                      className="sr-only"
                      aria-label={pkg.name}
                    />
                    {popular && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-navy text-white rounded-full">
                        Most popular
                      </span>
                    )}
                    <p className="text-ui font-semibold text-navy">{pkg.name}</p>
                    {pkg.description && (
                      <p className="text-xs text-body leading-relaxed line-clamp-3">{pkg.description}</p>
                    )}
                    <p className="text-xs font-semibold text-body mt-auto pt-1">
                      {pkg.price_ghs !== null
                        ? `${formatCurrency(pkg.price_ghs)}/yr`
                        : "Tailored pricing — agreed after consultation"}
                    </p>
                  </label>
                );
              })}
            </div>
          )}
        />
      )}

      {errors.packageId && (
        <p role="alert" className="text-xs text-red-600 mt-3">
          {errors.packageId.message}
        </p>
      )}
    </div>
  );
}
