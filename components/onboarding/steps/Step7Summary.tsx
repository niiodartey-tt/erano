"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import type { OnboardingFormData, Package } from "../onboarding-types";

interface Step7Props {
  data: OnboardingFormData;
  packages: Package[];
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string;
}

function Group({ title, rows }: { title: string; rows: { label: string; value?: string | null }[] }) {
  const visible = rows.filter((r) => r.value);
  if (!visible.length) return null;
  return (
    <div className="border border-line rounded-lg overflow-hidden">
      <div className="px-5 py-2.5 bg-off border-b border-line">
        <p className="text-ui-sm font-semibold text-navy">{title}</p>
      </div>
      <dl className="divide-y divide-line">
        {visible.map(({ label, value }) => (
          <div key={label} className="flex gap-4 px-5 py-2.5">
            <dt className="text-xs text-body w-40 shrink-0">{label}</dt>
            <dd className="text-xs text-navy font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Step7Summary({ data, packages, onBack, onSubmit, submitting, submitError }: Step7Props) {
  const selectedPkg = packages.find((p) => p.id === data.packageId);

  return (
    <div>
      <h1 className="text-section text-navy mb-1.5">Everything look right?</h1>
      <p className="text-body-sm text-body mb-8">Review your details before submitting.</p>

      <div className="space-y-3 mb-8">
        <Group title="Business" rows={[
          { label: "Legal name",        value: data.legalName },
          { label: "Trading name",      value: data.tradingName },
          { label: "Registration no.",  value: data.regNumber },
          { label: "Business type",     value: data.bizType },
          { label: "Industry",          value: data.industry },
          { label: "Country",           value: data.country },
        ]} />
        <Group title="Contact" rows={[
          { label: "Full name",  value: data.contactName },
          { label: "Role",       value: data.contactRole },
          { label: "Email",      value: data.contactEmail },
          { label: "Phone",      value: data.contactPhone },
          { label: "Address",    value: data.address },
        ]} />
        <Group title="Services" rows={[
          { label: "Selected",  value: data.services.join(", ") },
        ]} />
        <Group title="Financial" rows={[
          { label: "Turnover",        value: data.turnover },
          { label: "Employees",       value: String(data.employees) },
          { label: "Last audit",      value: data.lastAudit },
          { label: "Has accountant",  value: data.hasAccountant === "yes" ? "Yes" : "No" },
        ]} />
        <Group title="Compliance" rows={[
          { label: "GRA registered",          value: data.graRegistered === "yes" ? "Yes" : "No" },
          { label: "VAT registered",          value: data.vatRegistered === "yes" ? "Yes" : "No" },
          { label: "Outstanding obligations", value: data.outstandingObligations === "yes" ? "Yes" : "No" },
        ]} />
        <Group title="Package" rows={[
          { label: "Selected package",  value: selectedPkg?.name ?? "—" },
        ]} />
      </div>

      {submitError && (
        <div role="alert" className="flex items-center gap-2 px-4 py-3 mb-5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          {submitError}
        </div>
      )}

      <div className="pt-6 border-t border-line flex items-center gap-3">
        <button type="button" onClick={onBack} disabled={submitting}
          className="px-6 py-3 text-ui text-body border border-line rounded-lg hover:border-navy hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy min-h-[44px] disabled:opacity-50">
          Back
        </button>
        <button type="button" onClick={onSubmit} disabled={submitting}
          className="px-8 py-3 text-ui font-semibold text-white bg-gold rounded-lg hover:bg-gold-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 min-h-[44px] ml-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
          {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          <span>{submitting ? "Submitting..." : "Submit application"}</span>
        </button>
      </div>
    </div>
  );
}
