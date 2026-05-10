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
        <div className="h-7 w-36 rounded bg-line" />
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

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6">
      <h1 className="text-lg font-semibold text-navy mb-6">My profile</h1>

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

      <div className="my-8 border-t border-line" role="separator" aria-hidden="true" />

      <ChangePasswordForm email={profile.email} />
    </div>
  );
}
