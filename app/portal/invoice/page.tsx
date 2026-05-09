"use client";

import { useEffect, useState } from "react";
import { usePortal, isStateAtLeast } from "@/context/PortalContext";
import AgreementGate from "@/components/portal/invoice/AgreementGate";
import { formatCurrency } from "@/lib/utils";
import { Printer, FileText } from "lucide-react";

interface InvoiceData {
  id: string;
  invoice_number: string;
  final_price_ghs: number;
  status: "generated" | "paid";
  generated_at: string;
  package_name: string | null;
}

interface ProfileData { legal_name: string; address: string; }

const BANK_ROWS: [string, string][] = [
  ["Bank",           "GCB Bank"],
  ["Account name",   "Erano Consulting Limited"],
  ["Account number", "1234567890123"],
  ["Branch",         "Ring Road Central, Accra"],
];

export default function InvoicePage() {
  const { accountState } = usePortal();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noInvoice, setNoInvoice] = useState(false);

  useEffect(() => {
    (async () => {
      const [invRes, profRes] = await Promise.all([
        fetch("/api/portal/invoice/me"),
        fetch("/api/portal/profile/me"),
      ]);
      if (invRes.status === 404) { setNoInvoice(true); setLoading(false); return; }
      if (!invRes.ok || !profRes.ok) { setError(true); setLoading(false); return; }
      const [inv, prof] = await Promise.all([invRes.json(), profRes.json()]);
      setInvoice(inv as InvoiceData);
      setProfile(prof as ProfileData);
      setLoading(false);
    })().catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <p className="text-sm text-body">Loading invoice...</p>
    </div>
  );

  if (error) return (
    <div className="p-4 md:p-6">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-700">Failed to load invoice. Please refresh and try again.</p>
      </div>
    </div>
  );

  if (noInvoice) return (
    <div className="p-4 md:p-6">
      <div className="rounded-lg border border-line bg-off p-8 text-center">
        <FileText className="mx-auto mb-3 h-10 w-10 text-body/40" aria-hidden="true" />
        <p className="font-semibold text-navy">Invoice not yet generated</p>
        <p className="mt-1 text-sm text-body">
          Your invoice has not been generated yet. Our team will prepare it after reviewing your application.
        </p>
      </div>
    </div>
  );

  const generatedDate = new Date(invoice!.generated_at).toLocaleDateString("en-GH", {
    year: "numeric", month: "long", day: "numeric",
  });
  const showBankDetails = isStateAtLeast(accountState, "awaiting_payment");

  return (
    <div className="max-w-3xl p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <h1 className="text-xl font-bold text-navy">Invoice</h1>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded border border-line px-4 py-2 text-sm text-body transition-colors hover:bg-off"
        >
          <Printer className="h-4 w-4" aria-hidden="true" /> Print
        </button>
      </div>

      {accountState === "awaiting_agreement" && <AgreementGate />}

      <article className="rounded-lg border border-line bg-white p-6 shadow-sm print:shadow-none" aria-label="Invoice">
        <header className="mb-6 flex items-start justify-between border-b border-line pb-6">
          <div>
            <p className="text-lg font-bold text-navy">Erano Consulting</p>
            <p className="text-sm text-body">Accra, Ghana</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-navy">INVOICE</p>
            <p className="mt-1 text-sm text-body">{invoice!.invoice_number}</p>
          </div>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-body">Bill to</p>
            <p className="font-semibold text-navy">{profile?.legal_name}</p>
            <p className="mt-1 text-sm text-body">{profile?.address}</p>
          </div>
          <div className="md:text-right">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-body">Invoice details</p>
            <p className="text-sm text-body">Date: {generatedDate}</p>
            <p className="text-sm text-body">Package: {invoice!.package_name ?? "—"}</p>
            <div className="mt-2">
              {invoice!.status === "paid"
                ? <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">Paid</span>
                : <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">Awaiting payment</span>}
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between rounded bg-off px-4 py-3">
          <p className="font-semibold text-navy">Total amount due</p>
          <p className="text-xl font-bold text-navy">{formatCurrency(invoice!.final_price_ghs)}</p>
        </div>

        {showBankDetails && (
          <div className="rounded-lg bg-navy p-5">
            <p className="mb-3 text-sm font-semibold text-white">Bank transfer details</p>
            <dl className="space-y-2 text-sm">
              {BANK_ROWS.map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-white/60">{label}</dt>
                  <dd className="text-white">{value}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/60">Reference</dt>
                <dd className="font-semibold text-gold">{invoice!.invoice_number}</dd>
              </div>
            </dl>
          </div>
        )}
      </article>
    </div>
  );
}
