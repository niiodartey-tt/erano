"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const GHANA_BANKS = [
  "Absa Bank Ghana","Access Bank Ghana","Agricultural Development Bank","Bank of Africa Ghana","Calbank",
  "Consolidated Bank Ghana","Ecobank Ghana","Fidelity Bank Ghana","First Atlantic Bank","First National Bank Ghana",
  "GCB Bank","Guaranty Trust Bank Ghana","Heritage Bank","Multiflex Bank","National Investment Bank",
  "OmniBSIC Bank","Prudential Bank","Republic Bank Ghana","Société Générale Ghana","Stanbic Bank Ghana",
  "Standard Chartered Bank Ghana","UBA Ghana","Universal Merchant Bank","Other (please specify)",
];

const schema = z.object({
  amount_paid:  z.number({ message: "Enter a valid amount" }).positive("Amount must be greater than 0"),
  currency:     z.enum(["GHS", "USD"]),
  payment_date: z.string().min(1, "Date is required").refine((d) => new Date(d + "T00:00:00") <= new Date(), "Date cannot be in the future"),
  payment_method: z.enum(["Bank Transfer", "Cheque", "Cash"], { message: "Please select a payment method" }),
  bank_name:    z.string().min(1, "Bank name is required").max(100).trim(),
  transaction_reference: z.string().min(3, "Minimum 3 characters").max(100).trim(),
  notes:        z.string().max(500).optional(),
  file: z.any()
    .refine((val) => val instanceof FileList && val.length > 0, "Proof of payment is required")
    .refine((val) => !(val instanceof FileList) || val[0].size <= 5_242_880, "Max file size is 5MB")
    .refine((val) => !(val instanceof FileList) || ["image/jpeg","image/png","application/pdf"].includes(val[0].type), "Only PDF, JPEG, or PNG are accepted"),
});

type FormValues = z.infer<typeof schema>;

const inputCls = "w-full rounded border border-line px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-navy/30";
const labelCls = "mb-1 block text-sm font-medium text-navy";
const errCls   = "mt-1 text-xs text-red-600";

export default function PaymentUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [otherBank, setOtherBank] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currency: "GHS" },
  });

  async function onSubmit(data: FormValues) {
    setStatus("loading"); setApiError(null);
    const fd = new FormData();
    fd.append("amount_paid",           String(data.amount_paid));
    fd.append("currency",              data.currency);
    fd.append("payment_date",          data.payment_date);
    fd.append("payment_method",        data.payment_method);
    fd.append("bank_name",             data.bank_name === "Other (please specify)" ? otherBank : data.bank_name);
    fd.append("transaction_reference", data.transaction_reference);
    if (data.notes?.trim()) fd.append("notes", data.notes.trim());
    fd.append("file", (data.file as FileList)[0]);
    try {
      const res = await fetch("/api/portal/payments/upload", { method: "POST", body: fd });
      if (res.status === 409) { setApiError("This transaction reference has already been used."); setStatus("idle"); return; }
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        setApiError(body.error ?? "Upload failed. Please try again.");
        setStatus("idle"); return;
      }
      setStatus("success"); onSuccess?.(); router.refresh();
    } catch {
      setApiError("Something went wrong. Please try again."); setStatus("idle");
    }
  }

  if (status === "success") return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
      <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" aria-hidden="true" />
      <p className="font-semibold text-green-800">Payment proof submitted</p>
      <p className="mt-1 text-sm text-green-700">We will review your payment and confirm within 1–2 business days.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {apiError && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3" role="alert" aria-live="assertive">
          <p className="text-sm text-red-700">{apiError}</p>
        </div>
      )}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount_paid" className={labelCls}>Amount paid</label>
          <input id="amount_paid" type="number" step="0.01" min="0" {...register("amount_paid", { valueAsNumber: true })} className={inputCls} />
          {errors.amount_paid && <p role="alert" className={errCls}>{errors.amount_paid.message}</p>}
        </div>
        <div>
          <label htmlFor="currency" className={labelCls}>Currency</label>
          <div className="relative">
            <select id="currency" {...register("currency")} className={cn(inputCls, "appearance-none pr-9")}>
              <option value="GHS">GHS — Ghana Cedi</option><option value="USD">USD — US Dollar</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="h-4 w-4 text-navy/40" fill="none" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="payment_date" className={labelCls}>Payment date</label>
        <input id="payment_date" type="date" {...register("payment_date")} className={inputCls} />
        {errors.payment_date && <p role="alert" className={errCls}>{errors.payment_date.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="payment_method" className={labelCls}>Payment method</label>
        <div className="relative">
          <select id="payment_method" {...register("payment_method")} className={cn(inputCls, "appearance-none pr-9")}>
            <option value="">Select method</option>
            <option value="Bank Transfer">Bank Transfer</option><option value="Cheque">Cheque</option><option value="Cash">Cash</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-navy/40" fill="none" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        {errors.payment_method && <p role="alert" className={errCls}>{errors.payment_method.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="bank_name" className={labelCls}>Bank name</label>
        <div className="relative">
          <select id="bank_name" {...register("bank_name")} className={cn(inputCls, "appearance-none pr-9")}>
            <option value="">Select bank</option>
            {GHANA_BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-navy/40" fill="none" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        {watch("bank_name") === "Other (please specify)" && (
          <input className={`${inputCls} mt-2`} value={otherBank} onChange={e => setOtherBank(e.target.value)} placeholder="Specify bank name" aria-label="Other bank name" />
        )}
        {errors.bank_name && <p role="alert" className={errCls}>{errors.bank_name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="transaction_reference" className={labelCls}>Transaction reference</label>
        <input id="transaction_reference" type="text" {...register("transaction_reference")} className={inputCls} />
        {errors.transaction_reference && <p role="alert" className={errCls}>{errors.transaction_reference.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className={labelCls}>Notes <span className="font-normal text-body">(optional)</span></label>
        <textarea id="notes" rows={3} {...register("notes")} className={inputCls} />
        {errors.notes && <p role="alert" className={errCls}>{errors.notes.message}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="file" className={labelCls}>Proof of payment</label>
        <p className="mb-1 text-xs text-body">PDF, JPEG, or PNG — max 5MB</p>
        <input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" {...register("file")} className="block w-full text-sm text-body file:mr-3 file:rounded file:border file:border-line file:bg-off file:px-3 file:py-1.5 file:text-sm" />
        {errors.file && <p role="alert" className={errCls}>{errors.file.message as string}</p>}
      </div>
      <button type="submit" disabled={status === "loading"} className="flex items-center gap-2 rounded bg-navy px-6 py-2.5 text-sm font-semibold text-gold disabled:cursor-not-allowed disabled:opacity-50">
        <Upload className="h-4 w-4" aria-hidden="true" />
        {status === "loading" ? "Uploading..." : "Upload payment proof"}
      </button>
    </form>
  );
}
