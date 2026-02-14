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
import SectionLabel from "@/components/ui/SectionLabel";
import LeadModal from "@/components/ui/LeadModal";
import ProductCard from "@/components/ui/ProductCard";

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
          <nav
            className="heritage-label text-brown/40 mb-8 animate-fade-up"
            aria-label="Breadcrumb"
          >
            <Link href="/products" className="hover:text-brown transition-colors">
              {t("common.products")}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/products/${category}`}
              className="hover:text-brown transition-colors"
            >
              {cat.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brown/60">{product.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-cream-dark animate-fade-up">
              <Image
                src={img(product.images.hero)}
                alt={`${product.name} — ${product.tagline}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center animate-fade-up animate-delay-2">
              <p className="heritage-label text-brown/40 mb-3">
                {cat.name}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-brown/70 mb-2 font-serif italic">
                {product.tagline}
              </p>
              <p className="text-brown/60 leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              {/* Sizes & Finishes */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {product.sizes.length > 0 && (
                  <div>
                    <h3 className="heritage-label text-brown/40 mb-2">
                      {t("common.sizes")}
                    </h3>
                    <p className="text-sm text-brown/70">
                      {product.sizes.join(", ")}
                    </p>
                  </div>
                )}
                {product.finishes.length > 0 && (
                  <div>
                    <h3 className="heritage-label text-brown/40 mb-2">
                      {t("common.finishes")}
                    </h3>
                    <p className="text-sm text-brown/70">
                      {product.finishes.join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="heritage-label text-brown/40 mb-3">
                    {t("common.features")}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-sm text-brown/70"
                      >
                        <span className="w-1 h-1 rounded-full bg-brown/30 mt-2 flex-shrink-0" />
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
                    <button className="bg-forest text-bone px-8 py-3.5 heritage-label hover:bg-forest-light transition-colors">
                      {t("common.downloadSpecSheet")}
                    </button>
                  </LeadModal>
                )}
                <Link
                  href="/dealer"
                  className="border border-brown text-brown px-8 py-3.5 heritage-label hover:bg-brown hover:text-cream transition-all"
                >
                  {t("nav.findDealer")}
                </Link>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {product.images.gallery.length > 0 && (
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-8">
                <SectionLabel label={t("common.gallery")} />
                <div className="border-t border-brown/20" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {product.images.gallery.map((imgPath, i) => (
                  <div
                    key={imgPath}
                    className="relative aspect-square overflow-hidden bg-cream-dark"
                  >
                    <Image
                      src={img(imgPath)}
                      alt={`${product.name} detail ${i + 1}`}
                      fill
                      className="object-cover img-zoom"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dimensions */}
          {product.images.dimensions && (
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-8">
                <SectionLabel label={t("common.dimensions")} />
                <div className="border-t border-brown/20" />
              </div>
              <div className="max-w-3xl">
                <div className="relative aspect-[16/9] overflow-hidden bg-cream-dark">
                  <Image
                    src={img(product.images.dimensions)}
                    alt={`${product.name} dimensions`}
                    fill
                    className="object-contain"
                    sizes="800px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-8">
                <SectionLabel label={t("products.moreCategoryName", { categoryName: cat.name })} />
                <div className="border-t border-brown/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.slug} product={rp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-bone border-t border-brown/10 px-4 py-3 flex gap-3">
        <Link
          href="/dealer"
          className="flex-1 text-center bg-forest text-bone py-3 heritage-label"
        >
          {t("common.contactDealer")}
        </Link>
        {product.pdf && (
          <LeadModal
            productName={product.name}
            pdfUrl={pdf(product.pdf)}
          >
            <button className="flex-1 text-center border border-brown text-brown py-3 heritage-label">
              {t("common.specSheet")}
            </button>
          </LeadModal>
        )}
      </div>
    </>
  );
}
