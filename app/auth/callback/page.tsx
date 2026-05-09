"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    // Exchange the token in the URL hash for a session
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Check must_change_password
        supabase
          .from("users")
          .select("must_change_password")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.must_change_password) {
              window.location.href = "/portal/set-password";
            } else {
              window.location.href = "/portal/dashboard";
            }
          });
      }
    });
  }, []);

  return (
    <div style={{
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      minHeight:      "100vh",
      fontFamily:     "Plus Jakarta Sans, sans-serif",
      color:          "#0d1b2e",
    }}>
      <p>Signing you in...</p>
    </div>
  );
}
