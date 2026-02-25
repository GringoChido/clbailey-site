import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { categories, getFeaturedProducts, img } from "@/lib/products";

/* ─── Section 1: Category Navigation ─── */
function CategoryNav({ t }: { t: (key: string) => string }) {
  const items = [
    {
      label: t("museum.poolTables"),
      href: "/products/pool-tables",
      image: "/images/products/pool-tables/viking/hero.jpg",
      alt: t("museum.altPoolTables"),
    },
    {
      label: t("museum.shuffleboards"),
      href: "/products/shuffleboards",
      image: "/images/products/shuffleboards/viking-shuffleboard/hero.jpg",
      alt: t("museum.altShuffleboards"),
    },
    {
      label: t("museum.furniture"),
      href: "/products/game-room-furniture",
      image: "/images/products/game-room-furniture/skylar-furniture/hero.jpg",
      alt: t("museum.altFurniture"),
    },
    {
      label: t("museum.cueRacks"),
      href: "/products/cue-racks",
      image: "/images/products/cue-racks/carved-leg-cue-rack/hero.jpg",
      alt: t("museum.altCueRacks"),
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-14">
          {t("home.categoryHeading")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group text-center"
            >
              <div className="aspect-square overflow-hidden rounded-full bg-gray-100 mx-auto w-full max-w-[200px] mb-4">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Featured Products ─── */
function FeaturedProducts({ t }: { t: (key: string) => string }) {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("museum.portfolioLabel")}
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              {t("home.featuredHeading")}
            </h2>
            <p className="text-base text-gray-500 mt-2 max-w-md">
              {t("home.featuredSubheading")}
            </p>
          </div>
          <Link
            href="/products/pool-tables"
            className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors whitespace-nowrap"
          >
            {t("home.exploreCta")} &rarr;
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.category}/${product.slug}`}
              className="group flex-shrink-0 w-[280px] lg:w-[320px]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={img(product.images.hero)}
                  alt={product.name}
                  width={640}
                  height={480}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Finishes ─── */
function FinishesSection({ t }: { t: (key: string) => string }) {
  const allFinishes = [
    { name: "Espresso", color: "#3C2415" },
    { name: "Rustic", color: "#7B6147" },
    { name: "Timber", color: "#8B7355" },
    { name: "Graphite", color: "#4A4A4A" },
    { name: "Traditional Mahogany", color: "#6B2A2A" },
    { name: "Warm Chestnut", color: "#8B5E3C" },
    { name: "Dark Walnut", color: "#4A3728" },
    { name: "Black", color: "#1D1D1D" },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          {t("home.finishesHeading")}
        </h2>
        <p className="text-base text-gray-500 max-w-lg mx-auto mb-14">
          {t("home.finishesDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {allFinishes.map((finish) => (
            <div key={finish.name} className="flex flex-col items-center gap-3">
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-gray-200"
                style={{ backgroundColor: finish.color }}
              />
              <span className="text-xs font-medium text-gray-500">
                {finish.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Catalog CTA ─── */
function CatalogSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
      <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden">
        <Image
          src="/images/products/pool-tables/dutchess/hero.jpg"
          alt={t("museum.altDutchess")}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center px-10 lg:px-20 py-16 lg:py-0 bg-gray-50">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          {t("museum.catalogLabel")}
        </p>
        <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 leading-tight mb-4">
          {t("museum.requestSourcebook")}
        </h2>
        <p className="text-base text-gray-500 max-w-sm leading-relaxed mb-8">
          {t("museum.catalogDescription")}
        </p>
        <Link href="/catalogs" className="btn-primary self-start">
          {t("museum.viewCatalogs")}
        </Link>
      </div>
    </section>
  );
}

/* ─── Section 5: Dealer CTA ─── */
function DealerCTA({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/brand/nameplate.jpg"
        alt={t("museum.altNameplate")}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
          {t("home.dealerCta")}
        </h2>
        <p className="text-base text-white/70 mb-8 max-w-md mx-auto">
          {t("home.dealerCtaDescription")}
        </p>
        <Link
          href="/dealer"
          className="border border-white text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block"
        >
          {t("home.dealerCtaButton")}
        </Link>
      </div>
    </section>
  );
}

/* ─── Section 6: Help CTA ─── */
function HelpSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          {t("home.helpHeading")}
        </h2>
        <p className="text-base text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
          {t("home.helpDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact-us" className="btn-primary">
            {t("home.helpCta")}
          </Link>
          <Link href="/catalogs" className="btn-outline">
            {t("museum.viewCatalogs")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7: Heritage ─── */
function HeritageSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          {t("museum.heritageLabel")}
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          {t("home.heritageHeading")}
        </h2>
        <p className="text-base text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
          {t("home.heritageDescription")}
        </p>
        <Link
          href="/about"
          className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors"
        >
          {t("home.heritageCta")} &rarr;
        </Link>
      </div>
    </section>
  );
}

/* ─── Export assembled homepage sections ─── */
export default async function HomeSections() {
  const t = await getTranslations();

  return (
    <>
      <CategoryNav t={t} />
      <FeaturedProducts t={t} />
      <FinishesSection t={t} />
      <CatalogSection t={t} />
      <DealerCTA t={t} />
      <HelpSection t={t} />
      <HeritageSection t={t} />
    </>
  );
}
