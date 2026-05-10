"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [items, setItems]   = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    fetch("/api/portal/notifications")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json() as Promise<{ notifications: Notification[] }>;
      })
      .then((d) => { setItems(d.notifications ?? []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  async function markRead(id: string, link: string | null) {
    await fetch("/api/portal/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    if (link) router.push(link);
  }

  async function markAllRead() {
    await fetch("/api/portal/notifications/mark-all-read", { method: "POST" });
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  if (loading) return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <div className="animate-pulse space-y-3">
        {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-lg bg-off" />)}
      </div>
    </div>
  );

  if (error) return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <p className="text-sm text-red-600" role="alert">Failed to load notifications. Please refresh the page.</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy">Notifications</h1>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-body hover:text-navy transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Bell className="mb-4 h-12 w-12 text-line" aria-hidden="true" />
          <p className="text-base font-medium text-navy">No notifications yet</p>
          <p className="mt-1 text-sm text-body">We will let you know when something needs your attention.</p>
        </div>
      ) : (
        <ul role="list" className="divide-y divide-line rounded-xl border border-line overflow-hidden">
          {items.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => markRead(n.id, n.link)}
                className={`w-full text-left px-4 py-4 border-l-[3px] transition-colors hover:bg-off ${n.read ? "bg-white border-transparent" : "bg-white border-gold"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className={`text-sm leading-snug ${n.read ? "font-normal text-body" : "font-semibold text-navy"}`}>{n.message}</p>
                  <span className="shrink-0 text-[11px] text-body">{timeAgo(n.created_at)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
