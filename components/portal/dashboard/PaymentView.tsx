"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortal } from "@/context/PortalContext";

function getCountdown(expiresAt: string): { label: string; urgent: boolean } {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { label: "Payment window expired", urgent: true };
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return {
    label: `${h}h ${m}m ${s}s remaining`,
    urgent: diff < 86_400_000,
  };
}

export default function PaymentView() {
  const { userId } = usePortal();
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ label: "", urgent: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    sb.from("payment_timers")
      .select("expires_at")
      .eq("client_id", userId)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data }) => {
        setExpiresAt(data?.expires_at ?? null);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!expiresAt) return;
    setCountdown(getCountdown(expiresAt));
    const id = setInterval(() => setCountdown(getCountdown(expiresAt)), 1_000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (loading) return <div className="h-32 rounded-xl bg-line animate-pulse" />;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      {expiresAt ? (
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl p-4 border text-sm font-medium",
            countdown.urgent
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-line bg-white text-navy",
          )}
        >
          {countdown.urgent
            ? <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            : <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />}
          {countdown.label}
        </div>
      ) : (
        <div className="rounded-xl border border-line bg-white p-4 text-sm text-body">
          No active payment window. Contact support if you believe this is an error.
        </div>
      )}

      <div className="rounded-xl border border-line bg-navy p-6 space-y-0">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
          Payment details
        </h2>
        <BankRow label="Bank" value="GCB Bank Ltd" />
        <BankRow label="Account name" value="Erano Consulting Ltd" />
        <BankRow label="Account number" value="1011234567890" />
        <BankRow label="Branch" value="Accra Central" />
        <BankRow label="Reference" value="Your invoice number" highlight />
      </div>

      <p className="text-xs text-body">
        After making payment, upload your proof of payment on the{" "}
        <a href="/portal/payments" className="text-navy underline underline-offset-2">
          Payments page
        </a>.
      </p>
    </div>
  );
}

function BankRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-t border-white/10">
      <span className="text-xs text-white/50">{label}</span>
      <span className={cn("text-sm font-medium", highlight ? "text-gold" : "text-white")}>
        {value}
      </span>
    </div>
  );
}
