"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  account_state: string;
  created_at: string;
  client_profiles: {
    contact_name: string;
    legal_name: string;
    industry: string;
    packages: { name: string } | null;
  } | null;
}

interface Props {
  submissions: Submission[];
  stateCounts: Record<string, number>;
}

const STATE_BADGE: Record<string, { cls: string; label: string }> = {
  pending:               { cls: "bg-gray-100 text-gray-600",    label: "Pending" },
  awaiting_agreement:    { cls: "bg-blue-50 text-blue-700",     label: "Agreement" },
  awaiting_payment:      { cls: "bg-amber-50 text-amber-700",   label: "Payment Due" },
  awaiting_confirmation: { cls: "bg-purple-50 text-purple-700", label: "Confirming" },
  active:                { cls: "bg-green-50 text-green-700",   label: "Active" },
  expired:               { cls: "bg-red-50 text-red-700",       label: "Expired" },
};

const TABS = [
  { key: "all",                   label: "All" },
  { key: "pending",               label: "Pending" },
  { key: "awaiting_agreement",    label: "Awaiting Agreement" },
  { key: "awaiting_payment",      label: "Awaiting Payment" },
  { key: "awaiting_confirmation", label: "Awaiting Confirmation" },
  { key: "active",                label: "Active" },
  { key: "expired",               label: "Expired" },
];

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-GH", { day: "numeric", month: "short", year: "numeric" });

export function SubmissionsPanel({ submissions, stateCounts }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const totalAll = Object.values(stateCounts).reduce((sum, n) => sum + n, 0);
  const tabCount = (key: string) => (key === "all" ? totalAll : (stateCounts[key] ?? 0));

  const filtered = activeTab === "all"
    ? submissions
    : submissions.filter((s) => s.account_state === activeTab);

  return (
    <div className="bg-navy rounded-xl border border-white/10 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-white">Recent Submissions</h2>
        <Link href="/admin/clients?state=pending" className="text-xs font-medium text-gold hover:underline shrink-0">
          View all pending
        </Link>
      </div>

      <div className="border-b border-white/10 overflow-x-auto">
        <div className="flex min-w-max px-5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab.key
                  ? "border-gold text-gold"
                  : "border-transparent text-white/60 hover:text-white",
              )}
              aria-pressed={activeTab === tab.key}
            >
              {tab.label}
              <span className={cn(
                "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold",
                activeTab === tab.key ? "bg-gold/10 text-gold" : "bg-white/10 text-white/40",
              )}>
                {tabCount(tab.key)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="px-5 py-10 text-sm text-white/60 text-center">No submissions for this filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-left text-xs font-semibold text-white/60 uppercase tracking-wide">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3 hidden md:table-cell">Business</th>
                <th className="px-4 py-3 hidden lg:table-cell">Industry</th>
                <th className="px-4 py-3 hidden lg:table-cell">Package</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 py-3 sr-only">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const badge = STATE_BADGE[s.account_state] ?? STATE_BADGE["pending"];
                return (
                  <tr key={s.id} className="border-b border-white/10 last:border-0 hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{s.client_profiles?.contact_name ?? "—"}</td>
                    <td className="px-4 py-3 text-white/60 hidden md:table-cell">{s.client_profiles?.legal_name ?? "—"}</td>
                    <td className="px-4 py-3 text-white/60 hidden lg:table-cell">{s.client_profiles?.industry ?? "—"}</td>
                    <td className="px-4 py-3 text-white/60 hidden lg:table-cell">{s.client_profiles?.packages?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium", badge.cls)}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/60 hidden md:table-cell">{fmtDate(s.created_at)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${s.id}`} className="text-xs font-medium text-white/60 underline underline-offset-2 hover:text-gold transition-colors">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
