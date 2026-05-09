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
      console.log("[AUTH-CALLBACK] page loaded");
      console.log("[AUTH-CALLBACK] pathname:", window.location.pathname);
      console.log("[AUTH-CALLBACK] search:", window.location.search);
      console.log("[AUTH-CALLBACK] hash length:", window.location.hash.length);

      // ── PATH A: implicit flow — tokens in hash ────────────────────────────
      const hash       = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const accessToken  = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type         = hashParams.get("type");
      const hashError    = hashParams.get("error");

      console.log("[AUTH-CALLBACK] PATH A — hash tokens present:", !!accessToken && !!refreshToken);
      console.log("[AUTH-CALLBACK] type:", type);
      console.log("[AUTH-CALLBACK] hash error:", hashError);

      if (accessToken && refreshToken) {
        console.log("[AUTH-CALLBACK] calling setSession with hash tokens");
        const { data: { session }, error } = await supabase.auth.setSession({
          access_token:  accessToken,
          refresh_token: refreshToken,
        });
        console.log("[AUTH-CALLBACK] setSession error:", error?.message ?? null);
        console.log("[AUTH-CALLBACK] setSession session present:", !!session);
        console.log("[AUTH-CALLBACK] setSession user id:", session?.user?.id ?? null);

        if (session) {
          await doRedirect(supabase, session.user.id);
          return;
        }
        console.log("[AUTH-CALLBACK] setSession produced no session, falling through");
      }

      // ── PATH B: PKCE flow — code in query string ──────────────────────────
      const searchParams = new URLSearchParams(window.location.search);
      const code         = searchParams.get("code");
      console.log("[AUTH-CALLBACK] PATH B — PKCE code present:", !!code);

      if (code) {
        console.log("[AUTH-CALLBACK] calling exchangeCodeForSession");
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log("[AUTH-CALLBACK] exchangeCode error:", error?.message ?? null);
        console.log("[AUTH-CALLBACK] exchangeCode session present:", !!session);
        console.log("[AUTH-CALLBACK] exchangeCode user id:", session?.user?.id ?? null);

        if (session) {
          await doRedirect(supabase, session.user.id);
          return;
        }
        console.log("[AUTH-CALLBACK] exchangeCode produced no session, falling through");
      }

      // ── PATH C: SDK already processed tokens — check existing session ─────
      console.log("[AUTH-CALLBACK] PATH C — calling getSession as fallback");
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log("[AUTH-CALLBACK] getSession error:", sessionError?.message ?? null);
      console.log("[AUTH-CALLBACK] getSession session present:", !!session);
      console.log("[AUTH-CALLBACK] getSession user id:", session?.user?.id ?? null);

      if (session) {
        await doRedirect(supabase, session.user.id);
        return;
      }

      console.log("[AUTH-CALLBACK] all paths exhausted — redirecting to /login");
      window.location.href = "/login";
    }

    async function doRedirect(
      supabase: ReturnType<typeof createBrowserClient>,
      userId: string,
    ) {
      console.log("[AUTH-CALLBACK] querying users table for id:", userId);
      const { data: userData, error: dbError } = await supabase
        .from("users")
        .select("must_change_password, role")
        .eq("id", userId)
        .single();

      console.log("[AUTH-CALLBACK] dbError:", dbError?.message ?? null);
      console.log("[AUTH-CALLBACK] must_change_password:", userData?.must_change_password ?? null);
      console.log("[AUTH-CALLBACK] role:", userData?.role ?? null);

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
