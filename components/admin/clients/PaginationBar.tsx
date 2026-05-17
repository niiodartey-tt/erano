"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  total: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
}

export function PaginationBar({ page, total, pageSize, onPrev, onNext }: Props) {
  const from  = total === 0 ? 0 : page * pageSize + 1;
  const to    = Math.min((page + 1) * pageSize, total);
  const hasPrev = page > 0;
  const hasNext = to < total;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
      <p className="text-xs text-white/40">
        {total === 0
          ? "No results"
          : `Showing ${from}–${to} of ${total} client${total === 1 ? "" : "s"}`}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg border text-xs transition-colors",
            hasPrev
              ? "border-white/10 text-white hover:bg-white/10"
              : "border-white/10 text-white/20 cursor-not-allowed",
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg border text-xs transition-colors",
            hasNext
              ? "border-white/10 text-white hover:bg-white/10"
              : "border-white/10 text-white/20 cursor-not-allowed",
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
