import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

/*
 * Old Money Sourcebook homepage sections.
 *
 * 1. Collections Portfolio — 4-column grayscale grid (color on hover)
 * 2. Catalog Strip — RH "Unveiling" split layout
 * 3. Heritage Strip — full-bleed nameplate
 *
 * Each section is a snap-section for mandatory snap scrolling.
 * No greens, no gradients, no drop shadows.
 */

/* ─── Section 1: Collections Portfolio — 4-col grayscale grid ─── */
function CollectionsPortfolio({ t }: { t: (key: string) => string }) {
  const portfolioItems = [
    {
      title: t("museum.poolTables"),
      subtitle: "Nine Models",
      href: "/products/pool-tables",
      image: "/images/products/pool-tables/viking/hero.jpg",
      alt: t("museum.altPoolTables"),
    },
    {
      title: t("museum.shuffleboards"),
      subtitle: "9 to 14 Feet",
      href: "/products/shuffleboards",
      image: "/images/products/shuffleboards/viking-shuffleboard/hero.jpg",
      alt: t("museum.altShuffleboards"),
    },
    {
      title: t("museum.furniture"),
      subtitle: "Complete the Room",
      href: "/products/game-room-furniture",
      image: "/images/products/game-room-furniture/skylar-furniture/hero.jpg",
      alt: t("museum.altFurniture"),
    },
    {
      title: t("museum.cueRacks"),
      subtitle: "Wall & Floor",
      href: "/products/cue-racks",
      image: "/images/products/cue-racks/carved-leg-cue-rack/hero.jpg",
      alt: t("museum.altCueRacks"),
    },
  ];
  return (
    <section className="py-24 lg:py-32 flex flex-col justify-center px-8 md:px-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header — reference layout: title left, "Browse All" right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 lg:mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="metadata mb-10 block">{t("museum.portfolioLabel")}</span>
            <h2 className="text-5xl md:text-7xl mb-10 font-serif tracking-tight leading-none text-ink">
              {t("museum.collectionsHeading")}
            </h2>
            <p className="text-ink font-serif text-xl leading-relaxed opacity-80">
              {t("museum.collectionsDescription")}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-6 metadata text-ink pb-3 border-b border-estate/30 hover:border-ink transition-all whitespace-nowrap"
          >
            {t("museum.browseAll")} &rarr;
          </Link>
        </div>

        {/* 4-column portfolio grid — grayscale, color on hover */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {portfolioItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group cursor-pointer block"
            >
              <div className="aspect-[3/4] overflow-hidden mb-8 relative bg-ink">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
              <h3 className="metadata text-ink">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: View Catalog — RH "Unveiling" split layout ─── */
function CatalogStrip({ t }: { t: (key: string) => string }) {
  return (
    <section className="catalog-strip">
      {/* Left: Image */}
      <div className="relative min-h-[50vh] lg:min-h-[100vh] overflow-hidden">
        <Image
          src="/images/products/pool-tables/dutchess/hero.jpg"
          alt={t("museum.altDutchess")}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Right: Typography panel */}
      <div className="flex flex-col justify-center px-10 lg:px-20 py-16 lg:py-0 bg-vellum-dark">
        <span className="heritage-label text-estate block mb-6">
          {t("museum.catalogLabel")}
        </span>
        <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-ink tracking-tight leading-[1.1] mb-6">
          {t("museum.requestSourcebook")}
        </h2>
        <p className="text-ink/40 max-w-sm text-lg font-serif leading-relaxed mb-10">
          {t("museum.catalogDescription")}
        </p>
        <Link
          href="/catalogs"
          className="inline-block self-start bg-ink text-vellum px-10 py-4 heritage-label hover:bg-ink-light transition-colors"
        >
          {t("museum.viewCatalogs")}
        </Link>
      </div>
    </section>
  );
}

/* ─── Section 3: Heritage — full-bleed nameplate ─── */
function HeritageStrip({ t }: { t: (key: string) => string }) {
  return (
    <section className="cine-strip">
      <Image
        src="/images/brand/nameplate.jpg"
        alt={t("museum.altNameplate")}
        fill
        className="cine-strip__img"
        sizes="100vw"
      />
      {/* Ink overlay */}
      <div className="absolute inset-0 bg-ink/40" />
      <div className="cine-strip__content flex flex-col items-center text-center">
        <span className="heritage-label text-white/30 block mb-4">
          {t("museum.heritageLabel")}
        </span>
        <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.1] mb-6">
          {t("museum.heritage")}
        </h2>
        <p className="text-white/40 max-w-lg text-lg font-serif leading-relaxed mb-10">
          {t("museum.heritageDescription")}
        </p>
        <Link
          href="/about"
          className="inline-block border border-white/20 text-white px-10 py-4 heritage-label hover:bg-white/10 transition-colors"
        >
          {t("museum.ourStory")}
        </Link>
      </div>
    </section>
  );
}

/* ─── Export assembled sequence ─── */
export default async function MuseumGrid() {
  const t = await getTranslations();

  return (
    <>
      <CollectionsPortfolio t={t} />
      <CatalogStrip t={t} />
      <HeritageStrip t={t} />
    </>
  );
}
