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
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken  = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const type         = params.get("type");

      console.log("[AUTH-CALLBACK] hash:", hash);
      console.log("[AUTH-CALLBACK] accessToken present:", !!accessToken);
      console.log("[AUTH-CALLBACK] refreshToken present:", !!refreshToken);
      console.log("[AUTH-CALLBACK] type:", type);

      if (!accessToken || !refreshToken) {
        window.location.href = "/login";
        return;
      }

      const { data: { session }, error } = await supabase.auth.setSession({
        access_token:  accessToken,
        refresh_token: refreshToken,
      });

      console.log("[AUTH-CALLBACK] setSession error:", error);
      console.log("[AUTH-CALLBACK] session present:", !!session);
      console.log("[AUTH-CALLBACK] session user id:", session?.user?.id);

      if (error || !session) {
        window.location.href = "/login";
        return;
      }

      await redirect(supabase, session.user.id);
    }

    async function redirect(supabase: ReturnType<typeof createBrowserClient>, userId: string) {
      const { data: userData } = await supabase
        .from("users")
        .select("must_change_password, role")
        .eq("id", userId)
        .single();

      console.log("[AUTH-CALLBACK] userData:", JSON.stringify(userData));

      if (userData?.role === "admin") {
        window.location.href = "/admin";
      } else if (userData?.must_change_password) {
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
