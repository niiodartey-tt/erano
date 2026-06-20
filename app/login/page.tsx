"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z.object({
  email:    z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && (hash.includes("type=magiclink") || hash.includes("access_token="))) {
      window.location.href = "/portal/set-password" + hash;
    }
  }, []);

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

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
        body:    JSON.stringify({ email: data.email, password: data.password }),
      });
      const json = await res.json() as { error?: string; redirectTo?: string };

      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      window.location.href = json.redirectTo ?? "/portal/dashboard";
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase = cn(
    "w-full px-4 py-3 text-sm rounded-lg border bg-white text-navy placeholder:text-body/50 min-h-[44px]",
    "transition-colors duration-150",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
  );

  return (
    <main id="main-content" className="min-h-screen bg-off flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <Link href="/" className="flex flex-col items-center mb-8 group" aria-label="Erano Consulting — back to home">
          <span className="text-2xl font-extrabold tracking-tight text-navy">ERANO</span>
          <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-body">Consulting</span>
          <span className="mt-2 block h-0.5 w-8 bg-gold transition-all duration-300 group-hover:w-12" aria-hidden="true" />
        </Link>

        <div className="bg-white rounded-2xl shadow-lift px-6 py-8 md:px-10 md:py-10">
          <h1 className="text-xl font-bold text-navy mb-1">Sign in</h1>
          <p className="text-sm text-body mb-6">Access your Erano client portal</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-navy">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={cn(inputBase, errors.email ? "border-red-400" : "border-line hover:border-navy/30")}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-600" role="alert">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-navy">Password</label>
                <Link href="/reset-password" className="text-xs text-gold hover:text-gold-dark hover:underline underline-offset-2 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
                className={cn(inputBase, errors.password ? "border-red-400" : "border-line hover:border-navy/30")}
              />
              {errors.password && (
                <p id="password-error" className="text-xs text-red-600" role="alert">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <div role="alert" aria-live="assertive" className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {serverError}
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
              {loading ? "Signing in…" : "Sign in"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
