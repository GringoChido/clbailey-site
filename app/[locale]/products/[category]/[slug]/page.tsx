import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  products,
  getProduct,
  getCategory,
  getProductsByCategory,
  img,
  pdf,
} from "@/lib/products";
import LeadModal from "@/components/ui/LeadModal";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, category } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  const cat = getCategory(category);
  const title = `${product.name} ${cat?.name || ""} — C.L. Bailey & Co.`;

  return {
    title,
    description: product.description,
    openGraph: {
      title,
      description: product.tagline,
      type: "website",
      images: product.images.hero
        ? [
            {
              url: `/images/products/${product.images.hero}`,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.tagline,
      images: product.images.hero
        ? [`/images/products/${product.images.hero}`]
        : undefined,
    },
    alternates: {
      canonical: `https://clbailey.com/${locale}/products/${category}/${slug}`,
      languages: {
        en: `https://clbailey.com/en/products/${category}/${slug}`,
        es: `https://clbailey.com/es/products/${category}/${slug}`,
      },
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, category, slug } = await params;
  const product = getProduct(slug);
  const cat = getCategory(category);

  if (!product || !cat || product.category !== category) {
    notFound();
  }

  const t = await getTranslations();

  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  /* ─── JSON-LD: Product + BreadcrumbList ─── */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.hero
      ? `https://clbailey.com/images/products/${product.images.hero}`
      : undefined,
    brand: {
      "@type": "Brand",
      name: "C.L. Bailey & Co.",
    },
    manufacturer: {
      "@type": "Organization",
      name: "C.L. Bailey & Co.",
    },
    category: cat.name,
    material: "Solid Hardwood",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://clbailey.com/${locale}/products/${category}/${slug}`,
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "C.L. Bailey & Co.",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("common.products"),
        item: `https://clbailey.com/${locale}/products`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.name,
        item: `https://clbailey.com/${locale}/products/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://clbailey.com/${locale}/products/${category}/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />

      <div className="pt-28 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <ScrollReveal>
            <nav
              className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/products" className="hover:text-gray-900 transition-colors">
                {t("common.products")}
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/products/${category}`}
                className="hover:text-gray-900 transition-colors"
              >
                {cat.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-600">{product.name}</span>
            </nav>
          </ScrollReveal>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Image */}
            <ScrollReveal>
              <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={img(product.images.hero)}
                  alt={`${product.name} — ${product.tagline}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal delay={1} className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                {cat.name}
              </p>
              <h1 className="text-3xl lg:text-4xl font-medium mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 mb-2">
                {product.tagline}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-gold mb-4">
                {t("common.pricingLabel")}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              {/* Sizes & Finishes */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                      {t("common.sizes")}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {product.sizes.join(", ")}
                    </p>
                  </div>
                )}
                {product.finishes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                      {t("common.finishes")}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {product.finishes.join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    {t("common.features")}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-sm text-gray-600"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs — Desktop */}
              <div className="hidden lg:flex flex-wrap gap-3">
                {product.pdf && (
                  <LeadModal
                    productName={product.name}
                    pdfUrl={pdf(product.pdf)}
                  >
                    <button className="btn-primary">
                      {t("common.downloadSpecSheet")}
                    </button>
                  </LeadModal>
                )}
                <Link
                  href="/dealer"
                  className="btn-outline"
                >
                  {t("nav.findDealer")}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Gallery */}
          {product.images.gallery.length > 0 && (
            <ScrollReveal className="mb-20">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {t("common.gallery")}
              </h2>
              <div className="h-px bg-gray-200 mb-8" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {product.images.gallery.map((imgPath, i) => (
                  <div
                    key={imgPath}
                    className="relative aspect-square overflow-hidden bg-gray-100 group"
                  >
                    <Image
                      src={img(imgPath)}
                      alt={`${product.name} detail ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Dimensions */}
          {product.images.dimensions && (
            <ScrollReveal className="mb-20">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {t("common.dimensions")}
              </h2>
              <div className="h-px bg-gray-200 mb-8" />
              <div className="max-w-3xl">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <Image
                    src={img(product.images.dimensions)}
                    alt={`${product.name} dimensions`}
                    fill
                    className="object-contain"
                    sizes="800px"
                  />
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <ScrollReveal>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {t("products.moreCategoryName", { categoryName: cat.name })}
              </h2>
              <div className="h-px bg-gray-200 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.slug} product={rp} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        <Link
          href="/dealer"
          className="flex-1 text-center btn-primary"
        >
          {t("common.contactDealer")}
        </Link>
        {product.pdf && (
          <LeadModal
            productName={product.name}
            pdfUrl={pdf(product.pdf)}
          >
            <button className="flex-1 text-center btn-outline">
              {t("common.specSheet")}
            </button>
          </LeadModal>
        )}
      </div>
    </>
  );
}
