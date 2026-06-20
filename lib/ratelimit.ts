// SERVER SIDE ONLY — never import this file in client components
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL) throw new Error("Missing UPSTASH_REDIS_REST_URL");
if (!process.env.UPSTASH_REDIS_REST_TOKEN) throw new Error("Missing UPSTASH_REDIS_REST_TOKEN");

// General API rate limiter — 20 requests per 10 seconds per IP
export const apiRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "10 s"),
  analytics: false,
  prefix: "erano:api",
});

// Onboarding form rate limiter — 5 submissions per hour per IP
export const onboardingRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 m"),
  analytics: false,
  prefix: "erano:onboarding",
});

// Contact form rate limiter — 5 submissions per hour per IP
export const contactRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 m"),
  analytics: false,
  prefix: "erano:contact",
});

// Agreement acceptance — 3 per hour per client
export const agreementRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: false,
  prefix: "erano:agreement",
});

// Password flag clear — 10 per hour per user
export const passwordFlagRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: false,
  prefix: "erano:pwflag",
});

// Admin payment confirm/reject — 30 per hour per admin
export const adminPaymentRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "1 h"),
  analytics: false,
  prefix: "erano:adminpayment",
});

// Admin invoice generate/upgrade — 10 per hour per admin
export const adminInvoiceRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: false,
  prefix: "erano:admininvoice",
});

// Admin client reactivate — 20 per hour per admin
export const adminReactivateRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 h"),
  analytics: false,
  prefix: "erano:adminreactivate",
});

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
