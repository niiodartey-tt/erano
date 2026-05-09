"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { usePortal } from "@/context/PortalContext";

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

export default function NotificationBell() {
  const router      = useRouter();
  const { userId }  = usePortal();
  const [open, setOpen]     = useState(false);
  const [items, setItems]   = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const ref    = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    fetch("/api/portal/notifications")
      .then((r) => r.json() as Promise<{ notifications: Notification[] }>)
      .then((d) => { setItems(d.notifications ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const channel = supabase
      .channel(`portal-notifications-${userId}`)
      .on<Notification>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        (payload) => { setItems((prev) => [payload.new, ...prev]); },
      )
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [userId]);

  async function markRead(id: string, link: string | null) {
    await fetch("/api/portal/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    if (link) { setOpen(false); router.push(link); }
  }

  async function markAllRead() {
    await fetch("/api/portal/notifications/mark-all-read", { method: "POST" });
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg text-body hover:bg-off transition-colors"
        aria-label={`Notifications — ${unread} unread`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white" aria-hidden="true">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 mt-2 w-80 max-h-[400px] flex flex-col rounded-xl border border-line bg-white shadow-lg z-50"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-line shrink-0">
            <p className="text-sm font-semibold text-navy">Notifications</p>
            <button
              onClick={markAllRead}
              disabled={unread === 0}
              className="text-xs text-body hover:text-navy transition-colors disabled:opacity-40"
            >
              Mark all as read
            </button>
          </div>
          <ul role="list" className="overflow-y-auto flex-1">
            {loading && <li className="px-4 py-8 text-center text-sm text-body">Loading...</li>}
            {!loading && items.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-body">No notifications yet</li>
            )}
            {items.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => markRead(n.id, n.link)}
                  className={`w-full text-left px-4 py-3 border-l-[3px] transition-colors hover:bg-off ${n.read ? "bg-off border-transparent" : "bg-white border-gold"}`}
                >
                  <p className={`text-sm leading-snug ${n.read ? "font-normal text-body" : "font-semibold text-navy"}`}>{n.message}</p>
                  <p className="mt-0.5 text-[11px] text-body">{timeAgo(n.created_at)}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
