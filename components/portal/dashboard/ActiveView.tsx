"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { Bell, Briefcase, FileText, FolderOpen } from "lucide-react";
import { usePortal } from "@/context/PortalContext";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface ProfileApiData {
  legal_name: string;
  package_name: string | null;
}

interface DashData {
  packageName: string;
  legalName: string;
  pendingDocs: number;
  unreadNotifs: number;
  recentNotifs: Array<{ id: string; message: string; created_at: string }>;
}

export default function ActiveView() {
  const { userId } = usePortal();
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    (async () => {
      const [profileRes, d, n, nr] = await Promise.all([
        fetch("/api/portal/profile/me"),
        sb.from("document_requests").select("id", { count: "exact", head: true }).eq("client_id", userId).eq("status", "pending"),
        sb.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("read", false),
        sb.from("notifications").select("id, message, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
      ]);
      if (!profileRes.ok) { setError(true); setLoading(false); return; }
      const prof = await profileRes.json() as ProfileApiData;
      setData({
        legalName:     prof.legal_name,
        packageName:   prof.package_name ?? "—",
        pendingDocs:   d.count ?? 0,
        unreadNotifs:  n.count ?? 0,
        recentNotifs:  (nr.data ?? []) as DashData["recentNotifs"],
      });
      setLoading(false);
    })().catch(() => { setError(true); setLoading(false); });
  }, [userId]);

  if (loading) return <div className="h-48 rounded-xl bg-line animate-pulse" />;
  if (error || !data) {
    return (
      <p className="text-sm text-body">
        Unable to load dashboard. Please refresh the page.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Package" value={data.packageName} icon={<Briefcase className="h-4 w-4" />} href="/portal/services" />
        <StatCard label="Pending docs" value={String(data.pendingDocs)} icon={<FolderOpen className="h-4 w-4" />} href="/portal/documents" />
        <StatCard label="Unread" value={String(data.unreadNotifs)} icon={<Bell className="h-4 w-4" />} href="/portal/notifications" />
        <StatCard label="Invoice" value="View" icon={<FileText className="h-4 w-4" />} href="/portal/invoice" />
      </div>

      {data.recentNotifs.length > 0 && (
        <div className="rounded-xl border border-line bg-white p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-body mb-4">
            Recent activity
          </h3>
          <ul className="space-y-3" role="list">
            {data.recentNotifs.map((notif) => (
              <li key={notif.id} className="flex items-start justify-between gap-4">
                <span className="text-sm text-navy">{notif.message}</span>
                <span className="text-xs text-body/60 shrink-0">{timeAgo(notif.created_at)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-xl border border-line bg-white p-4 hover:border-navy transition-colors min-h-[44px]"
    >
      <span className="text-body">{icon}</span>
      <span className="text-xl font-bold text-navy truncate">{value}</span>
      <span className="text-xs text-body">{label}</span>
    </Link>
  );
}
