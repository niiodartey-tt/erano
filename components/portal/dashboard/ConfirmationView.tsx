"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { usePortal } from "@/context/PortalContext";
import StatusTimeline from "./StatusTimeline";

interface Proof {
  amount_paid: number;
  currency: string;
  transaction_reference: string;
  payment_date: string;
}

export default function ConfirmationView() {
  const { userId } = usePortal();
  const [proof, setProof] = useState<Proof | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    sb.from("payment_proofs")
      .select("amount_paid, currency, transaction_reference, payment_date")
      .eq("client_id", userId)
      .order("uploaded_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setProof(data ?? null);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      <div className="flex-1 space-y-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-base font-semibold text-navy">
                Payment received — under review
              </h2>
              <p className="text-sm text-body mt-1">
                Our team is verifying your payment. Account activation typically takes
                1–2 business days.
              </p>
            </div>
          </div>
        </div>

        {!loading && proof && (
          <div className="rounded-xl border border-line bg-white p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-body mb-4">
              Payment summary
            </h3>
            <dl className="space-y-0">
              <ProofRow
                label="Amount"
                value={formatCurrency(Number(proof.amount_paid), proof.currency)}
              />
              <ProofRow label="Reference" value={proof.transaction_reference} />
              <ProofRow
                label="Date"
                value={new Date(proof.payment_date).toLocaleDateString("en-GH", {
                  dateStyle: "medium",
                })}
              />
            </dl>
          </div>
        )}
      </div>

      <div className="w-full md:w-64 shrink-0">
        <div className="rounded-xl border border-line bg-white p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-body mb-4">
            Application status
          </h3>
          <StatusTimeline activeStep={4} />
        </div>
      </div>
    </div>
  );
}

function ProofRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-line">
      <dt className="text-sm text-body">{label}</dt>
      <dd className="text-sm font-medium text-navy">{value}</dd>
    </div>
  );
}
