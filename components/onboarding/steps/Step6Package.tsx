"use client";

import { useFormContext, Controller } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { StepHeading } from "../form-helpers";
import type { OnboardingFormData, Package } from "../onboarding-types";

type FeatureEntry = {
  everythingIn?: string;
  features: string[];
  highlight: boolean;
  badge: string | null;
};

const customEntry: FeatureEntry = {
  features: [
    "Tailored services for your organisation",
    "Custom pricing based on your needs",
    "Contact us to discuss your requirements",
  ],
  highlight: false,
  badge: "Bespoke",
};

const FEATURES: Record<string, FeatureEntry> = {
  "Free Introductory": {
    features: [
      "Basic Compliance Check",
      "Initial Financial Strategy Consultation",
      "Introduction to Corporate Governance",
      "Business Health Snapshot",
      "Downloadable startup guide",
      "Overview of statutory filings and basic governance practices",
    ],
    highlight: false,
    badge: null,
  },
  "Starter Essentials": {
    features: [
      "Customised Financial Strategy Development (once per year)",
      "Basic Compliance Monitoring (bi-annually)",
      "Annual Statutory Filings",
      "Annual Returns Filing",
      "Basic Compliance Updates (quarterly)",
      "Single Business Valuation Report (once per year)",
      "Basic Process Review (once per year)",
    ],
    highlight: false,
    badge: null,
  },
  "Growth Booster": {
    everythingIn: "Starter Essentials",
    features: [
      "Industry-Specific Consultancy (twice per year)",
      "Monthly Compliance Monitoring and Updates",
      "Quarterly Board Meeting Preparation",
      "Value Enhancement Strategy Session (once per year)",
      "Quarterly Risk Management Workshops",
      "Maintenance of Corporate Records",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  "Business Pro": {
    everythingIn: "Growth Booster",
    features: [
      "Proactive Compliance Monitoring with Alerts (monthly)",
      "Corporate Support and Secretarial Services (as needed)",
      "Audit Representation for Compliance Issues (once per year)",
      "Basic Compliance Training for Staff (bi-annually)",
      "Ongoing Transactional Support (up to 3 transactions per year)",
      "Detailed Process Optimisation Recommendations (bi-annually)",
    ],
    highlight: false,
    badge: null,
  },
  "Elite Advantage": {
    everythingIn: "Business Pro",
    features: [
      "Continuous Corporate Support (monthly consultations)",
      "Custom Compliance Training for Staff (quarterly)",
      "Enhanced Audit Representation (up to twice per year)",
      "Annual Re-valuation for Business Growth Tracking",
      "Continuous Monitoring and Reporting",
      "Customised Internal Control Framework Development",
    ],
    highlight: false,
    badge: "Premium",
  },
  "Custom Offer": customEntry,
  "Custom":       customEntry,
};

interface Step6Props {
  packages: Package[];
  packagesLoading: boolean;
}

function SkeletonCards() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2" aria-busy="true" aria-label="Loading packages">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex-shrink-0 w-72 h-96 rounded-lg bg-line/50 animate-pulse" />
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
        subtitle="Select one package. Pricing will be confirmed on your consultation call."
      />

      {packagesLoading ? <SkeletonCards /> : (
        <Controller
          control={control}
          name="packageId"
          render={({ field }) => (
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1" role="radiogroup" aria-label="Package options">
              {packages.map((pkg) => {
                const selected = field.value === pkg.id;
                const meta    = FEATURES[pkg.name] ?? { features: [], highlight: false, badge: null };
                const isCustom = pkg.price_ghs === null;
                return (
                  <label
                    key={pkg.id}
                    className={cn(
                      "relative flex flex-col flex-shrink-0 w-[272px] rounded-lg cursor-pointer transition-all duration-200 p-5",
                      meta.highlight ? "bg-navy text-white" : "bg-white border border-line",
                      selected
                        ? "ring-2 ring-gold scale-[1.02] shadow-gold"
                        : meta.highlight ? "hover:opacity-90" : "hover:border-gold/40 hover:shadow-subtle",
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

                    {meta.badge && (
                      <span className={cn(
                        "absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full",
                        meta.highlight ? "bg-gold text-navy" : "bg-navy text-white",
                      )}>
                        {meta.badge}
                      </span>
                    )}

                    <p className={cn("text-ui font-semibold mb-1", meta.highlight ? "text-white" : "text-navy")}>
                      {pkg.name}
                    </p>
                    <p className="text-sm font-bold text-gold mb-4">
                      {isCustom ? "Get a Quote" : `${formatCurrency(pkg.price_ghs!)}/yr`}
                    </p>

                    <div className="w-8 h-0.5 bg-gold mb-3" />

                    {meta.everythingIn && (
                      <p className="text-gold text-[11px] font-semibold uppercase tracking-wider mb-2">
                        Everything in {meta.everythingIn} plus:
                      </p>
                    )}

                    <ul className="flex flex-col gap-2 flex-1">
                      {meta.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-gold flex-shrink-0 mt-0.5" />
                          <span className={cn("text-xs leading-relaxed", meta.highlight ? "text-white/80" : "text-body")}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {isCustom && (
                      <p className={cn(
                        "text-[11px] mt-4 pt-3 border-t",
                        meta.highlight ? "text-white/50 border-white/10" : "text-body/60 border-line",
                      )}>
                        Contact us after signing up to discuss your requirements.
                      </p>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        />
      )}

      {errors.packageId && (
        <p role="alert" className="text-xs text-red-600 mt-3">{errors.packageId.message}</p>
      )}
    </div>
  );
}
