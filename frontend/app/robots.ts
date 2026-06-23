import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // Prevents search engines from crawling your backend API routes
    },
    sitemap: "https://nikhilesh-attal-portfolio.vercel.app/sitemap.xml",
  };
}
