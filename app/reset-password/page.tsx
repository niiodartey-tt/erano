"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/confirm`,
    });
    setLoading(false);
    setSubmitted(true);
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
          {submitted ? (
            <div role="status">
              <h1 className="text-xl font-bold text-navy mb-3">Check your email</h1>
              <p className="text-sm text-body leading-relaxed">
                If an account exists for that address, we&apos;ve sent a password reset link. It expires in 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-navy mb-1">Reset your password</h1>
              <p className="text-sm text-body mb-6">Enter your email and we&apos;ll send you a reset link.</p>

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
                    className={cn(
                      "w-full px-4 py-3 text-sm rounded-lg border bg-white text-navy placeholder:text-body/50 min-h-[44px]",
                      "transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
                      errors.email ? "border-red-400" : "border-line hover:border-navy/30",
                    )}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600" role="alert">{errors.email.message}</p>
                  )}
                </div>

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
                  {loading ? "Sending…" : "Send reset link"}
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
