"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

interface Package {
  id:          string;
  name:        string;
  description: string;
  price_ghs:   number | null;
}

interface Props {
  clientId:  string;
  onSuccess: () => void;
  onClose:   () => void;
}

function fmtPrice(p: number | null): string {
  if (p === null) return "Custom pricing";
  return "GH₵ " + Number(p).toLocaleString("en-GH", { minimumFractionDigits: 2 });
}

export function PackageUpgradeModal({ clientId, onSuccess, onClose }: Props) {
  const [packages,     setPackages]     = useState<Package[]>([]);
  const [selectedId,   setSelectedId]   = useState("");
  const [customPrice,  setCustomPrice]  = useState("");
  const [loading,      setLoading]      = useState(false);
  const [fetchError,   setFetchError]   = useState(false);
  const [submitError,  setSubmitError]  = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = packages.find(p => p.id === selectedId) ?? null;

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/packages");
      if (!res.ok) { setFetchError(true); return; }
      const data = await res.json() as { packages: Package[] };
      setPackages(data.packages);
      if (data.packages.length > 0) setSelectedId(data.packages[0].id);
    })();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Tab" && containerRef.current) {
      const focusable = Array.from(containerRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), select, input"));
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  async function handleConfirm() {
    if (!selectedId || loading) return;
    if (selected?.name === "Custom" && !customPrice) { setSubmitError("Enter a price for the Custom package."); return; }
    setLoading(true); setSubmitError(null);

    const reqBody: Record<string, unknown> = { client_id: clientId, package_id: selectedId };
    if (selected?.name === "Custom") reqBody.custom_price_ghs = parseFloat(customPrice);

    const res = await fetch("/api/admin/invoices/upgrade", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reqBody),
    });
    const json = await res.json() as { error?: string };
    if (!res.ok) { setSubmitError(json.error ?? "Something went wrong."); setLoading(false); return; }
    setLoading(false);
    onSuccess();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="upgrade-modal-title">
      <div ref={containerRef} className="bg-navy rounded-xl border border-white/10 shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 id="upgrade-modal-title" className="text-lg font-bold text-white">Initiate Package Upgrade</h2>
          <button onClick={onClose} className="p-1 text-white/60 hover:text-white transition-colors" aria-label="Close">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {fetchError && <p className="text-sm text-red-400">Failed to load packages.</p>}

        {!fetchError && (
          <div className="space-y-4">
            <div>
              <label className="block text-[0.8125rem] font-medium text-white/60 mb-2" htmlFor="upgrade-package">New package</label>
              <select id="upgrade-package" className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 appearance-none min-h-[44px]" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                {packages.map(p => (
                  <option key={p.id} value={p.id}>{p.name} — {fmtPrice(p.price_ghs)}</option>
                ))}
              </select>
            </div>

            {selected && <p className="text-sm text-white/60">{selected.description}</p>}

            {selected?.name === "Custom" && (
              <div>
                <label className="block text-[0.8125rem] font-medium text-white/60 mb-2" htmlFor="upgrade-custom-price">Custom price (GH₵)</label>
                <input id="upgrade-custom-price" type="number" min="1" className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 min-h-[44px]" placeholder="0.00"
                  value={customPrice} onChange={e => setCustomPrice(e.target.value)} />
              </div>
            )}

            {submitError && <p className="text-sm text-red-400" role="alert">{submitError}</p>}

            <p className="text-xs text-white/40">A new invoice will be generated and the client will be asked to accept a new service agreement.</p>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium border border-white/10 text-white/60 rounded-lg hover:bg-white/5 transition-colors">Cancel</button>
          <button onClick={() => void handleConfirm()} disabled={loading || !selectedId || fetchError}
            className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40">
            {loading ? "Generating…" : "Generate upgrade invoice"}
          </button>
        </div>
      </div>
    </div>
  );
}
