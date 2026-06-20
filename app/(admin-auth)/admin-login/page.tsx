"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  email:    z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: data.email, password: data.password, mode: "admin" }),
      });
      const json = await res.json() as { error?: string; redirectTo?: string };

      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      window.location.href = json.redirectTo ?? "/admin";
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = cn(
    "w-full rounded-lg border bg-white/5 border-white/10 text-white text-sm",
    "px-3.5 py-[11px] placeholder:text-white/30 min-h-[44px]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/20 focus-visible:border-gold",
    "transition-colors duration-150",
  );

  return (
    <main
      id="main-content"
      className="min-h-screen bg-ink flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md">

        {/* Wordmark */}
        <div className="text-center mb-8">
          <p
            className="text-[2rem] font-bold text-white"
            style={{
              fontFamily:    'var(--font-playfair), "Playfair Display", Georgia, serif',
              letterSpacing: "-0.02em",
              lineHeight:    1,
            }}
          >
            ERANO
          </p>
          <p
            className="mt-2 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-gold"
            style={{ fontFamily: 'var(--font-inter), "Inter", system-ui, sans-serif' }}
          >
            Admin Portal
          </p>
          <div className="mt-3 mx-auto h-0.5 w-10 bg-gold" aria-hidden="true" />
        </div>

        {/* Card */}
        <div className="bg-navy rounded-2xl border border-gold/30 p-10">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[12px] font-medium uppercase tracking-[0.04em] text-white/70"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@eranoconsulting.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={cn(inputCls, errors.email && "border-red-500/60")}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[12px] font-medium uppercase tracking-[0.04em] text-white/70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
                className={cn(inputCls, errors.password && "border-red-500/60")}
              />
              {errors.password && (
                <p id="password-error" className="text-xs text-red-400" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <p
                className="text-[13px] text-red-400"
                role="alert"
                aria-live="assertive"
              >
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full min-h-[44px] px-4 py-3 rounded-lg text-sm font-bold",
                "bg-gold text-navy transition-opacity duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90",
              )}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
