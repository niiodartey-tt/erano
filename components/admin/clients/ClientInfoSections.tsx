"use client";

import { ExternalLink } from "lucide-react";

interface Package  { name: string; description: string; price_ghs: number | null }
interface Invoice  { invoice_number: string; final_price_ghs: number; status: string; generated_at: string; signed_url: string | null }
interface Agreement { accepted_at: string; version_number: number }

interface Props {
  profile:   Record<string, unknown>;
  pkg:       Package | null;
  invoice:   Invoice | null;
  agreement: Agreement | null;
}

function Row({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  const display = value === null || value === undefined || value === "" ? "—" : String(value);
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-body/60">{label}</dt>
      <dd className="text-sm text-navy">{display}</dd>
    </div>
  );
}

function fmt(v: number) {
  return `GHS ${v.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;
}

export function ClientInfoSections({ profile: p, pkg, invoice, agreement }: Props) {
  return (
    <div className="space-y-4">
      {/* Business info */}
      <section className="bg-white rounded-xl border border-line p-5 md:p-6">
        <h2 className="text-sm font-semibold text-navy mb-4">Business Information</h2>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Row label="Legal Name"      value={p.legal_name as string}   />
          <Row label="Trading Name"    value={p.trading_name as string} />
          <Row label="Reg. Number"     value={p.reg_number as string}   />
          <Row label="Business Type"   value={p.business_type as string}/>
          <Row label="Industry"        value={p.industry as string}     />
          <Row label="Country"         value={p.country as string}      />
          <Row label="Contact Name"    value={p.contact_name as string} />
          <Row label="Contact Role"    value={p.contact_role as string} />
          <Row label="Contact Email"   value={p.contact_email as string}/>
          <Row label="Phone"           value={p.contact_phone as string}/>
          <Row label="Employees"       value={p.employee_count as number}/>
          <Row label="Turnover"        value={p.turnover_bracket as string}/>
        </dl>
      </section>

      {/* Compliance */}
      <section className="bg-white rounded-xl border border-line p-5 md:p-6">
        <h2 className="text-sm font-semibold text-navy mb-4">Compliance &amp; Financials</h2>
        <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Row label="GRA Registered"   value={(p.gra_registered as boolean) ? "Yes" : "No"} />
          <Row label="VAT Registered"   value={(p.vat_registered as boolean) ? "Yes" : "No"} />
          <Row label="Has Accountant"   value={(p.has_accountant as boolean) ? "Yes" : "No"} />
          <Row label="Last Audited"     value={p.last_audited_year as number} />
          <Row label="Obligations"      value={p.outstanding_obligations as string} />
        </dl>
      </section>

      {/* Package / Invoice / Agreement */}
      <section className="bg-white rounded-xl border border-line p-5 md:p-6">
        <h2 className="text-sm font-semibold text-navy mb-4">Package &amp; Agreements</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-0.5">
            <dt className="text-xs font-medium text-body/60">Package</dt>
            <dd className="text-sm text-navy font-medium">{pkg?.name ?? "—"}</dd>
            {pkg?.price_ghs && <dd className="text-xs text-body">{fmt(pkg.price_ghs)}</dd>}
          </div>
          <div className="space-y-0.5">
            <dt className="text-xs font-medium text-body/60">Invoice</dt>
            {invoice ? (
              <>
                <dd className="text-sm text-navy">{invoice.invoice_number}</dd>
                <dd className="text-xs text-body">{fmt(invoice.final_price_ghs)} · {invoice.status}</dd>
                {invoice.signed_url && (
                  <dd><a href={invoice.signed_url} target="_blank" rel="noreferrer" className="text-xs text-gold hover:underline inline-flex items-center gap-1">View <ExternalLink className="h-3 w-3" /></a></dd>
                )}
              </>
            ) : <dd className="text-sm text-navy">—</dd>}
          </div>
          <div className="space-y-0.5">
            <dt className="text-xs font-medium text-body/60">Agreement</dt>
            {agreement ? (
              <>
                <dd className="text-sm text-navy">v{agreement.version_number}</dd>
                <dd className="text-xs text-body">Accepted {new Date(agreement.accepted_at).toLocaleDateString("en-GB")}</dd>
              </>
            ) : <dd className="text-sm text-navy">—</dd>}
          </div>
        </dl>
      </section>
    </div>
  );
}
