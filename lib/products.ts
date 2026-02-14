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

/* ─── Helpers ─── */
export function img(relativePath: string | null): string {
  if (!relativePath) return "/images/products/placeholder.jpg";
  return `${meta.imageBasePath}/${relativePath}`;
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
    label: "About",
    href: "/about",
  },
];

export const secondaryNavLinks = [
  { label: "Catalogs", href: "/catalogs" },
  { label: "Contact", href: "/contact-us" },
];
