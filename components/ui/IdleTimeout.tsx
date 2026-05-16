"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const IDLE_TIMEOUT_MS   = 30 * 60 * 1000;
const WARNING_BEFORE_MS = 2 * 60 * 1000;
const WARN_AT_MS        = IDLE_TIMEOUT_MS - WARNING_BEFORE_MS;

interface Props { loginUrl: string }

export function IdleTimeout({ loginUrl }: Props) {
  const [showWarning,  setShowWarning]  = useState(false);
  const warnTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (warnTimer.current)    clearTimeout(warnTimer.current);
    if (signoutTimer.current) clearTimeout(signoutTimer.current);
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = loginUrl;
  }, [loginUrl]);

  const resetTimers = useCallback(() => {
    clearTimers();
    setShowWarning(false);
    warnTimer.current    = setTimeout(() => setShowWarning(true), WARN_AT_MS);
    signoutTimer.current = setTimeout(() => void signOut(), IDLE_TIMEOUT_MS);
  }, [clearTimers, signOut]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"] as const;
    const handler = () => resetTimers();
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    resetTimers();
    return () => {
      clearTimers();
      events.forEach((e) => window.removeEventListener(e, handler));
    };
  }, [resetTimers, clearTimers]);

  if (!showWarning) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-4 py-4 md:px-6 bg-navy border-t border-white/10"
      role="alert"
      aria-live="assertive"
    >
      <p className="text-sm text-white/80">
        You&apos;ve been inactive. You&apos;ll be signed out in 2 minutes.
      </p>
      <button
        onClick={resetTimers}
        className="shrink-0 px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:opacity-90 transition-opacity"
      >
        Stay signed in
      </button>
    </div>
  );
}
