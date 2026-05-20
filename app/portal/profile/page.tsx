"use client";

import { useEffect, useState } from "react";
import ContactDetailsForm from "@/components/portal/profile/ContactDetailsForm";
import ChangePasswordForm from "@/components/portal/profile/ChangePasswordForm";

interface ProfileApiData {
  legal_name: string;
  contact_name: string;
  contact_role: string;
  contact_phone: string;
  address: string;
  email: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/portal/profile/me")
      .then(async (r) => {
        if (!r.ok) { setError(true); setLoading(false); return; }
        const data = await r.json() as ProfileApiData;
        setProfile(data);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl p-4 md:p-6 space-y-4 animate-pulse" aria-busy="true" aria-label="Loading profile">
        <div className="h-24 rounded-xl bg-line" />
        <div className="h-72 rounded-xl bg-line" />
        <div className="h-72 rounded-xl bg-line" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto max-w-2xl p-4 md:p-6">
        <p className="text-sm text-body">Unable to load your profile. Please refresh the page.</p>
      </div>
    );
  }

  const nameParts = profile.contact_name.trim().split(/\s+/);
  const initials = (
    nameParts.length >= 2
      ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
      : profile.contact_name.slice(0, 2)
  ).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6">
      <div className="bg-white rounded-xl border border-line p-6 mb-6 flex items-center gap-4">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-navy text-white text-xl font-bold shrink-0"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold text-navy leading-snug truncate">{profile.contact_name}</p>
          <p className="text-sm text-body truncate">{profile.email}</p>
        </div>
      </div>

      <ContactDetailsForm
        defaultValues={{
          contactName:  profile.contact_name,
          contactRole:  profile.contact_role,
          contactPhone: profile.contact_phone,
          address:      profile.address,
        }}
        email={profile.email}
        legalName={profile.legal_name}
      />

      <ChangePasswordForm email={profile.email} />
    </div>
  );
}
