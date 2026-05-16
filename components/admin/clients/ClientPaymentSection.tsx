"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Timer { expires_at: string; is_active: boolean }
interface Proof { id: string; amount_paid: number; currency: string; transaction_reference: string; status: string; uploaded_at: string; file_path: string | null }

const PROOF_COLORS: Record<string, string> = {
  pending:   "bg-amber-900/30 text-amber-400",
  confirmed: "bg-green-900/30 text-green-400",
  rejected:  "bg-red-900/30 text-red-400",
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
    <section className="bg-navy rounded-xl border border-white/10 p-5 md:p-6">
      <h2 className="text-sm font-semibold text-white mb-4">Payments</h2>

      {isConfirmed && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm border border-green-800 bg-green-900/30 text-green-400">
          Payment completed.
        </div>
      )}
      {timer && !isConfirmed && (
        <div className={cn("mb-4 px-4 py-3 rounded-lg text-sm border", expired ? "border-red-800 bg-red-900/30 text-red-400" : "border-blue-800 bg-blue-900/30 text-blue-400")}>
          {expired
            ? "Payment window expired."
            : `Payment window active — ${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining (expires ${expiresAt!.toLocaleDateString("en-GB")})`}
        </div>
      )}

      {proofs.length === 0 ? (
        <p className="text-sm text-white/40">No payment proofs submitted yet.</p>
      ) : (
        <div className="overflow-x-auto -mx-5 md:-mx-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-white/40">Reference</th>
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-white/40">Amount</th>
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-white/40 hidden md:table-cell">Uploaded</th>
                <th className="px-5 md:px-6 py-2.5 text-left text-xs font-medium text-white/40">Status</th>
                <th className="px-5 md:px-6 py-2.5 text-right text-xs font-medium text-white/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {proofs.map((proof) => (
                <tr key={proof.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 md:px-6 py-3 text-white/60 font-mono text-xs">{proof.transaction_reference}</td>
                  <td className="px-5 md:px-6 py-3 text-white">{proof.currency} {proof.amount_paid.toLocaleString()}</td>
                  <td className="px-5 md:px-6 py-3 text-white/60 hidden md:table-cell">
                    {new Date(proof.uploaded_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 md:px-6 py-3">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium capitalize", PROOF_COLORS[proof.status] ?? "bg-white/10 text-white/50")}>
                      {proof.status}
                    </span>
                  </td>
                  <td className="px-5 md:px-6 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {proof.file_path && (
                        <button onClick={() => onDownload("payment-proofs", proof.file_path!)} className="text-white/40 hover:text-white transition-colors" aria-label="Download proof">
                          <Download className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                      {proof.status === "pending" && (
                        <>
                          <button onClick={() => onConfirmPayment(proof.id)} className="text-xs font-medium text-green-400 hover:text-green-300 transition-colors">Confirm</button>
                          <button onClick={() => onRejectPayment(proof.id)} className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors">Reject</button>
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
