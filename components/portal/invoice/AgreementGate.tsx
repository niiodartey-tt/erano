"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";

const TC_PARAGRAPHS = [
  "1. Introduction and Acceptance. These Terms & Conditions (\"Terms\") govern the engagement between Erano Consulting (\"Erano,\" \"we,\" \"us,\" or \"our\") and any client who registers for, accesses, or uses Erano's services, including the client portal (\"Client,\" \"you,\" or \"your\"). By creating an account, accepting these Terms during onboarding, or otherwise engaging Erano's services, you agree to be bound by these Terms. If you do not agree to these Terms, you should not proceed with onboarding or use of the client portal.",
  "2. Scope of Services. Erano provides accounting, financial advisory, and related consultancy services to businesses and individuals (the \"Services\"). The specific scope, deliverables, and timeline for Services provided to you will be set out in your selected service package, invoice, or a separate engagement letter (\"Engagement Details\"). Erano reserves the right to determine the appropriate methodology, personnel, and approach for delivering the Services, in line with applicable professional standards.",
  "3. Fees and Payment. Fees for Services are set out in the applicable invoice or Engagement Details and are payable in the currency specified. Payment is due by the date specified on the invoice unless otherwise agreed in writing. Erano accepts payment via bank transfer to the account details provided on the invoice. Where a Client submits proof of payment, Erano will confirm receipt within a reasonable time. Services or deliverables tied to a specific payment milestone may be withheld until payment is confirmed. Erano reserves the right to suspend Services for accounts with overdue payments, following reasonable notice to the Client.",
  "4. Client Obligations. You agree to: provide accurate, complete, and timely information and documentation reasonably required for Erano to perform the Services; maintain the confidentiality and security of your account credentials and notify Erano promptly of any unauthorized access; and use the client portal only for its intended purpose and in compliance with applicable law.",
  "5. Confidentiality and Data Protection. Each party agrees to keep confidential any non-public information disclosed by the other party in connection with the Services, except where disclosure is required by law or regulation. Erano will take reasonable technical and organizational measures to protect personal and financial data submitted through the client portal, in line with applicable data protection laws in Ghana. Documents and information you upload will be used solely for the purpose of delivering the Services.",
  "6. Intellectual Property. Any reports, analyses, templates, or other deliverables prepared by Erano specifically for you under an engagement become your property upon full payment, unless otherwise agreed. Erano retains ownership of its underlying methodologies, tools, templates, and proprietary processes.",
  "7. Limitation of Liability. Erano will perform the Services with reasonable skill and care, in line with applicable professional standards. However, to the maximum extent permitted by law: Erano's total liability arising from or in connection with the Services shall not exceed the total fees paid by you for the specific engagement giving rise to the claim; Erano shall not be liable for indirect, incidental, or consequential losses, including loss of profit or business opportunity; and nothing in these Terms limits liability for fraud, gross negligence, or any liability that cannot be excluded under applicable law.",
  "8. Term and Termination. These Terms remain in effect for as long as you maintain an active account or engagement with Erano. Either party may terminate an engagement by providing written notice, subject to any minimum notice period specified in the Engagement Details. Upon termination, you remain responsible for payment of fees for Services already rendered. Erano may retain copies of records as required by applicable professional, regulatory, or legal obligations.",
  "9. Amendments. Erano may update these Terms from time to time. Material changes will be communicated to active Clients via the email address or notification system associated with their account. Continued use of the Services after such notice constitutes acceptance of the updated Terms.",
  "10. Governing Law and Dispute Resolution. These Terms are governed by the laws of the Republic of Ghana. The parties agree to first attempt to resolve any dispute arising from these Terms through good-faith negotiation. If a dispute cannot be resolved amicably within a reasonable period, it shall be subject to the exclusive jurisdiction of the courts of Ghana.",
  "11. Contact. For questions regarding these Terms, please contact Erano Consulting through the contact details provided on our website or client portal."
];

export default function AgreementGate() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 10) setScrolledToBottom(true);
  }, []);

  async function handleAccept() {
    if (!scrolledToBottom || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/agreements/accept", { method: "POST" });
      if (res.status === 409) { router.refresh(); return; }
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        setError(body.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setAccepted(true);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (accepted) {
    return (
      <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" aria-hidden="true" />
        <p className="font-semibold text-green-800">Agreement accepted. Updating your account...</p>
      </div>
    );
  }

  return (
    <section className="mb-8 rounded-lg border border-line bg-off p-6" aria-labelledby="agreement-heading">
      <div className="mb-4 flex items-center gap-3">
        <FileText className="h-5 w-5 text-gold" aria-hidden="true" />
        <h2 id="agreement-heading" className="text-lg font-semibold text-navy">Service Agreement</h2>
      </div>
      <p className="mb-4 text-sm text-body">
        Please read the full agreement below. The accept button is enabled only once you have scrolled to the bottom.
      </p>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={(e) => e.currentTarget.focus()}
        className="mb-4 h-96 overflow-y-scroll rounded border border-line bg-white p-4"
        tabIndex={0}
        role="document"
        aria-label="Service agreement terms and conditions"
      >
        {TC_PARAGRAPHS.map((para) => (
          <p key={para.slice(0, 32)} className="mb-4 text-sm leading-relaxed text-body">{para}</p>
        ))}
      </div>
      {!scrolledToBottom && (
        <p className="mb-3 text-xs text-body" aria-live="polite">
          Scroll to the bottom to enable the accept button.
        </p>
      )}
      {error && (
        <div
          className="mb-3 flex items-center gap-2 rounded border border-red-200 bg-red-50 p-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleAccept}
        disabled={!scrolledToBottom || loading}
        aria-disabled={!scrolledToBottom || loading}
        className="rounded bg-navy px-6 py-2.5 text-sm font-semibold text-gold transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Accepting..." : "I Accept the Agreement"}
      </button>
    </section>
  );
}
