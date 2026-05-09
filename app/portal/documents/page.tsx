"use client";

import { useState, useEffect, useCallback } from "react";
import { FolderOpen } from "lucide-react";
import DocumentRequestCard from "@/components/portal/documents/DocumentRequestCard";

interface DocUpload {
  id: string;
  file_path: string;
  uploaded_at: string;
}

interface DocRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "pending" | "uploaded" | "reviewed";
  created_at: string;
  document_uploads: DocUpload[];
}

export default function DocumentsPage() {
  const [requests, setRequests] = useState<DocRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/documents/requests");
      if (!res.ok) throw new Error();
      const data = await res.json() as { requests: DocRequest[] };
      setRequests(data.requests ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchRequests(); }, [fetchRequests]);

  if (loading) return (
    <div className="max-w-3xl p-4 md:p-6">
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-32 rounded-xl bg-off" />)}
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl p-4 md:p-6">
      <p className="text-sm text-red-600" role="alert">
        Failed to load document requests. Please refresh the page.
      </p>
    </div>
  );

  return (
    <div className="max-w-3xl p-4 md:p-6">
      <h1 className="mb-6 text-xl font-bold text-navy">My Documents</h1>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <FolderOpen className="mb-4 h-12 w-12 text-line" aria-hidden="true" />
          <p className="text-base font-medium text-navy">No document requests yet</p>
          <p className="mt-1 max-w-sm text-sm text-body">
            Our team will request documents from you when needed.
          </p>
        </div>
      ) : (
        <ul role="list" className="space-y-4">
          {requests.map((req) => (
            <li key={req.id}>
              <DocumentRequestCard
                request={req}
                uploads={req.document_uploads}
                onUploaded={fetchRequests}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
