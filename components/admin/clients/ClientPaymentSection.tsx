"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Timer { expires_at: string; is_active: boolean }
interface Proof { id: string; amount_paid: number; currency: string; transaction_reference: string; status: string; uploaded_at: string; file_path: string | null }

const PROOF_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected:  "bg-red-100 text-red-800",
};

interface Props {
  timer:              Timer | null;
  proofs:             Proof[];
  onConfirmPayment:   (proofId: string) => void;
  onRejectPayment:    (proofId: string) => void;
  onDownload:         (bucket: string, path: string) => void;
}

export function ClientPaymentSection({ timer, proofs, onConfirmPayment, onRejectPayment, onDownload }: Props) {
  const now = new Date();
  const expiresAt = timer ? new Date(timer.expires_at) : null;
  const expired = expiresAt ? expiresAt < now : false;
  const daysLeft = expiresAt && !expired
    ? Math.ceil((expiresAt.getTime() - now.getTime()) / 86_400_000)
    : null;
  const isConfirmed = proofs.some(p => p.status === "confirmed");

  return (
    <section className="bg-white rounded-xl border border-line p-5 md:p-6">
      <h2 className="text-sm font-semibold text-navy mb-4">Payments</h2>

      {isConfirmed && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm bg-green-50 text-green-700">
          Payment completed.
        </div>
      )}
      {timer && !isConfirmed && (
        <div className={cn("mb-4 px-4 py-3 rounded-lg text-sm", expired ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700")}>
          {expired
            ? "Payment window expired."
            : `Payment window active — ${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining (expires ${expiresAt!.toLocaleDateString("en-GB")})`}
        </div>
      )}

      {proofs.length === 0 ? (
        <p className="text-sm text-body/50">No payment proofs submitted yet.</p>
      ) : (
        <div className="overflow-x-auto -mx-5 md:-mx-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-body/60">Reference</th>
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-body/60">Amount</th>
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-body/60 hidden md:table-cell">Uploaded</th>
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-body/60">Status</th>
                <th className="px-5 md:px-6 py-2.5 text-right text-xs font-medium text-body/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {proofs.map((proof) => (
                <tr key={proof.id} className="hover:bg-off/50 transition-colors">
                  <td className="px-5 md:px-6 py-3 text-navy font-mono text-xs">{proof.transaction_reference}</td>
                  <td className="px-5 md:px-6 py-3 text-navy">{proof.currency} {proof.amount_paid.toLocaleString()}</td>
                  <td className="px-5 md:px-6 py-3 text-body hidden md:table-cell">
                    {new Date(proof.uploaded_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 md:px-6 py-3">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium capitalize", PROOF_COLORS[proof.status] ?? "bg-gray-100 text-gray-800")}>
                      {proof.status}
                    </span>
                  </td>
                  <td className="px-5 md:px-6 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {proof.file_path && (
                        <button onClick={() => onDownload("payment-proofs", proof.file_path!)} className="text-body/50 hover:text-navy transition-colors" aria-label="Download proof">
                          <Download className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                      {proof.status === "pending" && (
                        <>
                          <button onClick={() => onConfirmPayment(proof.id)} className="text-xs font-medium text-green-700 hover:text-green-900 transition-colors">Confirm</button>
                          <button onClick={() => onRejectPayment(proof.id)} className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors">Reject</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
