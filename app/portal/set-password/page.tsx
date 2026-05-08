"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
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

export default function SetPasswordPage() {
  const router = useRouter();
  const [checking, setChecking]       = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const pwd = useWatch({ control, name: "password", defaultValue: "" });

  const checks = [
    { label: "At least 8 characters",          pass: pwd.length >= 8 },
    { label: "At least one number",            pass: /[0-9]/.test(pwd) },
    { label: "At least one special character", pass: /[^a-zA-Z0-9]/.test(pwd) },
  ];

  useEffect(() => {
    async function verifyAuth() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      setChecking(false);
    }
    verifyAuth();
  }, [router]);

  async function onSubmit(data: FormData) {
    setLoading(true);
    setServerError(null);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { error: updateError } = await supabase.auth.updateUser({ password: data.password });
    if (updateError) {
      setServerError("Failed to update password. Please try again.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/portal/auth/clear-password-flag", { method: "POST" });
    if (!res.ok) {
      setServerError("Account update failed. Please contact support.");
      setLoading(false);
      return;
    }

    router.push("/portal/dashboard");
  }

  const inputBase = cn(
    "w-full px-4 py-3 text-sm rounded-lg border bg-white text-navy min-h-[44px]",
    "transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
  );

  if (checking) {
    return (
      <main id="main-content" className="min-h-screen bg-off flex items-center justify-center px-4">
        <span className="sr-only">Verifying session…</span>
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
          <h1 className="text-xl font-bold text-navy mb-1">Create your password</h1>
          <p className="text-sm text-body mb-6">You must set a password before accessing your account.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-navy">New password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby="password-reqs"
                {...register("password")}
                className={cn(inputBase, errors.password ? "border-red-400" : "border-line hover:border-navy/30")}
              />
              {errors.password && (
                <p className="text-xs text-red-600" role="alert">{errors.password.message}</p>
              )}
              <ul id="password-reqs" className="mt-1 flex flex-col gap-1" aria-label="Password requirements">
                {checks.map(({ label, pass }) => (
                  <li key={label} className={cn("flex items-center gap-1.5 text-xs", pass ? "text-green-600" : "text-body")}>
                    {pass
                      ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      : <Circle       className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    }
                    {label}
                  </li>
                ))}
              </ul>
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
              {loading ? "Saving…" : "Set password"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}
