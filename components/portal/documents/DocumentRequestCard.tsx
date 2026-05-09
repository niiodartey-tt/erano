"use client";

import { useState } from "react";
import { Upload, Download } from "lucide-react";

interface DocRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "pending" | "uploaded" | "reviewed";
  created_at: string;
}

interface DocUpload {
  id: string;
  file_path: string;
  uploaded_at: string;
}

interface Props {
  request: DocRequest;
  uploads: DocUpload[];
  onUploaded: () => void;
}

const STATUS = {
  pending:  { cls: "bg-amber-50 text-amber-700",  label: "Pending"  },
  uploaded: { cls: "bg-blue-50 text-blue-700",    label: "Uploaded" },
  reviewed: { cls: "bg-green-50 text-green-700",  label: "Reviewed" },
} as const;

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GH", { day: "2-digit", month: "short", year: "numeric" });
}

export default function DocumentRequestCard({ request, uploads, onUploaded }: Props) {
  const [file, setFile]       = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const badge        = STATUS[request.status];
  const latestUpload = uploads[0] ?? null;

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("requestId", request.id);
    try {
      const res = await fetch("/api/portal/documents/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        setError(body.error ?? "Upload failed. Please try again.");
        setLoading(false);
        return;
      }
      setLoading(false);
      onUploaded();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleDownload(filePath: string) {
    setError(null);
    try {
      const res = await fetch(`/api/portal/documents/download?path=${encodeURIComponent(filePath)}`);
      if (!res.ok) { setError("Could not generate download link."); return; }
      const { signedUrl } = await res.json() as { signedUrl: string };
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch {
      setError("Download failed. Please try again.");
    }
  }

  return (
    <article className="rounded-xl border border-line bg-white p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-off px-2 py-0.5 text-[11px] font-medium text-body">
            {request.category}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${badge.cls}`}>
            {badge.label}
          </span>
        </div>
        <span className="text-[11px] text-body">{fmtDate(request.created_at)}</span>
      </div>

      <h3 className="mb-1 text-sm font-semibold text-navy">{request.title}</h3>
      <p className="mb-4 text-sm text-body">{request.description}</p>

      {request.status === "pending" && (
        <div className="space-y-2">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-body file:mr-3 file:rounded file:border file:border-line file:bg-off file:px-3 file:py-1.5 file:text-sm"
            aria-label={`Upload document for: ${request.title}`}
          />
          {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex items-center gap-2 rounded bg-navy px-4 py-2 text-sm font-semibold text-gold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            {loading ? "Uploading..." : "Upload document"}
          </button>
        </div>
      )}

      {(request.status === "uploaded" || request.status === "reviewed") && latestUpload && (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-off px-3 py-2.5">
          <p className="truncate text-xs text-body">
            {latestUpload.file_path.split("/").pop()} &middot; {fmtDate(latestUpload.uploaded_at)}
          </p>
          <button
            onClick={() => handleDownload(latestUpload.file_path)}
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-navy transition-colors hover:text-gold"
            aria-label={`Download document for ${request.title}`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download
          </button>
        </div>
      )}
      {(request.status === "uploaded" || request.status === "reviewed") && error && (
        <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </article>
  );
}
