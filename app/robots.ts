import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dealer-portal/"],
      },
    ],
    sitemap: "https://clbailey.com/sitemap.xml",
  };
}
