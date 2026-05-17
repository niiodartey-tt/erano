// SERVER SIDE ONLY — never import this file in client components
export function verifyCsrfOrigin(request: Request): void {
  const method = request.method.toUpperCase();
  if (!["POST", "PATCH", "PUT", "DELETE"].includes(method)) return;

  const origin  = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (!origin) {
    const referer = request.headers.get("referer") ?? "";
    const allowedPrefixes = [siteUrl, "https://erano.vercel.app"].filter(Boolean);
    if (referer && !allowedPrefixes.some((prefix) => referer.startsWith(prefix))) {
      throw new Error("CSRF_ORIGIN_MISMATCH");
    }
    return;
  }

  const normalizedOrigin = origin.replace(/\/$/, "");

  const allowedOrigins = [
    siteUrl.replace(/\/$/, ""),
    "https://erano.vercel.app",
  ].filter(Boolean);

  if (!allowedOrigins.includes(normalizedOrigin)) {
    throw new Error("CSRF_ORIGIN_MISMATCH");
  }
}
