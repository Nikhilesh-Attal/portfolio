import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Use an array to list multiple paths
      disallow: ["/api/", "/admin/", "/login"],
    },
    sitemap: "https://nikhilesh-attal-portfolio.vercel.app/sitemap.xml",
  };
}