"use client";

import { useState } from "react";

const CATEGORIES = ["Financial", "Legal", "Compliance", "Tax", "Other"] as const;

interface Props {
  clientId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DocumentRequestForm({ clientId, onSuccess, onCancel }: Props) {
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [category,    setCategory]    = useState<string>("");
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/documents/request", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ client_id: clientId, title: title.trim(), description: description.trim(), category }),
    });
    setLoading(false);

    if (!res.ok) {
      const json = await res.json() as { error?: string };
      setError(json.error ?? "Failed to send request.");
      return;
    }

    onSuccess();
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="mt-4 p-4 border border-line rounded-xl bg-off space-y-3">
      <h4 className="text-sm font-semibold text-navy">New Document Request</h4>

      <div>
        <label htmlFor="req-title" className="block text-xs font-medium text-body mb-1">Title</label>
        <input
          id="req-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Audited financial statements 2023"
          className="w-full px-3 py-2 text-sm border border-line rounded-lg bg-white text-navy placeholder:text-body/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
        />
      </div>

      <div>
        <label htmlFor="req-category" className="block text-xs font-medium text-body mb-1">Category</label>
        <select
          id="req-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="admin-select w-full px-3 py-2 text-sm border border-line rounded-lg bg-white text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="req-description" className="block text-xs font-medium text-body mb-1">Instructions</label>
        <textarea
          id="req-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="What exactly is needed and in what format..."
          className="w-full px-3 py-2 text-sm border border-line rounded-lg bg-white text-navy placeholder:text-body/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/20 resize-none"
        />
      </div>

      {error && <p className="text-xs text-red-600" role="alert">{error}</p>}

      <div className="flex gap-2 justify-end pt-1">
        <button type="button" onClick={onCancel} disabled={loading} className="px-3 py-1.5 text-sm text-body border border-line rounded-lg hover:bg-white transition-colors disabled:opacity-50">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-3 py-1.5 text-sm font-medium bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50">
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>
    </form>
  );
}
