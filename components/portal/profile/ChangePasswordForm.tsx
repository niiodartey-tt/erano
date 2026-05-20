"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBrowserClient } from "@supabase/ssr";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z
      .string()
      .min(8, "At least 8 characters required")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const inputBase =
  "w-full px-4 py-3 text-sm rounded-lg border bg-white text-navy min-h-[44px] " +
  "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1";

export default function ChangePasswordForm({ email }: { email: string }) {
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const newPwd = useWatch({ control, name: "newPassword", defaultValue: "" });

  const checks = [
    { label: "At least 8 characters",          pass: newPwd.length >= 8 },
    { label: "At least one number",            pass: /[0-9]/.test(newPwd) },
    { label: "At least one special character", pass: /[^a-zA-Z0-9]/.test(newPwd) },
  ];

  async function onSubmit(data: FormData) {
    setLoading(true);
    setSuccess(false);
    setServerError(null);

    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { error: signInError } = await sb.auth.signInWithPassword({
      email,
      password: data.currentPassword,
    });
    if (signInError) {
      setServerError("Current password is incorrect.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await sb.auth.updateUser({ password: data.newPassword });
    if (updateError) {
      setServerError("Failed to update password. Please try again.");
      setLoading(false);
      return;
    }

    await fetch("/api/portal/auth/clear-password-flag", { method: "POST" });
    setSuccess(true);
    reset();
    setLoading(false);
  }

  return (
    <section aria-labelledby="password-heading" className="bg-white rounded-xl border border-line p-6 mt-6">
      <h2 id="password-heading" className="text-base font-semibold text-navy">
        Change password
      </h2>
      <div className="w-8 h-0.5 bg-gold mt-1 mb-4" aria-hidden="true" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className="text-sm font-medium text-navy">
            Current password
          </label>
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            {...register("currentPassword")}
            aria-invalid={!!errors.currentPassword}
            aria-describedby={errors.currentPassword ? "currentPassword-error" : undefined}
            className={cn(inputBase, errors.currentPassword ? "border-red-400" : "border-line hover:border-navy/30")}
          />
          {errors.currentPassword && (
            <p id="currentPassword-error" className="text-xs text-red-600" role="alert">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-sm font-medium text-navy">
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            {...register("newPassword")}
            aria-invalid={!!errors.newPassword}
            aria-describedby="newPassword-reqs"
            className={cn(inputBase, errors.newPassword ? "border-red-400" : "border-line hover:border-navy/30")}
          />
          {errors.newPassword && (
            <p className="text-xs text-red-600" role="alert">{errors.newPassword.message}</p>
          )}
          <ul id="newPassword-reqs" className="mt-0.5 flex flex-col gap-1" aria-label="Password requirements">
            {checks.map(({ label, pass }) => (
              <li key={label} className={cn("flex items-center gap-1.5 text-sm", pass ? "text-gold" : "text-body/60")}>
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
          <label htmlFor="confirmPassword" className="text-sm font-medium text-navy">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            className={cn(inputBase, errors.confirmPassword ? "border-red-400" : "border-line hover:border-navy/30")}
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-xs text-red-600" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {success && (
          <div role="status" aria-live="polite" className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
            Password changed successfully.
          </div>
        )}
        {serverError && (
          <div role="alert" aria-live="assertive" className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold bg-navy text-gold min-h-[44px]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
            loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 transition-opacity",
          )}
        >
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </section>
  );
}
