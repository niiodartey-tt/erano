import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:   process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:      process.env.CLOUDINARY_API_KEY!,
  api_secret:   process.env.CLOUDINARY_API_SECRET!,
  secure:       true,
});

/**
 * Upload a file buffer or base64 string to Cloudinary.
 * Returns the secure URL and public ID.
 *
 * @param file    - base64 data URI or file path
 * @param folder  - Cloudinary folder (e.g. "erano/documents/client-id")
 * @param options - any extra Cloudinary upload options
 */
export async function uploadFile(
  file: string,
  folder: string,
  options: Record<string, unknown> = {}
) {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
    ...options,
  });

  return {
    url:       result.secure_url,
    publicId:  result.public_id,
    format:    result.format,
    bytes:     result.bytes,
    createdAt: result.created_at,
  };
}

/**
 * Delete a file from Cloudinary by its public ID.
 */
export async function deleteFile(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
