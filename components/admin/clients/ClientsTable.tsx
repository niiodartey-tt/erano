"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Client {
  id: string;
  account_state:    string;
  created_at:       string;
  service_end_date?: string | null;
  client_profiles: {
    contact_name: string;
    legal_name:   string;
    packages:     { name: string } | null;
  } | null;
}

interface Props {
  clients: Client[];
  loading: boolean;
}

const STATE_BADGE: Record<string, { cls: string; label: string }> = {
  pending:               { cls: "bg-white/10 text-white/50",        label: "Pending" },
  awaiting_agreement:    { cls: "bg-blue-900/30 text-blue-400",     label: "Agreement" },
  awaiting_payment:      { cls: "bg-amber-900/30 text-amber-400",   label: "Payment Due" },
  awaiting_confirmation: { cls: "bg-purple-900/30 text-purple-400", label: "Confirming" },
  active:                { cls: "bg-green-900/30 text-green-400",   label: "Active" },
  expired:               { cls: "bg-red-900/30 text-red-400",       label: "Expired" },
};

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-GH", { day: "numeric", month: "short", year: "numeric" });

export function ClientsTable({ clients, loading }: Props) {
  if (loading) {
    return (
      <div className="divide-y divide-white/10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
            <div className="h-4 w-32 rounded bg-white/10" />
            <div className="h-4 w-40 rounded bg-white/10 hidden md:block" />
            <div className="h-4 w-20 rounded bg-white/10" />
            <div className="h-4 w-16 rounded bg-white/10 hidden md:block" />
          </div>
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <p className="px-5 py-12 text-sm text-white/60 text-center">No clients match your search.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-left text-xs font-semibold text-white/60 uppercase tracking-wide">
            <th className="px-4 py-3">Client name</th>
            <th className="px-4 py-3 hidden md:table-cell">Business name</th>
            <th className="px-4 py-3 hidden lg:table-cell">Package</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3 hidden md:table-cell">Date joined</th>
            <th className="px-4 py-3 sr-only">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => {
            const badge = STATE_BADGE[c.account_state] ?? STATE_BADGE["pending"];
            const daysLeft = c.service_end_date
              ? Math.ceil((new Date(c.service_end_date).getTime() - Date.now()) / 86_400_000)
              : null;
            const expiringSoon = daysLeft !== null && daysLeft <= 30 && c.account_state === "active";
            return (
              <tr key={c.id} className="border-b border-white/10 last:border-0 hover:bg-white/[0.03] transition-colors">
                <td className="px-4 py-3 font-medium text-white">{c.client_profiles?.contact_name ?? "—"}</td>
                <td className="px-4 py-3 text-white/60 hidden md:table-cell">{c.client_profiles?.legal_name ?? "—"}</td>
                <td className="px-4 py-3 text-white/60 hidden lg:table-cell">{c.client_profiles?.packages?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium", badge.cls)}>
                      {badge.label}
                    </span>
                    {expiringSoon && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-900/30 text-amber-400">
                        Expiring soon
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-white/60 hidden md:table-cell">{fmtDate(c.created_at)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/clients/${c.id}`} className="text-xs font-medium text-white/60 underline underline-offset-2 hover:text-gold transition-colors">
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
