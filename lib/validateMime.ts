// SERVER SIDE ONLY — never import in client components
import { fileTypeFromBuffer } from "file-type";

export const ALLOWED_MIME_TYPES = {
  paymentProofs: [
    "image/jpeg",
    "image/png",
    "application/pdf",
  ],
  documentUploads: [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

export type UploadContext = keyof typeof ALLOWED_MIME_TYPES;

export class InvalidMimeTypeError extends Error {
  constructor(public readonly detectedType: string | undefined) {
    super(`Invalid file type: ${detectedType ?? "unknown"}`);
    this.name = "InvalidMimeTypeError";
  }
}

export async function validateMimeType(
  buffer: ArrayBuffer,
  context: UploadContext,
): Promise<string> {
  const type = await fileTypeFromBuffer(buffer);
  const allowed = ALLOWED_MIME_TYPES[context] as readonly string[];

  if (!type || !allowed.includes(type.mime)) {
    throw new InvalidMimeTypeError(type?.mime);
  }

  return type.mime;
}
