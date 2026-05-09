"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import StatusTimeline from "./StatusTimeline";

export default function AgreementView() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      <div className="flex-1">
        <div className="rounded-xl border border-gold/30 bg-amber-50/40 p-6">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 shrink-0">
              <FileText className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-navy">
                Review and sign your agreement
              </h2>
              <p className="text-sm text-body mt-1 mb-5">
                Your engagement agreement and invoice are ready. Please review and sign
                to proceed to the payment stage.
              </p>
              <Link
                href="/portal/invoice"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors min-h-[44px]"
              >
                <FileText className="h-4 w-4 text-gold" aria-hidden="true" />
                View agreement &amp; invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-64 shrink-0">
        <div className="rounded-xl border border-line bg-white p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-body mb-4">
            Application status
          </h3>
          <StatusTimeline activeStep={3} />
        </div>
      </div>
    </div>
  );
}
