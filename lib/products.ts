import productsData from "@/data/products.json";

/* ─── Types ─── */
export interface ProductImage {
  hero: string | null;
  gallery: string[];
  dimensions: string | null;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  finishes: string[];
  sizes: string[];
  images: ProductImage;
  pdf: string | null;
  featured: boolean;
  sortOrder: number;
}

export interface Category {
  slug: string;
  name: string;
  headline: string;
  description: string;
  heroImage: string;
  sortOrder: number;
}

export interface CompanyInfo {
  name: string;
  founded: number;
  phone: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekday: string;
    friday: string;
  };
  history: string;
  social?: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
  };
}

/* ─── Data accessors ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const raw = productsData as any;
const data = raw as {
  meta: { version: string; updated: string; imageBasePath: string; pdfBasePath: string };
  categories: Category[];
  products: Product[];
  company: CompanyInfo;
  sizeChart: Record<string, { min: string; recommended: string }>;
};

export const meta = data.meta;
export const categories: Category[] = data.categories;
export const products: Product[] = data.products;
export const company: CompanyInfo = data.company;
export const sizeChart = data.sizeChart;

/* ─── Image helpers ─── */
export const IMAGEKIT_BASE = meta.imageBasePath;

export function img(relativePath: string | null): string {
  if (!relativePath) return `${IMAGEKIT_BASE}/placeholder.jpg`;
  return `${IMAGEKIT_BASE}/${relativePath}`;
}

/** Convert a local /images/products/... path to its ImageKit equivalent */
export function ik(localPath: string): string {
  return localPath.replace(/^\/images\/products/, IMAGEKIT_BASE);
}

export function pdf(filename: string | null): string {
  if (!filename) return "#";
  return `${meta.pdfBasePath}/${filename}`;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products
    .filter((p) => p.category === categorySlug)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCrossCategoryProducts(currentCategory: string, limit = 4): Product[] {
  return products
    .filter((p) => p.category !== currentCategory && p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, limit);
}

/**
 * Find products in OTHER categories that share a name word with the given product.
 * e.g., "The Skylar" pool table matches "Skylar Game Room Furniture" and "Skylar Shuffleboard".
 */
export function getCollectionMatches(productName: string, currentCategory: string): Product[] {
  const nameWords = productName
    .replace(/^The\s+/i, "")
    .replace(/\s+(Pool Table|Shuffleboard|Game Room Furniture|Cue Rack)s?$/i, "")
    .trim()
    .toLowerCase()
    .split(/\s+/);

  if (nameWords.length === 0) return [];

  return products.filter((p) => {
    if (p.category === currentCategory) return false;
    const pNameLower = p.name.toLowerCase();
    return nameWords.some((word) => word.length >= 3 && pNameLower.includes(word));
  });
}

/**
 * Get all unique sizes across products in a category.
 */
export function getAllCategorySizes(categorySlug: string): string[] {
  const sizes = new Set<string>();
  products
    .filter((p) => p.category === categorySlug)
    .forEach((p) => p.sizes.forEach((s) => sizes.add(s)));
  return Array.from(sizes);
}

/**
 * Check if a product is convertible (has dining top or convertible features).
 */
export function isConvertible(product: Product): boolean {
  return product.features.some((f) =>
    /dining top|convertible/i.test(f)
  );
}

/* Navigation data */
export const navLinks = [
  {
    label: "Pool Tables",
    href: "/products/pool-tables",
    children: getProductsByCategory("pool-tables").map((p) => ({
      label: p.name,
      href: `/products/pool-tables/${p.slug}`,
    })),
  },
  {
    label: "Shuffleboards",
    href: "/products/shuffleboards",
    children: getProductsByCategory("shuffleboards").map((p) => ({
      label: p.name,
      href: `/products/shuffleboards/${p.slug}`,
    })),
  },
  {
    label: "Furniture",
    href: "/products/game-room-furniture",
    children: getProductsByCategory("game-room-furniture").map((p) => ({
      label: p.name,
      href: `/products/game-room-furniture/${p.slug}`,
    })),
  },
  {
    label: "Cue Racks",
    href: "/products/cue-racks",
  },
  {
    label: "Accessories",
    href: "/products/accessories",
    children: getProductsByCategory("accessories").map((p) => ({
      label: p.name,
      href: `/products/accessories/${p.slug}`,
    })),
  },
  {
    label: "About",
    href: "/about",
  },
];

export const secondaryNavLinks = [
  { label: "Catalogs", href: "/catalogs" },
  { label: "Contact", href: "/contact-us" },
];
