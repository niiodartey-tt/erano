"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import StatusTimeline from "./StatusTimeline";

interface Profile {
  legal_name: string;
  package_name: string | null;
}

export default function PendingView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/portal/profile/me")
      .then(async (r) => {
        if (!r.ok) { setError(true); setLoading(false); return; }
        const data = await r.json() as Profile;
        setProfile(data);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 md:flex-row md:gap-8 animate-pulse">
        <div className="flex-1 h-48 rounded-xl bg-line" />
        <div className="w-full md:w-64 h-48 rounded-xl bg-line" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="rounded-xl border border-line bg-white p-6 text-sm text-body">
        Unable to load your profile. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      <div className="flex-1">
        <div className="rounded-xl border border-line bg-white p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 shrink-0">
              <Clock className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-navy">Application under review</h2>
              <p className="text-sm text-body mt-1">
                Our team is reviewing your application. We&apos;ll be in touch within 2–3 business days.
              </p>
            </div>
          </div>
          <dl className="space-y-0">
            <div className="flex items-center justify-between py-3 border-t border-line">
              <dt className="text-sm text-body">Company</dt>
              <dd className="text-sm font-medium text-navy">{profile.legal_name}</dd>
            </div>
            {profile.package_name && (
              <div className="flex items-center justify-between py-3 border-t border-line">
                <dt className="text-sm text-body">Selected package</dt>
                <dd className="text-sm font-medium text-navy">{profile.package_name}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="w-full md:w-64 shrink-0">
        <div className="rounded-xl border border-line bg-white p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-body mb-4">
            Application status
          </h3>
          <StatusTimeline activeStep={2} />
        </div>
      </div>
    </div>
  );
}
