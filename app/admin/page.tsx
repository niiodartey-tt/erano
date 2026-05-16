"use client";

import { useState, useEffect } from "react";
import { Users, Clock, CreditCard, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmissionsPanel } from "@/components/admin/inbox/SubmissionsPanel";

interface Metrics {
  total_clients: number;
  pending_submissions: number;
  awaiting_confirmation: number;
  active_clients: number;
}

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

export default function AdminDashboard() {
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [metrics, setMetrics]         = useState<Metrics | null>(null);
  const [stateCounts, setStateCounts] = useState<Record<string, number>>({});
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/metrics");
      if (!res.ok) { setError("Failed to load dashboard data."); setLoading(false); return; }
      const json = await res.json() as {
        metrics: Metrics;
        state_counts: Record<string, number>;
        submissions: Submission[];
      };
      setMetrics(json.metrics);
      setStateCounts(json.state_counts);
      setSubmissions(json.submissions);
      setLoading(false);
    }
    void load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-navy border border-white/10 animate-pulse" />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-navy border border-white/10 animate-pulse" />
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <p className="text-sm text-red-600" role="alert">{error ?? "Something went wrong."}</p>
      </div>
    );
  }

  const CARDS = [
    { label: "Total Clients",         value: metrics.total_clients,        icon: Users,       gold: false },
    { label: "Pending Submissions",   value: metrics.pending_submissions,  icon: Clock,       gold: metrics.pending_submissions > 0 },
    { label: "Awaiting Confirmation", value: metrics.awaiting_confirmation, icon: CreditCard, gold: metrics.awaiting_confirmation > 0 },
    { label: "Active Clients",        value: metrics.active_clients,        icon: CheckCircle, gold: false },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map(({ label, value, icon: Icon, gold }) => (
          <div key={label} className="bg-navy rounded-xl border border-white/10 p-4 md:p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-white/60 leading-tight">{label}</p>
              <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", gold ? "text-gold" : "text-white/30")} aria-hidden="true" />
            </div>
            <p className={cn("mt-3 text-2xl md:text-3xl font-bold", gold ? "text-gold" : "text-white")}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <SubmissionsPanel submissions={submissions} stateCounts={stateCounts} />
    </div>
  );
}
