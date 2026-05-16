"use client";

import { Building2, Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const STATE_LABELS: Record<string, string> = {
  pending:                "Pending",
  awaiting_agreement:     "Awaiting Agreement",
  awaiting_payment:       "Awaiting Payment",
  awaiting_confirmation:  "Awaiting Confirmation",
  active:                 "Active",
  expired:                "Expired",
};

const STATE_COLORS: Record<string, string> = {
  pending:               "bg-white/10 text-white/50",
  awaiting_agreement:    "bg-blue-900/30 text-blue-400",
  awaiting_payment:      "bg-amber-900/30 text-amber-400",
  awaiting_confirmation: "bg-purple-900/30 text-purple-400",
  active:                "bg-green-900/30 text-green-400",
  expired:               "bg-red-900/30 text-red-400",
};

interface Props {
  email:          string;
  accountState:   string;
  createdAt:      string;
  contactName:    string;
  legalName:      string;
  pendingProofId: string | null;
  onConfirmPayment:    () => void;
  onRejectPayment:     () => void;
  onGenerateInvoice?:  () => void;
  generatingInvoice?:  boolean;
  onInitiateUpgrade?:  () => void;
  onReactivate?:       () => void;
  reactivating?:       boolean;
}

export function ClientProfileHeader({
  email, accountState, createdAt, contactName, legalName,
  pendingProofId, onConfirmPayment, onRejectPayment,
  onGenerateInvoice, generatingInvoice, onInitiateUpgrade,
  onReactivate, reactivating,
}: Props) {
  const joined = new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="bg-navy rounded-xl border border-white/10 p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-white">{contactName}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {legalName}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Joined {joined}
            </span>
          </div>
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", STATE_COLORS[accountState] ?? "bg-white/10 text-white/50")}>
            {STATE_LABELS[accountState] ?? accountState}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {accountState === "pending" && onGenerateInvoice && (
            <button
              onClick={onGenerateInvoice}
              disabled={generatingInvoice}
              className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {generatingInvoice ? "Generating…" : "Generate Invoice"}
            </button>
          )}
          {accountState === "awaiting_confirmation" && (
            <>
              <button
                onClick={onConfirmPayment}
                disabled={!pendingProofId}
                className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Confirm Payment
              </button>
              <button
                onClick={onRejectPayment}
                disabled={!pendingProofId}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40"
              >
                Reject Payment
              </button>
            </>
          )}
          {accountState === "active" && onInitiateUpgrade && (
            <button
              onClick={onInitiateUpgrade}
              className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:opacity-90 transition-opacity"
            >
              Initiate Package Upgrade
            </button>
          )}
          {accountState === "expired" && onReactivate && (
            <button
              onClick={onReactivate}
              disabled={reactivating}
              className="px-4 py-2 text-sm font-medium border border-gold text-gold rounded-lg hover:bg-gold hover:text-navy transition-colors disabled:opacity-40"
            >
              {reactivating ? "Reactivating…" : "Reactivate"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
