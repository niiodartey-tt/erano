/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com"   },
      { protocol: "https", hostname: "videos.pexels.com"   },
    ],
  },
  async redirects() {
    return [
      { source: "/legal/privacy", destination: "/privacy", permanent: true },
      { source: "/legal/terms",   destination: "/terms",   permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY"                          },
          { key: "X-Content-Type-Options",     value: "nosniff"                       },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control",     value: "on"                            },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' va.vercel-scripts.com *.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: *.supabase.co *.unsplash.com *.pexels.com res.cloudinary.com",
              "connect-src 'self' *.supabase.co wss://*.supabase.co va.vercel-scripts.com *.vercel-scripts.com vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;