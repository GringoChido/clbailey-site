import Image from "next/image";
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
import ProductConfigurator from "@/components/ui/ProductConfigurator";
import ProductCard from "@/components/ui/ProductCard";
import LeadModal from "@/components/ui/LeadModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ConfigureNudge from "@/components/ui/ConfigureNudge";
import PDPShowcase from "@/components/ui/PDPShowcase";
import FinishSwatches from "@/components/ui/FinishSwatches";

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

  const cookieStore = await cookies();
  const dealerAuth = cookieStore.get("dealer-auth");
  const isDealer = dealerAuth?.value === "authorized";

  const galleryImages = product.images.gallery.filter(Boolean) as string[];
  const convertible = isConvertible(product);

  const collectionProducts = getCollectionMatches(product.name, category);
  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const crossCategoryProducts =
    collectionProducts.length > 0
      ? collectionProducts
      : getCrossCategoryProducts(category, 4);

  const heroImage = product.images.categoryImage ?? product.images.hero;

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
      "@id": "https://clbailey.com/#organization",
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
        "@id": "https://clbailey.com/#organization",
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

  const warrantyText = locale === "es"
    ? "Garantia estructural de por vida en todos los productos de madera maciza. Se recomienda instalacion profesional. Contacte a su distribuidor autorizado para conocer los detalles completos de la garantia."
    : "Lifetime structural warranty on all solid hardwood products. Professional installation recommended. Contact your authorized dealer for complete warranty details.";

  const labels = locale === "es"
    ? { features: "Caracteristicas y Construccion", sizes: "Tamanos Disponibles", finishes: "Opciones de Acabado", warranty: "Garantia y Cuidado", roomSize: "Guia de Tamano de Habitacion" }
    : { features: "Features & Construction", sizes: "Available Sizes", finishes: "Finish Options", warranty: "Warranty & Care", roomSize: "Room Size Guide" };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />

      {/* ─── Hero Banner ─── */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={img(heroImage)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 pb-12 lg:pb-16">
          <nav
            className="metadata !text-white/40 mb-4"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/${locale}/products`}
              className="hover:text-white/70 transition-colors duration-300"
            >
              {t("common.products")}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/${locale}/products/${category}`}
              className="hover:text-white/70 transition-colors duration-300"
            >
              {cat.name}
            </Link>
          </nav>

          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-3 max-w-2xl leading-[1.05]">
            {product.name}
          </h1>
          <p className="heading-sub !text-white/70 max-w-lg mb-4">
            {product.tagline}
          </p>

          <div className="flex items-center gap-3">
            <span className="metadata !text-white/40">
              {t("common.pricingLabel")}
            </span>
            {convertible && (
              <span className="metadata bg-white/15 backdrop-blur-sm px-3 py-1 text-white/80">
                {t("common.convertibleBadge")}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ─── Trust Bar (moved up from bottom) ─── */}
      <section className="bg-[var(--color-primary)] py-8 lg:py-10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/50 mb-1">
                  {t("craftStrip.pillar1Title")}
                </p>
                <p className="text-[13px] font-light text-white/70">
                  {t("craftStrip.pillar1Desc")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/50 mb-1">
                  {t("craftStrip.pillar2Title")}
                </p>
                <p className="text-[13px] font-light text-white/70">
                  {t("craftStrip.pillar2Desc")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-px h-8 bg-white/20 hidden md:block" />
              <div>
                <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/50 mb-1">
                  {t("craftStrip.pillar3Title")}
                </p>
                <p className="text-[13px] font-light text-white/70">
                  {t("craftStrip.pillar3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Product Intro ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="text-lg md:text-xl text-[var(--color-primary)] leading-[1.8]">
              {product.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Lifestyle Gallery ─── */}
      {galleryImages.length > 0 && (
        <PDPShowcase
          heroImage={null}
          images={galleryImages}
          productName={product.name}
        />
      )}

      {/* ─── Specs + Configurator: Two-Column Layout ─── */}
      <section className="py-16 lg:py-24 bg-[var(--color-off-white)]" id="configurator">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Column: Open Specs */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="heading-display text-3xl md:text-4xl text-[var(--color-primary)] mb-10">
                  {t("pdp.productDetails")}
                </h2>

                {/* Features */}
                <div className="mb-10">
                  <p className="section-label text-[13px] mb-4">{labels.features}</p>
                  <div className="h-px bg-[var(--color-cloud)] mb-5" />
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-base text-[var(--color-primary)] leading-[1.8] pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[13px] before:w-2 before:h-[1px] before:bg-[var(--color-silver)]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sizes */}
                <div className="mb-10">
                  <p className="section-label text-[13px] mb-4">{labels.sizes}</p>
                  <div className="h-px bg-[var(--color-cloud)] mb-5" />
                  <div className="flex gap-4">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="metadata px-5 py-2.5 border border-[var(--color-cloud)] text-[var(--color-primary)]"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  {product.images.dimensions && (
                    <div className="mt-6 relative w-full max-w-lg aspect-[4/3]">
                      <Image
                        src={img(product.images.dimensions)}
                        alt={`${product.name} dimensions`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  )}
                </div>

                {/* Finishes */}
                <div className="mb-10">
                  <p className="section-label text-[13px] mb-4">{labels.finishes}</p>
                  <div className="h-px bg-[var(--color-cloud)] mb-5" />
                  <FinishSwatches finishes={product.finishes} size="lg" />
                </div>

                {/* Warranty */}
                <div className="mb-10">
                  <p className="section-label text-[13px] mb-4">{labels.warranty}</p>
                  <div className="h-px bg-[var(--color-cloud)] mb-5" />
                  <p className="text-base text-[var(--color-primary)] leading-[1.8]">
                    {warrantyText}
                  </p>
                </div>

                {/* Room Size Link */}
                <div>
                  <p className="section-label text-[13px] mb-4">{labels.roomSize}</p>
                  <div className="h-px bg-[var(--color-cloud)] mb-5" />
                  <p className="text-base text-[var(--color-body)] leading-[1.8] mb-3">
                    {locale === "es"
                      ? "No esta seguro de que su habitacion sea lo suficientemente grande? Consulte nuestra guia de tamanos de habitacion para conocer las dimensiones minimas recomendadas."
                      : "Not sure your room is large enough? Check our room size guide for recommended minimum dimensions."}
                  </p>
                  <Link
                    href={`/${locale}/room-size`}
                    className="btn-outline inline-block"
                  >
                    {locale === "es" ? "Ver Guia de Tamanos" : "View Room Size Guide"}
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Sticky Configurator */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <ScrollReveal delay={1}>
                  {isDealer ? (
                    <div className="bg-white p-8 border border-[var(--color-cloud)]">
                      <p className="section-label mb-4 text-center">{t("pdp.dealerTools")}</p>
                      <div className="flex flex-col gap-3">
                        {product.pdf && (
                          <a
                            href={pdf(product.pdf)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-center"
                          >
                            {t("common.downloadSpecSheet")}
                          </a>
                        )}
                        <Link
                          href={`/${locale}/dealer-portal`}
                          className="btn-outline text-center"
                        >
                          {t("pdp.dealerPortal")}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 lg:p-8 border border-[var(--color-cloud)]">
                      <ProductConfigurator
                        productName={product.name}
                        productSlug={product.slug}
                        sizes={product.sizes}
                        finishes={product.finishes}
                        locale={locale}
                      />

                      <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-[var(--color-cloud)]">
                        {product.pdf && (
                          <LeadModal
                            productName={product.name}
                            pdfUrl={pdf(product.pdf)}
                          >
                            <button className="btn-outline w-full">
                              {t("common.downloadSpecSheet")}
                            </button>
                          </LeadModal>
                        )}
                        <Link
                          href={`/${locale}/dealer`}
                          className="btn-outline text-center"
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
        </div>
      </section>

      {/* ─── Cross-sell ─── */}
      <div className="py-16 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          {crossCategoryProducts.length > 0 && (
            <ScrollReveal className="mb-20">
              <p className="section-label mb-3">
                {collectionProducts.length > 0
                  ? t("common.collection")
                  : t("products.completeGameRoom")}
              </p>
              <h2 className="heading-display text-2xl lg:text-3xl text-[var(--color-primary)] mb-2">
                {collectionProducts.length > 0
                  ? `${product.name.replace(/^The\s+/i, "").replace(/\s+(Pool Table|Shuffleboard|Game Room Furniture)s?$/i, "")} Collection`
                  : t("products.completeGameRoomSub")}
              </h2>
              <p className="text-[15px] text-[var(--color-body)] leading-[28px] mb-6">
                {collectionProducts.length > 0
                  ? t("products.collectionDesc", { name: product.name.replace(/^The\s+/i, "").replace(/\s+(Pool Table|Shuffleboard|Game Room Furniture)s?$/i, "") })
                  : t("products.crossCategoryDesc")}
              </p>
              <div className="h-px bg-[var(--color-cloud)] mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {crossCategoryProducts.slice(0, 4).map((cp) => (
                  <ProductCard key={cp.slug} product={cp} locale={locale} />
                ))}
              </div>
            </ScrollReveal>
          )}

          {relatedProducts.length > 0 && (
            <ScrollReveal>
              <p className="section-label mb-3">
                {t("products.moreCategoryName", { categoryName: cat.name })}
              </p>
              <p className="text-[15px] text-[var(--color-body)] leading-[28px] mb-6">
                {t("products.moreCategoryDesc")}
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

      {/* Desktop configure nudge */}
      {!isDealer && product.sizes.length > 0 && (
        <ConfigureNudge label={t("products.configureNudge")} />
      )}

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
