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
      <div ref={containerRef} className="w-full max-w-md bg-navy rounded-xl border border-white/10 shadow-xl p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 id="modal-title" className="text-base font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-white/40 hover:text-white/60 transition-colors shrink-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="text-sm text-white/60 mb-4">{body}</div>

        {withReason && (
          <textarea
            ref={reasonRef}
            placeholder="Reason for rejection..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 mb-4 resize-none"
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reasonRef.current?.value.trim())}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
              destructive
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gold text-navy hover:opacity-90"
            }`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
