/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:          process.env.NEXT_PUBLIC_SITE_URL || "https://eranoconsulting.com",
  generateRobotsTxt: true,
  exclude:          ["/login", "/admin", "/portal", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/"          },
      { userAgent: "*", disallow: "/login"  },
      { userAgent: "*", disallow: "/admin"  },
      { userAgent: "*", disallow: "/portal" },
      { userAgent: "*", disallow: "/api"    },
    ],
  },
  changefreq: "weekly",
  priority:   0.7,
};