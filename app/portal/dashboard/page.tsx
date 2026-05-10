"use client";

import { usePortal } from "@/context/PortalContext";
import PendingView from "@/components/portal/dashboard/PendingView";
import AgreementView from "@/components/portal/dashboard/AgreementView";
import PaymentView from "@/components/portal/dashboard/PaymentView";
import ConfirmationView from "@/components/portal/dashboard/ConfirmationView";
import ActiveView from "@/components/portal/dashboard/ActiveView";
import ExpiredView from "@/components/portal/dashboard/ExpiredView";

export default function DashboardPage() {
  const { accountState, userName } = usePortal();

  const greeting =
    accountState === "active"
      ? `Welcome back, ${userName.split(" ")[0]}.`
      : "Track your onboarding progress.";

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      <div className="mb-6">
        <p className="text-sm text-body">{greeting}</p>
      </div>

      {accountState === "pending"               && <PendingView />}
      {accountState === "awaiting_agreement"    && <AgreementView />}
      {accountState === "awaiting_payment"      && <PaymentView />}
      {accountState === "awaiting_confirmation" && <ConfirmationView />}
      {accountState === "active"                && <ActiveView />}
      {accountState === "expired"               && <ExpiredView />}
    </div>
  );
}
