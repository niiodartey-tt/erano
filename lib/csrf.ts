// SERVER SIDE ONLY — never import this file in client components
export function verifyCsrfOrigin(request: Request): void {
  const method = request.method.toUpperCase();
  if (!["POST", "PATCH", "PUT", "DELETE"].includes(method)) return;

  const origin  = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (!origin) {
    const referer = request.headers.get("referer") ?? "";
    if (referer && !referer.startsWith(siteUrl)) {
      throw new Error("CSRF_ORIGIN_MISMATCH");
    }
    return;
  }

  const normalizedSite   = siteUrl.replace(/\/$/, "");
  const normalizedOrigin = origin.replace(/\/$/, "");

  if (normalizedOrigin !== normalizedSite) {
    throw new Error("CSRF_ORIGIN_MISMATCH");
  }
}
