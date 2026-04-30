/**
 * Central image and video URL registry — Erano v3
 * All placeholder URLs defined here.
 * When client supplies real assets, update only this file.
 */

export const IMAGES = {

  // ── Home page ─────────────────────────────────────
  HOME_HERO_VIDEO:
    "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  // Professional office b-roll — looping hero background

  HOME_HERO_POSTER:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop",
  // Fallback image if video fails to load

  HOME_WHYUS_IMAGE:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop",
  // Professional meeting — raw, no overlay

  HOME_STATS_BG:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&auto=format&fit=crop",
  // Modern office interior — used behind stats section

  // ── About page ────────────────────────────────────
  ABOUT_HERO_PHOTO:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
  // Confident professional businesswoman — raw portrait
  // REPLACE with real photo of Nana Afua Sarpong

  ABOUT_HERO:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",

  ABOUT_VALUES_BG:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80&auto=format&fit=crop",

  TEAM_NANA:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80&auto=format&fit=crop",
  // Professional African businesswoman — REPLACE with real photo

  TEAM_KWAME:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop",
  // Professional businessman — REPLACE with real photo

  TEAM_ABENA:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop",
  // Professional woman — REPLACE with real photo

  // ── Services page ─────────────────────────────────
  SERVICES_HERO_BG:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80&auto=format&fit=crop",
  // Financial professional at desk — dark

  SERVICES_ACCOUNTANCY:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&q=80&auto=format&fit=crop",
  // Accounting desk with documents

  SERVICES_BUSINESS:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=80&auto=format&fit=crop",
  // Business strategy meeting

  SERVICES_TAX:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&q=80&auto=format&fit=crop",
  // Tax documents and pen signing

  // ── Tools page ────────────────────────────────────
  TOOLS_HERO_BG:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80&auto=format&fit=crop",
  // Financial data on screen

  // ── Contact page ──────────────────────────────────
  CONTACT_SIDEBAR:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop",
  // Professional handshake — welcoming

  // ── Industries page ───────────────────────────────
  INDUSTRIES_HERO_BG:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&auto=format&fit=crop",
  // City skyline — wide, diverse

  // ── Resources page ────────────────────────────────
  RESOURCES_HERO_BG:
    "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1800&q=80&auto=format&fit=crop",
  // Person reading at desk

  RESOURCES_ARTICLE_1:
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80&auto=format&fit=crop",

  RESOURCES_ARTICLE_2:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop",

  RESOURCES_ARTICLE_3:
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80&auto=format&fit=crop",

} as const;

export type ImageKey = keyof typeof IMAGES;