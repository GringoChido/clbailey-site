import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/products";

const BASE_URL = "https://clbailey.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"];

  /* ─── Static pages ─── */
  const staticPages = [
    "",
    "/products",
    "/about",
    "/contact-us",
    "/catalogs",
    "/care-guide",
    "/lifetime-guarantee",
    "/room-size",
    "/dealer",
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  /* ─── Category pages ─── */
  const categoryEntries = locales.flatMap((locale) =>
    categories.map((cat) => ({
      url: `${BASE_URL}/${locale}/products/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  /* ─── Product pages ─── */
  const productEntries = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${BASE_URL}/${locale}/products/${product.category}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
