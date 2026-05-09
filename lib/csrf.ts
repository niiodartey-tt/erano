// SERVER SIDE ONLY — never import this file in client components
export function verifyCsrfOrigin(request: Request): void {
  const origin  = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (origin && !origin.startsWith(siteUrl)) {
    throw new Error("CSRF_ORIGIN_MISMATCH");
  }
}
