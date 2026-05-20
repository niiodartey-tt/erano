"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AdminSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
}: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder ?? "";

  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg border bg-white/5 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:border-gold/40",
          open ? "ring-2 ring-gold/40 border-gold/40" : "border-white/10",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <span className={selectedLabel ? "text-white" : "text-white/40"}>
          {selectedLabel || placeholder || "Select…"}
        </span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 text-white/40 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-[#0d1b2e] border border-white/10 rounded-lg shadow-lg overflow-hidden"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                "px-3 py-2 text-sm cursor-pointer hover:bg-white/10 transition-colors",
                value === opt.value ? "text-gold" : "text-white",
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
