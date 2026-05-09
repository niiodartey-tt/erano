"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    async function handleCallback() {
      // Get session — Supabase automatically exchanges the hash token
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // Wait 2 seconds and try again — token exchange may still be in progress
        setTimeout(async () => {
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (!retrySession) {
            window.location.href = "/login";
            return;
          }
          await redirect(supabase, retrySession.user.id);
        }, 2000);
        return;
      }

      await redirect(supabase, session.user.id);
    }

    async function redirect(supabase: ReturnType<typeof createBrowserClient>, userId: string) {
      const { data } = await supabase
        .from("users")
        .select("must_change_password, role")
        .eq("id", userId)
        .single();

      if (data?.role === "admin") {
        window.location.href = "/admin";
      } else if (data?.must_change_password) {
        window.location.href = "/portal/set-password";
      } else {
        window.location.href = "/portal/dashboard";
      }
    }

    handleCallback();
  }, []);

  return (
    <div style={{
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      minHeight:      "100vh",
      fontFamily:     "Plus Jakarta Sans, sans-serif",
      color:          "#0d1b2e",
      gap:            "12px",
    }}>
      <div style={{
        width:        "32px",
        height:       "32px",
        border:       "3px solid #e2e5ea",
        borderTop:    "3px solid #c4973a",
        borderRadius: "50%",
        animation:    "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ margin: 0, fontSize: "14px" }}>Signing you in...</p>
    </div>
  );
}
