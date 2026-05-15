"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PaymentProof {
  id: string;
  amount_paid: number;
  currency: string;
  payment_method: string;
  transaction_reference: string;
  status: "pending" | "confirmed" | "rejected";
  uploaded_at: string;
  file_path: string;
}

const STATUS_CLASSES: Record<PaymentProof["status"], string> = {
  pending:   "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  rejected:  "bg-red-100 text-red-800",
};

async function openReceipt(filePath: string) {
  const res = await fetch(`/api/portal/payments/proof-url?path=${encodeURIComponent(filePath)}`);
  if (!res.ok) return;
  const { url } = await res.json() as { url: string };
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function PaymentHistory() {
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/portal/payments/history")
      .then(async (r) => {
        if (!r.ok) { setError(true); setLoading(false); return; }
        setProofs(await r.json() as PaymentProof[]);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) return <div className="h-16 animate-pulse rounded bg-line" />;
  if (error)   return <p className="text-sm text-red-600">Failed to load payment history. Please refresh.</p>;
  if (proofs.length === 0) return <p className="text-sm text-body">No payment submissions yet.</p>;

  return (
    <div className="rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead className="bg-off">
          <tr>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body">Date submitted</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body">Amount</th>
            <th className="hidden whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body sm:table-cell">Method</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body">Transaction ref</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body">Status</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-body">Receipt</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-white">
          {proofs.map((proof) => (
            <tr key={proof.id}>
              <td className="whitespace-nowrap px-4 py-3 text-body">
                {new Date(proof.uploaded_at).toLocaleDateString("en-GH", {
                  year: "numeric", month: "short", day: "numeric",
                })}
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-medium text-navy">
                {proof.currency === "GHS"
                  ? formatCurrency(Number(proof.amount_paid))
                  : `USD ${Number(proof.amount_paid).toFixed(2)}`}
              </td>
              <td className="hidden whitespace-nowrap px-4 py-3 text-body sm:table-cell">{proof.payment_method}</td>
              <td className="px-4 py-3">
                <span className="whitespace-nowrap font-mono text-xs text-body">{proof.transaction_reference}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_CLASSES[proof.status]}`}>
                  {proof.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <button
                  type="button"
                  onClick={() => openReceipt(proof.file_path)}
                  className="flex items-center gap-1 text-sm text-navy underline underline-offset-2 hover:text-body"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
