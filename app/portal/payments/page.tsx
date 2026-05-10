"use client";

import { useEffect, useState } from "react";
import { usePortal } from "@/context/PortalContext";
import PaymentTimer from "@/components/portal/payments/PaymentTimer";
import PaymentUploadForm from "@/components/portal/payments/PaymentUploadForm";
import PaymentHistory from "@/components/portal/payments/PaymentHistory";

// PLACEHOLDER — Erano Consulting to supply final bank details before launch
const BANK_ROWS: [string, string][] = [
  ["Bank",           "GCB Bank"],
  ["Account name",   "Erano Consulting Limited"],
  ["Account number", "1234567890123"],
  ["Branch",         "Ring Road Central, Accra"],
];

export default function PaymentsPage() {
  const { accountState } = usePortal();
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [timerLoaded, setTimerLoaded] = useState(false);
  const [uploadVersion, setUploadVersion] = useState(0);

  useEffect(() => {
    fetch("/api/portal/payments/timer")
      .then(async (r) => {
        if (r.ok) {
          const data = await r.json() as { expires_at: string | null };
          setExpiresAt(data.expires_at);
        }
        setTimerLoaded(true);
      })
      .catch(() => setTimerLoaded(true));
  }, []);

  const isAwaitingPayment = accountState === "awaiting_payment";

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <h1 className="mb-6 text-xl font-bold text-navy">Payments</h1>

      {timerLoaded && expiresAt && accountState !== "active" && (
        <div className="mb-6">
          <PaymentTimer expiresAt={expiresAt} />
        </div>
      )}

      {isAwaitingPayment && (
        <div className="mb-6 rounded-lg bg-navy p-5">
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
              <dd className="text-sm text-white/80">Use your invoice number</dd>
            </div>
          </dl>
        </div>
      )}

      {isAwaitingPayment && (
        <section className="mb-8" aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="mb-4 text-base font-semibold text-navy">Upload payment proof</h2>
          <PaymentUploadForm onSuccess={() => setUploadVersion(v => v + 1)} />
        </section>
      )}

      <section aria-labelledby="history-heading">
        <h2 id="history-heading" className="mb-4 text-base font-semibold text-navy">Payment history</h2>
        <PaymentHistory key={uploadVersion} />
      </section>
    </div>
  );
}
