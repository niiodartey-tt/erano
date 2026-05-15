"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, Phone, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ServiceData {
  services_needed: string[];
  package: { name: string; description: string; price_ghs: number | null } | null;
  account_state: string | null;
}

const WHATSAPP_HREF = "https://wa.me/233275819606";

export default function ServicesPage() {
  const [data, setData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pendingDocs, setPendingDocs] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("/api/portal/services"),
      fetch("/api/portal/documents/requests"),
    ]).then(async ([s, d]) => {
      if (!s.ok) { setError(true); setLoading(false); return; }
      setData(await s.json() as ServiceData);
      if (d.ok) {
        const dj = await d.json() as { requests: Array<{ status: string }> };
        setPendingDocs(dj.requests.filter(r => r.status === "pending").length);
      }
      setLoading(false);
    }).catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-4 md:p-6 space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 rounded-xl bg-line animate-pulse" />)}
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="mx-auto max-w-3xl p-4 md:p-6">
        <p className="text-sm text-red-600" role="alert">Failed to load services. Please refresh the page.</p>
      </div>
    );
  }

  const pkg = data.package;

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6 space-y-6">
      <h1 className="text-xl font-bold text-navy">My Services</h1>

      {pkg && (
        <div className="rounded-xl bg-navy p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Active Package</p>
          <h2 className="mb-1 text-2xl font-bold text-white">{pkg.name}</h2>
          <p className="mb-5 text-sm text-white/70">{pkg.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-lg font-semibold text-white">
              {pkg.price_ghs !== null && pkg.price_ghs > 0
                ? `${formatCurrency(Number(pkg.price_ghs))} / year`
                : pkg.name === "Custom" ? "Custom pricing" : "Free plan"}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
              Active
            </span>
          </div>
        </div>
      )}

      {data.services_needed.length > 0 && (
        <div className="rounded-xl border border-line bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-navy">Services included in your plan</h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
            {data.services_needed.map((svc) => (
              <li key={svc} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm text-navy">{svc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-line bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-navy">Your account manager</h2>
        <p className="mb-3 text-sm font-medium text-navy">Erano Consulting Team</p>
        <div className="mb-5 space-y-2">
          <a href="mailto:ray.ankrah@eranoconsulting.com" className="flex items-center gap-2 text-sm text-body transition-colors hover:text-navy">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            ray.ankrah@eranoconsulting.com
          </a>
          <a href="tel:+233275819606" className="flex items-center gap-2 text-sm text-body transition-colors hover:text-navy">
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            +233 27 581 9606
          </a>
        </div>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Chat on WhatsApp
        </a>
      </div>

      <div className="rounded-xl border border-line bg-white p-6">
        <h2 className="mb-3 text-base font-semibold text-navy">Quick actions</h2>
        {pendingDocs > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              You have {pendingDocs} pending document request{pendingDocs !== 1 ? "s" : ""}.
            </p>
            <Link href="/portal/documents" className="text-sm font-medium text-navy underline underline-offset-2 whitespace-nowrap">
              View now
            </Link>
          </div>
        ) : (
          <p className="text-sm text-body">Your account is fully set up. No action required.</p>
        )}
      </div>
    </div>
  );
}
