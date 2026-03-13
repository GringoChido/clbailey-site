import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  products,
  getProduct,
  getCategory,
  getProductsByCategory,
  getCollectionMatches,
  getCrossCategoryProducts,
  isConvertible,
  img,
  pdf,
  IMAGEKIT_BASE,
} from "@/lib/products";
import PDPGalleryClient from "@/components/ui/PDPGalleryClient";
import FinishSwatches from "@/components/ui/FinishSwatches";
import ProductAccordion from "@/components/ui/ProductAccordion";
import ProductConfigurator from "@/components/ui/ProductConfigurator";
import CraftSection from "@/components/ui/CraftSection";
import ProductCard from "@/components/ui/ProductCard";
import LeadModal from "@/components/ui/LeadModal";
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
  const title = `${product.name} ${cat?.name || ""}`;

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
              url: `${IMAGEKIT_BASE}/${product.images.hero}`,
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
        ? [`${IMAGEKIT_BASE}/${product.images.hero}`]
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
  setRequestLocale(locale);

  const product = getProduct(slug);
  const cat = getCategory(category);

  if (!product || !cat || product.category !== category) {
    notFound();
  }

  const t = await getTranslations();

  // Check dealer auth cookie
  const cookieStore = await cookies();
  const dealerAuth = cookieStore.get("dealer-auth");
  const isDealer = dealerAuth?.value === "authorized";

  // Collect all images: hero first, then gallery
  const allImages = [
    product.images.hero,
    ...product.images.gallery,
  ].filter(Boolean) as string[];

  const convertible = isConvertible(product);

  // Smart cross-sell: collection matches first, then fallback
  const collectionProducts = getCollectionMatches(product.name, category);
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const crossCategoryProducts =
    collectionProducts.length > 0
      ? collectionProducts
      : getCrossCategoryProducts(category, 4);

  /* ─── JSON-LD ─── */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.hero
      ? `${IMAGEKIT_BASE}/${product.images.hero}`
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />

      <div className="pt-28 pb-20 lg:pb-28">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav
            className="metadata !text-[var(--color-mid-gray)] mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/${locale}/products`}
              className="hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              {t("common.products")}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/${locale}/products/${category}`}
              className="hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              {cat.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-body)]">{product.name}</span>
          </nav>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Left: Gallery */}
            <PDPGalleryClient
              images={allImages}
              productName={product.name}
            />

            {/* Right: Product info */}
            <div>
              <ScrollReveal>
                <p className="section-label mb-3">{cat.name}</p>
                <h1 className="heading-display text-3xl lg:text-[2.5rem] text-[var(--color-primary)] mb-3">
                  {product.name}
                </h1>
                <p className="heading-sub mb-3">{product.tagline}</p>

                {/* Badges */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="metadata !text-[var(--color-mid-gray)]">
                    {t("common.pricingLabel")}
                  </span>
                  {convertible && (
                    <span className="metadata bg-[var(--color-cloud)] px-2 py-1">
                      {t("common.convertibleBadge")}
                    </span>
                  )}
                </div>

                <p className="text-[13px] text-[var(--color-body)] leading-[26px] mb-8 max-w-md">
                  {product.description}
                </p>

                {/* Finish swatches (small dots) */}
                {product.finishes.length > 0 &&
                  product.finishes[0] !== "Various" && (
                    <div className="mb-8">
                      <FinishSwatches
                        finishes={product.finishes}
                        size="sm"
                      />
                    </div>
                  )}
              </ScrollReveal>

              {/* Accordion */}
              <ScrollReveal delay={1}>
                <ProductAccordion
                  features={product.features}
                  sizes={product.sizes}
                  finishes={product.finishes}
                  dimensionsImage={product.images.dimensions}
                  locale={locale}
                />
              </ScrollReveal>

              {/* Configurator or Dealer CTAs */}
              <ScrollReveal delay={2}>
                {isDealer ? (
                  <div className="py-8 border-t border-[var(--color-cloud)]">
                    <p className="section-label mb-4">{t("pdp.dealerTools")}</p>
                    <div className="flex flex-wrap gap-3">
                      {product.pdf && (
                        <a
                          href={pdf(product.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          {t("common.downloadSpecSheet")}
                        </a>
                      )}
                      <Link
                        href={`/${locale}/dealer-portal`}
                        className="btn-outline"
                      >
                        {t("pdp.dealerPortal")}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-[var(--color-cloud)]">
                    <ProductConfigurator
                      productName={product.name}
                      productSlug={product.slug}
                      sizes={product.sizes}
                      finishes={product.finishes}
                      locale={locale}
                    />

                    {/* Secondary CTAs below configurator */}
                    <div className="hidden lg:flex flex-wrap gap-3 pb-8">
                      {product.pdf && (
                        <LeadModal
                          productName={product.name}
                          pdfUrl={pdf(product.pdf)}
                        >
                          <button className="btn-outline">
                            {t("common.downloadSpecSheet")}
                          </button>
                        </LeadModal>
                      )}
                      <Link
                        href={`/${locale}/dealer`}
                        className="btn-outline"
                      >
                        {t("nav.findDealer")}
                      </Link>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Full-bleed CraftSection break */}
        <CraftSection backgroundImage="The_C_L__Bailey_Co__Master_Organizer/Pool_Tables/Dutchess/Warm_Chestnut/clb%20dutchess%20image%202_4Rq5CRLeN.jpg" />

        <div className="max-w-[90rem] mx-auto px-6 lg:px-10 mt-20">
          {/* Collection / Cross-category products */}
          {crossCategoryProducts.length > 0 && (
            <ScrollReveal className="mb-20">
              <p className="section-label mb-3">
                {collectionProducts.length > 0
                  ? t("common.collection")
                  : t("products.completeGameRoom")}
              </p>
              <h2 className="heading-display text-2xl lg:text-3xl text-[var(--color-primary)] mb-3">
                {collectionProducts.length > 0
                  ? `${product.name.replace(/^The\s+/i, "").replace(/\s+(Pool Table|Shuffleboard|Game Room Furniture)s?$/i, "")} Collection`
                  : t("products.completeGameRoomSub")}
              </h2>
              <div className="h-px bg-[var(--color-cloud)] mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {crossCategoryProducts.slice(0, 4).map((cp) => (
                  <ProductCard key={cp.slug} product={cp} locale={locale} />
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* More from this category */}
          {relatedProducts.length > 0 && (
            <ScrollReveal>
              <p className="section-label mb-3">
                {t("products.moreCategoryName", { categoryName: cat.name })}
              </p>
              <div className="h-px bg-[var(--color-cloud)] mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.slug} product={rp} locale={locale} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-[var(--color-cloud)] px-4 py-3 flex gap-3">
        {isDealer ? (
          <>
            {product.pdf && (
              <a
                href={pdf(product.pdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center btn-primary"
              >
                {t("common.specSheet")}
              </a>
            )}
            <Link
              href={`/${locale}/dealer-portal`}
              className="flex-1 text-center btn-outline"
            >
              Dealer Portal
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`/${locale}/dealer`}
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
          </>
        )}
      </div>
    </>
  );
}
