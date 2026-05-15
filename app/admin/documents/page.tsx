"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DocRequest {
  id:           string;
  client_id:    string;
  contact_name: string | null;
  legal_name:   string | null;
  title:        string;
  category:     string;
  status:       "pending" | "uploaded" | "reviewed";
  created_at:   string;
  upload_count: number;
}

const STATUS_CLASSES: Record<DocRequest["status"], string> = {
  pending:  "bg-amber-100 text-amber-800",
  uploaded: "bg-blue-100 text-blue-800",
  reviewed: "bg-green-100 text-green-800",
};

export default function DocumentsPage() {
  const [requests, setRequests] = useState<DocRequest[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/documents");
      if (!res.ok) { setError("Failed to load document requests."); setLoading(false); return; }
      const data = await res.json() as { requests: DocRequest[] };
      setRequests(data.requests);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Document Manager</h1>
        <p className="mt-1 text-sm text-body">All document requests across all clients</p>
      </div>

      {loading && (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl border border-line bg-white" />
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <div className="rounded-xl border border-line bg-white p-10 text-center">
          <p className="text-sm text-body">No document requests yet.</p>
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-off text-left text-xs font-semibold uppercase tracking-wide text-body">
                  <th className="px-4 py-3">Client</th>
                  <th className="hidden px-4 py-3 md:table-cell">Business</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 lg:table-cell">Date</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Uploads</th>
                  <th className="px-4 py-3 sr-only">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {requests.map((req) => (
                  <tr key={req.id} className="transition-colors hover:bg-off/50">
                    <td className="px-4 py-3 font-medium text-navy">{req.contact_name ?? "—"}</td>
                    <td className="hidden px-4 py-3 text-body md:table-cell">{req.legal_name ?? "—"}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-body">{req.title}</td>
                    <td className="hidden px-4 py-3 text-body sm:table-cell">{req.category}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_CLASSES[req.status] ?? "bg-gray-100 text-gray-800")}>
                        {req.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-body lg:table-cell">
                      {new Date(req.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="hidden px-4 py-3 text-body sm:table-cell">{req.upload_count}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/clients/${req.client_id}`}
                        className="text-xs font-medium text-gold transition-opacity hover:opacity-75"
                      >
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
