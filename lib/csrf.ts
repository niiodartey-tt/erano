// SERVER SIDE ONLY — never import this file in client components
export function verifyCsrfOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const isProduction = process.env.NODE_ENV === "production" && !siteUrl.includes("vercel.app");

  if (!isProduction) return;

  if (!origin.startsWith(siteUrl)) {
    throw new Error("CSRF_ORIGIN_MISMATCH");
  }
}
