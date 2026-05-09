"use client";

import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentRequestForm } from "@/components/admin/clients/DocumentRequestForm";

interface DocUpload  { id: string; file_path: string; uploaded_at: string }
interface DocRequest { id: string; title: string; description: string; category: string; status: string; created_at: string; document_uploads: DocUpload[] }

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-800",
  fulfilled: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-800",
};

interface Props {
  clientId:      string;
  docRequests:   DocRequest[];
  onRequestCreated: () => void;
  onDownload:    (bucket: string, path: string) => void;
}

export function ClientDocumentsSection({ clientId, docRequests, onRequestCreated, onDownload }: Props) {
  const [showForm, setShowForm] = useState(false);

  function handleSuccess() {
    setShowForm(false);
    onRequestCreated();
  }

  return (
    <section className="bg-white rounded-xl border border-line p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-navy">Documents</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-line text-body rounded-lg hover:bg-off transition-colors"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Request Document
          </button>
        )}
      </div>

      {docRequests.length === 0 && !showForm ? (
        <p className="text-sm text-body/50">No document requests yet.</p>
      ) : (
        <div className="space-y-3">
          {docRequests.map((req) => (
            <div key={req.id} className="border border-line rounded-lg p-4">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                  <p className="text-sm font-medium text-navy">{req.title}</p>
                  <p className="text-xs text-body mt-0.5">{req.category} · {new Date(req.created_at).toLocaleDateString("en-GB")}</p>
                </div>
                <span className={cn("shrink-0 px-2 py-0.5 rounded-full text-xs font-medium capitalize", STATUS_COLORS[req.status] ?? "bg-gray-100 text-gray-800")}>
                  {req.status}
                </span>
              </div>
              <p className="text-xs text-body/70 mt-1">{req.description}</p>
              {req.document_uploads.length > 0 && (
                <div className="mt-2 space-y-1">
                  {req.document_uploads.map((upload) => (
                    <button
                      key={upload.id}
                      onClick={() => onDownload("document-uploads", upload.file_path)}
                      className="flex items-center gap-1.5 text-xs text-gold hover:underline"
                    >
                      <Download className="h-3 w-3" aria-hidden="true" />
                      {new Date(upload.uploaded_at).toLocaleDateString("en-GB")}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <DocumentRequestForm
          clientId={clientId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
