"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ClientProfileHeader } from "@/components/admin/clients/ClientProfileHeader";
import { ClientInfoSections } from "@/components/admin/clients/ClientInfoSections";
import { ClientPaymentSection } from "@/components/admin/clients/ClientPaymentSection";
import { ClientDocumentsSection } from "@/components/admin/clients/ClientDocumentsSection";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { PackageUpgradeModal } from "@/components/admin/clients/PackageUpgradeModal";

interface UserRow  { id: string; email: string; account_state: string; created_at: string }
interface Package  { name: string; description: string; price_ghs: number | null }
interface Invoice  { invoice_number: string; final_price_ghs: number; status: string; generated_at: string; file_path: string | null; signed_url: string | null }
interface Agreement { accepted_at: string; version_number: number }
interface Timer    { expires_at: string; is_active: boolean }
interface Proof    { id: string; amount_paid: number; currency: string; transaction_reference: string; status: string; uploaded_at: string; file_path: string | null }
interface DocUpload { id: string; file_path: string; uploaded_at: string }
interface DocRequest { id: string; title: string; description: string; category: string; status: string; created_at: string; document_uploads: DocUpload[] }
interface ClientData {
  user: UserRow; profile: Record<string, unknown>; package: Package | null;
  invoice: Invoice | null; agreement: Agreement | null; timer: Timer | null;
  proofs: Proof[]; doc_requests: DocRequest[]; audit_log: { id: string; action: string; actor_role: string; created_at: string }[];
}

type Modal = { type: "confirm" | "reject"; proofId: string } | null;

export default function ClientProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [data,         setData]         = useState<ClientData | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [modal,        setModal]        = useState<Modal>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [generating,   setGenerating]   = useState(false);
  const [customPrice,  setCustomPrice]  = useState("");
  const [upgradeModal, setUpgradeModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/clients/${id}`);
    if (!res.ok) { setError("Failed to load client."); setLoading(false); return; }
    setData(await res.json() as ClientData);
    setLoading(false);
  }, [id]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  async function handleModalConfirm(reason?: string) {
    if (!modal || !data) return;
    setModalLoading(true);
    const isConfirm = modal.type === "confirm";
    const url  = isConfirm ? "/api/admin/payments/confirm" : "/api/admin/payments/reject";
    const body = isConfirm
      ? { client_id: data.user.id, proof_id: modal.proofId }
      : { client_id: data.user.id, proof_id: modal.proofId, reason: reason ?? "" };
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setModalLoading(false);
    setModal(null);
    void fetchData();
  }

  async function handleGenerateInvoice() {
    if (!data) return;
    setGenerating(true);
    const reqBody: Record<string, unknown> = { client_id: data.user.id };
    if (data.package?.name === "Custom") reqBody.custom_price_ghs = parseFloat(customPrice);
    await fetch("/api/admin/invoices/generate", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reqBody),
    });
    setGenerating(false);
    void fetchData();
  }

  async function handleDownload(bucket: string, path: string) {
    const res = await fetch(`/api/admin/signed-url?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}`);
    if (!res.ok) return;
    const { url } = await res.json() as { url: string };
    window.open(url, "_blank");
  }

  if (loading) return <div className="p-4 md:p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 rounded-xl bg-white border border-line animate-pulse" />)}</div>;
  if (error || !data) return <div className="p-4 md:p-6"><p className="text-sm text-red-600" role="alert">{error ?? "Client not found."}</p></div>;

  const pendingProof = data.proofs.find(p => p.status === "pending") ?? null;
  const profile = data.profile;
  const isCustomPackage = data.package?.name === "Custom";

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-4">
      <Link href="/admin/clients" className="inline-flex items-center gap-1 text-sm text-body hover:text-navy transition-colors mb-2">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" /> All clients
      </Link>

      <ClientProfileHeader
        email={data.user.email} accountState={data.user.account_state} createdAt={data.user.created_at}
        contactName={(profile.contact_name as string) || data.user.email}
        legalName={(profile.legal_name as string) || "—"}
        pendingProofId={pendingProof?.id ?? null}
        onConfirmPayment={() => pendingProof && setModal({ type: "confirm", proofId: pendingProof.id })}
        onRejectPayment={() => pendingProof && setModal({ type: "reject", proofId: pendingProof.id })}
        onGenerateInvoice={() => void handleGenerateInvoice()}
        generatingInvoice={generating}
        onInitiateUpgrade={() => setUpgradeModal(true)}
      />

      {data.user.account_state === "pending" && isCustomPackage && (
        <div className="bg-white rounded-xl border border-line p-5 md:p-6">
          <label className="ec-label" htmlFor="custom-price">Custom package price (GH₵)</label>
          <input id="custom-price" type="number" min="1" className="ec-input mt-1" placeholder="0.00" value={customPrice} onChange={e => setCustomPrice(e.target.value)} />
        </div>
      )}

      <ClientInfoSections profile={profile} pkg={data.package} invoice={data.invoice} agreement={data.agreement} />

      <ClientPaymentSection
        timer={data.timer} proofs={data.proofs}
        onConfirmPayment={(proofId) => setModal({ type: "confirm", proofId })}
        onRejectPayment={(proofId) => setModal({ type: "reject", proofId })}
        onDownload={handleDownload}
      />

      <ClientDocumentsSection
        clientId={data.user.id} docRequests={data.doc_requests}
        onRequestCreated={fetchData} onDownload={handleDownload}
      />

      {upgradeModal && (
        <PackageUpgradeModal
          clientId={data.user.id}
          onSuccess={() => { setUpgradeModal(false); void fetchData(); }}
          onClose={() => setUpgradeModal(false)}
        />
      )}

      {modal && (
        <ConfirmModal
          title={modal.type === "confirm" ? "Confirm payment" : "Reject payment"}
          body={modal.type === "confirm" ? "Mark this payment as approved and activate the client account?" : "The client will be notified and asked to re-upload a valid proof."}
          confirmLabel={modal.type === "confirm" ? "Confirm" : "Reject"}
          loading={modalLoading} withReason={modal.type === "reject"} destructive={modal.type === "reject"}
          onConfirm={(reason) => void handleModalConfirm(reason)} onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
