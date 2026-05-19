"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z.object({
  password: z.string()
    .min(8, "At least 8 characters required")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
  confirm: z.string().min(1, "Please confirm your password"),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

const EXPIRED_MSG = "This reset link is invalid or has expired.";

export default function ConfirmPage() {
  const router = useRouter();
  const [checking, setChecking]       = useState(true);
  const [tokenError, setTokenError]   = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    async function verifyToken() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) setTokenError(true);
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) setTokenError(true);
      }
      setChecking(false);
    }
    verifyToken();
  }, []);

  async function onSubmit(data: FormData) {
    setLoading(true);
    setServerError(null);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { error } = await supabase.auth.updateUser({ password: data.password });
    if (error) {
      setServerError(EXPIRED_MSG);
      setLoading(false);
      return;
    }
    await fetch("/api/portal/auth/password-changed-notification", { method: "POST" }).catch(() => {});
    await supabase.auth.signOut({ scope: "global" });
    router.push("/login?reset=success");
  }

  const inputBase = cn(
    "w-full px-4 py-3 text-sm rounded-lg border bg-white text-navy min-h-[44px]",
    "transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
  );

  if (checking) {
    return (
      <main id="main-content" className="min-h-screen bg-off flex items-center justify-center px-4">
        <span className="sr-only">Verifying reset link…</span>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-off flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <Link href="/" className="flex flex-col items-center mb-8 group" aria-label="Erano Consulting — back to home">
          <span className="text-2xl font-extrabold tracking-tight text-navy">ERANO</span>
          <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-body">Consulting</span>
          <span className="mt-2 block h-0.5 w-8 bg-gold transition-all duration-300 group-hover:w-12" aria-hidden="true" />
        </Link>

        <div className="bg-white rounded-2xl shadow-lift px-6 py-8 md:px-10 md:py-10">
          {tokenError ? (
            <div role="alert">
              <h1 className="text-xl font-bold text-navy mb-3">Link expired</h1>
              <p className="text-sm text-body leading-relaxed mb-4">{EXPIRED_MSG}</p>
              <Link href="/reset-password" className="text-sm text-gold hover:text-gold-dark hover:underline underline-offset-2 transition-colors">
                Request a new link
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-navy mb-1">Set a new password</h1>
              <p className="text-sm text-body mb-6">Choose a strong password for your account.</p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-medium text-navy">New password</label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    {...register("password")}
                    className={cn(inputBase, errors.password ? "border-red-400" : "border-line hover:border-navy/30")}
                  />
                  {errors.password && (
                    <p id="password-error" className="text-xs text-red-600" role="alert">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm" className="text-sm font-medium text-navy">Confirm password</label>
                  <input
                    id="confirm"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={!!errors.confirm}
                    aria-describedby={errors.confirm ? "confirm-error" : undefined}
                    {...register("confirm")}
                    className={cn(inputBase, errors.confirm ? "border-red-400" : "border-line hover:border-navy/30")}
                  />
                  {errors.confirm && (
                    <p id="confirm-error" className="text-xs text-red-600" role="alert">{errors.confirm.message}</p>
                  )}
                </div>

                {serverError && (
                  <div role="alert" aria-live="assertive" className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                    {serverError}{" "}
                    <Link href="/reset-password" className="font-medium underline underline-offset-2">
                      Request a new one.
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full min-h-[44px] px-4 py-3 rounded-lg text-sm font-semibold",
                    "bg-navy text-gold transition-opacity duration-150",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                    loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90",
                  )}
                >
                  {loading ? "Updating…" : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-body">
          <Link href="/login" className="text-gold hover:text-gold-dark hover:underline underline-offset-2 transition-colors">
            Back to sign in
          </Link>
        </p>

      </div>
    </main>
  );
}
