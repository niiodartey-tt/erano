"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InvoiceRow {
  id:              string;
  invoice_number:  string;
  final_price_ghs: number;
  status:          string;
  generated_at:    string;
  client_id:       string;
  package:         { name: string } | null;
  client:          { email: string } | null;
}

const STATUS_COLORS: Record<string, string> = {
  generated: "bg-orange-100 text-orange-800",
  paid:      "bg-green-100 text-green-800",
};

function fmtCurrency(n: number): string {
  return "GH₵ " + Number(n).toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/invoices");
      if (!res.ok) { setError("Failed to load invoices."); setLoading(false); return; }
      const data = await res.json() as { invoices: InvoiceRow[] };
      setInvoices(data.invoices);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Invoice Manager</h1>
        <p className="text-sm text-body mt-1">All generated client invoices</p>
      </div>

      {loading && (
        <div className="space-y-2">
          {[1,2,3,4].map(i => <div key={i} className="h-14 rounded-xl bg-white border border-line animate-pulse" />)}
        </div>
      )}

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      {!loading && !error && invoices.length === 0 && (
        <div className="bg-white rounded-xl border border-line p-10 text-center">
          <p className="text-sm text-body">No invoices yet.</p>
        </div>
      )}

      {!loading && !error && invoices.length > 0 && (
        <div className="bg-white rounded-xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-off text-left text-xs font-semibold text-body uppercase tracking-wide">
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3 hidden md:table-cell">Client</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Package</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 sr-only">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-off/50 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-navy">{inv.invoice_number}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-body truncate max-w-[200px]">
                      {(inv.client as unknown as { email: string } | null)?.email ?? "—"}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-body">
                      {(inv.package as unknown as { name: string } | null)?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy">{fmtCurrency(inv.final_price_ghs)}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-body">
                      {new Date(inv.generated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", STATUS_COLORS[inv.status] ?? "bg-gray-100 text-gray-800")}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${inv.client_id}`} className="text-xs font-medium text-gold hover:text-gold-dark transition-colors">
                        View client
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
