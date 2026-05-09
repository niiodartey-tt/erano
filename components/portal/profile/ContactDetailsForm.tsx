"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  contactName:  z.string().min(2).max(200),
  contactRole:  z.string().min(2).max(100),
  contactPhone: z.string().min(7).max(30),
  address:      z.string().min(5).max(500),
});

type FormData = z.infer<typeof schema>;

interface Props {
  defaultValues: FormData;
  email: string;
  legalName: string;
}

const inputBase =
  "w-full px-4 py-3 text-sm rounded-lg border bg-white text-navy min-h-[44px] " +
  "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1";

export default function ContactDetailsForm({ defaultValues, email, legalName }: Props) {
  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setSuccess(false);
    setServerError(null);
    const res = await fetch("/api/portal/profile/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      const body = await res.json().catch(() => ({})) as { error?: string };
      setServerError(body.error ?? "Failed to save. Please try again.");
    }
  }

  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-base font-semibold text-navy">
        Contact details
      </h2>
      <p className="text-sm text-body mt-1 mb-5">Update your contact information below.</p>

      <div className="space-y-4 mb-5">
        <ReadOnlyField label="Business name" value={legalName} note="cannot be changed" />
        <ReadOnlyField label="Email address" value={email}    note="cannot be changed" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Field id="contactName" label="Full name" errorMsg={errors.contactName?.message}>
          <input
            id="contactName"
            {...register("contactName")}
            aria-invalid={!!errors.contactName}
            aria-describedby={errors.contactName ? "contactName-error" : undefined}
            className={cn(inputBase, errors.contactName ? "border-red-400" : "border-line hover:border-navy/30")}
          />
        </Field>
        <Field id="contactRole" label="Role / title" errorMsg={errors.contactRole?.message}>
          <input
            id="contactRole"
            {...register("contactRole")}
            aria-invalid={!!errors.contactRole}
            aria-describedby={errors.contactRole ? "contactRole-error" : undefined}
            className={cn(inputBase, errors.contactRole ? "border-red-400" : "border-line hover:border-navy/30")}
          />
        </Field>
        <Field id="contactPhone" label="Phone number" errorMsg={errors.contactPhone?.message}>
          <input
            id="contactPhone"
            type="tel"
            {...register("contactPhone")}
            aria-invalid={!!errors.contactPhone}
            aria-describedby={errors.contactPhone ? "contactPhone-error" : undefined}
            className={cn(inputBase, errors.contactPhone ? "border-red-400" : "border-line hover:border-navy/30")}
          />
        </Field>
        <Field id="address" label="Office address" errorMsg={errors.address?.message}>
          <textarea
            id="address"
            rows={3}
            {...register("address")}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={cn(inputBase, "resize-none", errors.address ? "border-red-400" : "border-line hover:border-navy/30")}
          />
        </Field>

        {success && (
          <div role="status" aria-live="polite" className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
            Profile updated successfully.
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
            "px-6 py-2.5 rounded-lg text-sm font-semibold bg-navy text-gold min-h-[44px]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
            loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 transition-opacity",
          )}
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </form>
    </section>
  );
}

function Field({
  id, label, errorMsg, children,
}: {
  id: string;
  label: string;
  errorMsg?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy">{label}</label>
      {children}
      {errorMsg && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">{errorMsg}</p>
      )}
    </div>
  );
}

function ReadOnlyField({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-navy">
        {label} <span className="font-normal text-body">({note})</span>
      </span>
      <div className="px-4 py-3 text-sm rounded-lg bg-off text-body min-h-[44px] flex items-center">
        {value}
      </div>
    </div>
  );
}
