"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";

interface Props {
  expiresAt: string;
}

type TimerState = "ok" | "urgent" | "expired";

function getLabel(expiresAt: string): { text: string; state: TimerState } {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { text: "Payment window closed", state: "expired" };
  if (diff < 86_400_000) {
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    return { text: `${h}h ${m}m remaining`, state: "urgent" };
  }
  const days = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  return {
    text: `${days} day${days !== 1 ? "s" : ""}, ${h} hour${h !== 1 ? "s" : ""} remaining`,
    state: "ok",
  };
}

const STATE_CLASSES: Record<TimerState, string> = {
  ok:      "border-line bg-white text-navy",
  urgent:  "border-amber-200 bg-amber-50 text-amber-800",
  expired: "border-red-200 bg-red-50 text-red-700",
};

export default function PaymentTimer({ expiresAt }: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const [label, setLabel] = useState(() => getLabel(expiresAt));

  useEffect(() => {
    setLabel(getLabel(expiresAt));
    if (reducedMotion) return; // static snapshot for reduced-motion users
    const id = setInterval(() => setLabel(getLabel(expiresAt)), 60_000);
    return () => clearInterval(id);
  }, [expiresAt, reducedMotion]);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${STATE_CLASSES[label.state]}`}
      role="status"
      aria-live="polite"
      aria-label={`Payment deadline: ${label.text}`}
    >
      {label.state !== "ok"
        ? <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        : <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span>{label.text}</span>
    </div>
  );
}
