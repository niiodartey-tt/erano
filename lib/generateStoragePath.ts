// SERVER SIDE ONLY — never import in client components
import { randomUUID } from "crypto";

export function generateInvoicePath(clientId: string, invoiceNumber: string): string {
  const uuid = randomUUID();
  return `invoices/${clientId}/${uuid}-${invoiceNumber}.pdf`;
}

export function generatePaymentProofPath(clientId: string, filename: string): string {
  const uuid = randomUUID();
  const ext = filename.split(".").pop() ?? "bin";
  return `payment-proofs/${clientId}/${uuid}.${ext}`;
}

export function generateDocumentUploadPath(
  clientId: string,
  requestId: string,
  filename: string,
): string {
  const uuid = randomUUID();
  const ext = filename.split(".").pop() ?? "bin";
  return `document-uploads/${clientId}/${requestId}/${uuid}.${ext}`;
}
