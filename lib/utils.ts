import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely — resolves conflicts correctly.
 * Use this everywhere instead of plain template literals.
 * e.g. cn("px-4 py-2", isLarge && "px-6", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with commas for display.
 * e.g. formatNumber(10000) => "10,000"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-GH");
}

/**
 * Format currency in GHS.
 * e.g. formatCurrency(5000) => "GHS 5,000"
 */
export function formatCurrency(amount: number, currency = "GHS"): string {
  return `${currency} ${formatNumber(amount)}`;
}

/**
 * Truncate a string to a max length with ellipsis.
 */
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

/**
 * Generate a slug from a string.
 * e.g. "Tax Advisory Ghana" => "tax-advisory-ghana"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
