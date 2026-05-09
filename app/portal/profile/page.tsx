"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { usePortal } from "@/context/PortalContext";
import ContactDetailsForm from "@/components/portal/profile/ContactDetailsForm";
import ChangePasswordForm from "@/components/portal/profile/ChangePasswordForm";

interface ProfileData {
  contact_name: string;
  contact_role: string;
  contact_phone: string;
  address: string;
  legal_name: string;
}

export default function ProfilePage() {
  const { userId } = usePortal();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    Promise.all([
      sb.auth.getUser(),
      sb.from("client_profiles")
        .select("contact_name, contact_role, contact_phone, address, legal_name")
        .eq("user_id", userId)
        .single(),
    ]).then(([{ data: { user } }, { data, error: e }]) => {
      if (e || !data || !user) { setError(true); setLoading(false); return; }
      setEmail(user.email ?? "");
      setProfile(data as ProfileData);
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-2xl space-y-4 animate-pulse" aria-busy="true" aria-label="Loading profile">
        <div className="h-7 w-36 rounded bg-line" />
        <div className="h-72 rounded-xl bg-line" />
        <div className="h-72 rounded-xl bg-line" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-4 md:p-6 max-w-2xl">
        <p className="text-sm text-body">Unable to load your profile. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <h1 className="text-lg font-semibold text-navy mb-6">My profile</h1>

      <ContactDetailsForm
        defaultValues={{
          contactName:  profile.contact_name,
          contactRole:  profile.contact_role,
          contactPhone: profile.contact_phone,
          address:      profile.address,
        }}
        email={email}
        legalName={profile.legal_name}
      />

      <div className="my-8 border-t border-line" role="separator" aria-hidden="true" />

      <ChangePasswordForm email={email} />
    </div>
  );
}
