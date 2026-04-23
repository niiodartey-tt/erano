// ── Navigation ───────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ── Services ─────────────────────────────────────────────

export type ServiceCategory =
  | "tax"
  | "audit"
  | "accounting"
  | "consultancy";

export interface Service {
  id: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
}

// ── Team ─────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  certifications: string[];
  initials: string;
  imageUrl?: string;
}

// ── Testimonial ──────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  sector: string;
}

// ── Case study ───────────────────────────────────────────

export interface CaseStudy {
  id: string;
  sector: string;
  challenge: string;
  approach: string;
  outcome: string;
  stat?: string;
  statLabel?: string;
}

// ── Resource / Blog ──────────────────────────────────────

export interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ServiceCategory;
  author: string;
  publishedAt: string;
  readingTime?: number;
}

// ── Contact form ─────────────────────────────────────────

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  service: ServiceCategory | "other" | "";
  message: string;
}

// ── Stats ────────────────────────────────────────────────

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

// ── API responses ────────────────────────────────────────

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
