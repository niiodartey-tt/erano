"use client";

import { CheckCircle2 } from "lucide-react";

interface Step8Props {
  contactName: string;
}

const NEXT_STEPS = [
  "Our team reviews your application",
  "A consultant contacts you within 24 hours to discuss your needs",
  "You receive an invoice and welcome pack by email",
  "Once payment is confirmed, your client portal becomes fully active",
];

export function Step8Confirmation({ contactName }: Step8Props) {
  return (
    <div className="py-6">
      <div className="flex justify-center mb-6">
        <CheckCircle2
          className="w-16 h-16 text-gold"
          aria-hidden="true"
          strokeWidth={1.5}
        />
      </div>

      <h1 className="text-section text-navy mb-3 text-center">
        Application received
      </h1>
      <p className="text-body-sm text-body text-center max-w-md mx-auto mb-10">
        Thank you, {contactName}. Our team will contact you within 24 hours.
        Check your email for your login link.
      </p>

      <div className="bg-navy rounded-xl p-7 text-white">
        <p className="text-ui font-semibold mb-5">What happens next</p>
        <ol className="space-y-4">
          {NEXT_STEPS.map((step, idx) => (
            <li key={step} className="flex items-start gap-3">
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              <span className="text-ui-sm text-white/75 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
