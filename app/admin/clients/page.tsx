"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ClientsTable, type Client } from "@/components/admin/clients/ClientsTable";
import { PaginationBar } from "@/components/admin/clients/PaginationBar";

const PAGE_SIZE = 20;

const STATE_OPTIONS = [
  { value: "",                       label: "All states" },
  { value: "pending",                label: "Pending" },
  { value: "awaiting_agreement",     label: "Awaiting Agreement" },
  { value: "awaiting_payment",       label: "Awaiting Payment" },
  { value: "awaiting_confirmation",  label: "Awaiting Confirmation" },
  { value: "active",                 label: "Active" },
  { value: "expired",                label: "Expired" },
];

export default function ClientsPage() {
  const searchParams   = useSearchParams();
  const initialState   = searchParams.get("state") ?? "";

  const [search,          setSearch]          = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [stateFilter,     setStateFilter]     = useState(initialState);
  const [page,            setPage]            = useState(0);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState<string | null>(null);
  const [clients,         setClients]         = useState<Client[]>([]);
  const [total,           setTotal]           = useState(0);

  // Debounce search — resets page to 0 atomically with the debounced value
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchClients = useCallback(async (q: string, state: string, p: number) => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ page: String(p) });
    if (state) params.set("state", state);
    if (q)     params.set("search", q);
    const res = await fetch(`/api/admin/clients?${params.toString()}`);
    if (!res.ok) { setError("Failed to load clients."); setLoading(false); return; }
    const json = await res.json() as { clients: Client[]; total: number };
    setClients(json.clients);
    setTotal(json.total);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchClients(debouncedSearch, stateFilter, page);
  }, [debouncedSearch, stateFilter, page, fetchClients]);

  function handleStateChange(val: string) {
    setStateFilter(val);
    setPage(0);
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <p className="text-sm text-red-400" role="alert">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or business..."
            aria-label="Search clients"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-white/10 rounded-lg bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 min-h-[44px]"
          />
        </div>
        <div className="relative">
          <select
            value={stateFilter}
            onChange={(e) => handleStateChange(e.target.value)}
            aria-label="Filter by account state"
            className="px-3 py-2.5 pr-9 text-sm border border-white/10 rounded-lg bg-white/5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 min-h-[44px] appearance-none w-full"
          >
            {STATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 12 12">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-navy rounded-xl border border-white/10 overflow-hidden">
        <ClientsTable clients={clients} loading={loading} />
        <PaginationBar
          page={page}
          total={total}
          pageSize={PAGE_SIZE}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      </div>
    </div>
  );
}
