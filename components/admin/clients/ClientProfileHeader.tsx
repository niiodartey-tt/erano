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
  pending:               "bg-yellow-100 text-yellow-800",
  awaiting_agreement:    "bg-blue-100 text-blue-800",
  awaiting_payment:      "bg-orange-100 text-orange-800",
  awaiting_confirmation: "bg-purple-100 text-purple-800",
  active:                "bg-green-100 text-green-800",
  expired:               "bg-red-100 text-red-800",
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
}

export function ClientProfileHeader({
  email, accountState, createdAt, contactName, legalName,
  pendingProofId, onConfirmPayment, onRejectPayment,
  onGenerateInvoice, generatingInvoice, onInitiateUpgrade,
}: Props) {
  const joined = new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="bg-white rounded-xl border border-line p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-navy">{contactName}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body">
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
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", STATE_COLORS[accountState] ?? "bg-gray-100 text-gray-800")}>
            {STATE_LABELS[accountState] ?? accountState}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {accountState === "pending" && onGenerateInvoice && (
            <button
              onClick={onGenerateInvoice}
              disabled={generatingInvoice}
              className="px-4 py-2 text-sm font-medium bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-40"
            >
              {generatingInvoice ? "Generating…" : "Generate Invoice"}
            </button>
          )}
          {accountState === "awaiting_confirmation" && (
            <>
              <button
                onClick={onConfirmPayment}
                disabled={!pendingProofId}
                className="px-4 py-2 text-sm font-medium bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-40"
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
              className="px-4 py-2 text-sm font-medium bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
            >
              Initiate Package Upgrade
            </button>
          )}
          <span
            title="Available in next update"
            aria-disabled="true"
            className="inline-flex items-center px-4 py-2 text-sm font-medium border border-line text-body/40 rounded-lg cursor-not-allowed select-none"
          >
            Reactivate
          </span>
        </div>
      </div>
    </div>
  );
}
