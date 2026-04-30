/**
 * Central image URL registry.
 * All Unsplash placeholder images defined here.
 * When client supplies real photos, only update this file.
 * Replace values with Cloudinary URLs after client upload.
 */

export const IMAGES = {

  // ── Home page ─────────────────────────────────────
  HOME_HERO_BG:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop",
  // Modern glass skyscraper business district

  HOME_STATS_CARD:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
  // African business meeting professionals

  HOME_WHYUS_BG:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
  // Modern office interior architectural

  // ── About page ────────────────────────────────────
  ABOUT_HERO:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
  // Confident professional businesswoman in office

  TEAM_NANA:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80&auto=format&fit=crop",
  // Professional African businesswoman portrait — REPLACE with real photo

  TEAM_KWAME:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop",
  // Professional businessman portrait — REPLACE with real photo

  TEAM_ABENA:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop",
  // Professional woman portrait — REPLACE with real photo

  ABOUT_VALUES_BG:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80&auto=format&fit=crop",
  // Modern office dark background for values section

  // ── Services page ─────────────────────────────────
  SERVICES_HERO_BG:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80&auto=format&fit=crop",
  // Financial professional working at desk

  SERVICES_ACCOUNTANCY:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
  // Accounting desk with documents and laptop

  SERVICES_BUSINESS:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop",
  // Business strategy meeting collaborative

  SERVICES_TAX:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop",
  // Tax documents signing precise

  // ── Tools page ────────────────────────────────────
  TOOLS_HERO_BG:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80&auto=format&fit=crop",
  // Financial data analytics on screen

  // ── Contact page ──────────────────────────────────
  CONTACT_SIDEBAR:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop",
  // Welcoming professional handshake

  // ── Industries page ───────────────────────────────
  INDUSTRIES_HERO_BG:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&auto=format&fit=crop",
  // City skyline wide shot diverse sectors

  // ── Resources page ────────────────────────────────
  RESOURCES_HERO_BG:
    "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1800&q=80&auto=format&fit=crop",
  // Person reading notes at desk intellectual

} as const;

export type ImageKey = keyof typeof IMAGES;
