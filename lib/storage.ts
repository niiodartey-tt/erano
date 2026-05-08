import { createServerClient } from "@/lib/supabase-server";

export const SIGNED_URL_EXPIRY = {
  paymentProofs:    60 * 15,   // 15 minutes
  documentUploads:  60 * 30,   // 30 minutes
  invoices:         60 * 60,   // 1 hour
} as const;

export async function generateSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number,
): Promise<string> {
  const supabase = createServerClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) throw new Error(`Failed to generate signed URL: ${error.message}`);

  return data.signedUrl;
}

export async function getPaymentProofUrl(path: string): Promise<string> {
  return generateSignedUrl("payment-proofs", path, SIGNED_URL_EXPIRY.paymentProofs);
}

export async function getDocumentUploadUrl(path: string): Promise<string> {
  return generateSignedUrl("document-uploads", path, SIGNED_URL_EXPIRY.documentUploads);
}

export async function getInvoiceUrl(path: string): Promise<string> {
  return generateSignedUrl("invoices", path, SIGNED_URL_EXPIRY.invoices);
}

export async function uploadFile(
  bucket: string,
  path: string,
  file: Buffer | Blob,
  contentType: string,
): Promise<string> {
  const supabase = createServerClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType, upsert: false });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  return data.path;
}
