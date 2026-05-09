"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export interface ConfirmModalProps {
  title: string;
  body: ReactNode;
  confirmLabel: string;
  loading: boolean;
  onConfirm: (reason?: string) => void;
  onClose: () => void;
  withReason?: boolean;
  destructive?: boolean;
}

export function ConfirmModal({
  title, body, confirmLabel, loading, onConfirm, onClose, withReason, destructive,
}: ConfirmModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reasonRef    = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const first = containerRef.current?.querySelector<HTMLButtonElement>("button:not([disabled])");
    first?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), textarea"
        ) ?? [],
      );
      if (!focusable.length) return;
      const idx = focusable.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? focusable[(idx - 1 + focusable.length) % focusable.length]
        : focusable[(idx + 1) % focusable.length];
      next?.focus();
      e.preventDefault();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={containerRef} className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 id="modal-title" className="text-base font-semibold text-navy">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-body/50 hover:text-body transition-colors shrink-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="text-sm text-body mb-4">{body}</div>

        {withReason && (
          <textarea
            ref={reasonRef}
            placeholder="Reason for rejection..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-line rounded-lg text-navy placeholder:text-body/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/20 mb-4 resize-none"
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-body border border-line rounded-lg hover:bg-off transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reasonRef.current?.value.trim())}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
              destructive
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-navy text-white hover:bg-navy/90"
            }`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
