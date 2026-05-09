"use client";

import { Lock } from "lucide-react";

const WHATSAPP_HREF = "https://wa.me/233200000000";
const SUPPORT_EMAIL = "support@erano.com";

export default function ExpiredView() {
  return (
    <div className="rounded-xl bg-ink text-white p-8 md:p-12 flex flex-col items-center text-center gap-6">
      <span
        className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5"
        aria-hidden="true"
      >
        <Lock className="h-8 w-8 text-gold" />
      </span>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your account has expired</h2>
        <p className="text-sm text-white/60 max-w-sm mx-auto">
          Your engagement period has ended. Contact us to renew your package and
          continue accessing our services.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold/10 transition-colors min-h-[44px]"
        >
          Contact on WhatsApp
        </a>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white/70 text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px]"
        >
          Email support
        </a>
      </div>
    </div>
  );
}
