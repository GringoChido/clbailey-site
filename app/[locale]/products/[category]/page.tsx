import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  categories,
  getCategory,
  getProductsByCategory,
  img,
  IMAGEKIT_BASE,
} from "@/lib/products";
import CategoryGrid from "@/components/ui/CategoryGrid";
import CategoryHeroVideo from "@/components/ui/CategoryHeroVideo";
import TradeProgramBlock from "@/components/ui/TradeProgramBlock";

const CATEGORY_I18N_KEYS: Record<string, { name: string; desc: string; headline: string }> = {
  "pool-tables": { name: "poolTablesName", desc: "poolTablesDesc", headline: "poolTablesHeadline" },
  "shuffleboards": { name: "shuffleboardsName", desc: "shuffleboardsDesc", headline: "shuffleboardsHeadline" },
  "game-room-furniture": { name: "gameRoomFurnitureName", desc: "gameRoomFurnitureDesc", headline: "gameRoomFurnitureHeadline" },
  "cue-racks": { name: "cueRacksName", desc: "cueRacksDesc", headline: "cueRacksHeadline" },
  "accessories": { name: "accessoriesName", desc: "accessoriesDesc", headline: "accessoriesHeadline" },
};

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return { title: "Category Not Found" };

  const title = category.name;

  return {
    title,
    description: category.description,
    openGraph: {
      title,
      description: category.headline,
      type: "website",
      images: category.heroImage
        ? [
            {
              url: `${IMAGEKIT_BASE}/${category.heroImage}`,
              width: 1200,
              height: 630,
              alt: category.name,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://clbailey.com/${locale}/products/${categorySlug}`,
      languages: {
        en: `https://clbailey.com/en/products/${categorySlug}`,
        es: `https://clbailey.com/es/products/${categorySlug}`,
      },
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);

  const category = getCategory(categorySlug);
  if (!category) notFound();

  const products = getProductsByCategory(categorySlug);
  const t = await getTranslations("common");
  const tc = await getTranslations("categoryPage");
  const keys = CATEGORY_I18N_KEYS[categorySlug];

  const categoryName = keys ? tc(keys.name) : category.name;
  const categoryDesc = keys ? tc(keys.desc) : category.description;
  const categoryHeadline = keys ? tc(keys.headline) : category.headline;

  return (
    <>
      {/* Category Hero Banner */}
      <section className="relative w-full h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        {category.heroVideo ? (
          <CategoryHeroVideo
            src={`${IMAGEKIT_BASE}/${category.heroVideo}`}
            poster={img(category.heroImage)}
          />
        ) : (
          <Image
            src={img(category.heroImage)}
            alt={categoryName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={85}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 pb-14">
          <p className="section-label !text-white/40 mb-3">
            {t("products")}
          </p>
          <h1 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-3">
            {categoryName}
          </h1>
          <p className="heading-sub !text-white/70 mb-2">
            {categoryHeadline}
          </p>
          <p className="text-sm text-white/50 max-w-lg">
            {categoryDesc}
          </p>
          <p className="metadata !text-white/30 mt-4">
            {tc("productCount", { count: products.length })}
          </p>
        </div>
      </section>

      {/* Filter + Product Grid */}
      <CategoryGrid
        products={products}
        locale={locale}
      />

      {/* SEO Content Block */}
      <section className="bg-[var(--color-off-white)] py-16 lg:py-20">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-label mb-4">
              {categoryName}
            </p>
            <p className="text-[13px] leading-[26px] text-[var(--color-body)]">
              {categoryDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Trade Program + Dealer Finder */}
      <TradeProgramBlock locale={locale} />
    </>
  );
}
