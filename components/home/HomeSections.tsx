import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, img, IMAGEKIT_BASE } from "@/lib/products";
import CatalogBrowser from "./CatalogBrowser";

/* ─── Section 1: Category Navigation ─── */
function CategoryNav({ t }: { t: (key: string) => string }) {
  const items = [
    {
      label: t("museum.poolTables"),
      subtitle: t("museum.nineModels"),
      href: "/products/pool-tables",
      image: `${IMAGEKIT_BASE}/pool-tables/viking/hero.jpg`,
      alt: t("museum.altPoolTables"),
    },
    {
      label: t("museum.shuffleboards"),
      subtitle: t("museum.nineToFourteen"),
      href: "/products/shuffleboards",
      image: `${IMAGEKIT_BASE}/shuffleboards/viking-shuffleboard/hero.jpg`,
      alt: t("museum.altShuffleboards"),
    },
    {
      label: t("museum.furniture"),
      subtitle: t("museum.completeTheRoom"),
      href: "/products/game-room-furniture",
      image: `${IMAGEKIT_BASE}/game-room-furniture/viking-furniture/chair-detail.jpg`,
      alt: t("museum.altFurniture"),
    },
    {
      label: t("museum.cueRacks"),
      subtitle: t("museum.wallAndFloor"),
      href: "/products/cue-racks",
      image: `${IMAGEKIT_BASE}/cue-racks/carved-leg-cue-rack/hero.jpg`,
      alt: t("museum.altCueRacks"),
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <p className="section-label text-center mb-3">
          {t("museum.portfolioLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] text-center mb-16">
          {t("home.categoryHeading")}
        </h2>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex-shrink-0 w-[260px] lg:w-auto"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-[var(--color-cloud)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  sizes="(max-width: 1024px) 260px, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-[1.125rem] font-light text-white uppercase tracking-[0.04em]">
                    {item.label}
                  </h3>
                  <p className="text-[0.6875rem] text-white/40 uppercase tracking-[0.1em] mt-1.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Dealer Portal Block ─── */
function DealerPortalBlock({ t }: { t: (key: string) => string }) {
  const features = [
    { title: t("dealerBlock.feature1Title"), desc: t("dealerBlock.feature1Desc") },
    { title: t("dealerBlock.feature2Title"), desc: t("dealerBlock.feature2Desc") },
    { title: t("dealerBlock.feature3Title"), desc: t("dealerBlock.feature3Desc") },
    { title: t("dealerBlock.feature4Title"), desc: t("dealerBlock.feature4Desc") },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <p className="section-label text-center mb-3">
          {t("dealerBlock.label")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] text-center mb-16">
          {t("dealerBlock.heading")}
        </h2>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left: Catalog Browser */}
          <CatalogBrowser />

          {/* Right: Dealer Portal promo */}
          <div className="bg-[var(--color-deep)] p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-[var(--color-light-on-dark)]/30 mb-4">
                {t("dealerBlock.dealerLabel")}
              </p>
              <h3 className="heading-display text-2xl lg:text-3xl text-white font-light mb-5">
                {t("dealerBlock.dealerHeading")}
              </h3>
              <p className="text-[13px] leading-[26px] text-[var(--color-light-on-dark)]/50 mb-10">
                {t("dealerBlock.dealerDescription")}
              </p>

              <div className="space-y-5 mb-12">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="flex-shrink-0 mt-1 text-[var(--color-bronze)]"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    <div>
                      <p className="text-[13px] font-medium text-white tracking-[0.02em]">
                        {feature.title}
                      </p>
                      <p className="text-[11px] text-[var(--color-light-on-dark)]/40 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Link href="/dealer" className="btn-outline-white">
                {t("dealerBlock.dealerLoginCta")}
              </Link>
              <p className="mt-5">
                <Link
                  href="/contact-us"
                  className="text-[11px] text-[var(--color-light-on-dark)]/30 hover:text-[var(--color-light-on-dark)]/50 transition-colors duration-300"
                >
                  {t("dealerBlock.applyAccess")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Featured Products ─── */
function FeaturedProducts({ t }: { t: (key: string) => string }) {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="section-label mb-3">
              {t("museum.portfolioLabel")}
            </p>
            <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)]">
              {t("home.featuredHeading")}
            </h2>
            <p className="text-base text-[var(--color-body)] mt-3 max-w-md leading-relaxed">
              {t("home.featuredSubheading")}
            </p>
          </div>
          <Link
            href="/products/pool-tables"
            className="text-sm font-medium text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-0.5 hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)] transition-colors duration-300 whitespace-nowrap"
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
              <div className="aspect-[4/3] overflow-hidden bg-white mb-5">
                <Image
                  src={img(product.images.hero)}
                  alt={product.name}
                  width={640}
                  height={480}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <h3 className="text-base font-medium text-[var(--color-primary)] tracking-[0.01em]">
                {product.name}
              </h3>
              <p className="text-sm text-[var(--color-body)] mt-1">{product.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Shuffleboard Block ─── */
function ShuffleboardBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src={`${IMAGEKIT_BASE}/shuffleboards/viking-shuffleboard/lifestyle.jpg`}
        alt={t("home.shuffleboardAlt")}
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep)]/80 via-[var(--color-deep)]/40 to-transparent" />
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 py-20">
        <div className="max-w-lg">
          <p className="section-label !text-[var(--color-light-on-dark)]/40 mb-4">
            {t("home.shuffleboardLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-5">
            {t("home.shuffleboardHeading")}
          </h2>
          <p className="text-base text-[var(--color-light-on-dark)]/50 mb-10 leading-relaxed">
            {t("home.shuffleboardDescription")}
          </p>
          <Link href="/products/shuffleboards" className="btn-outline-white">
            {t("home.shuffleboardCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: Finishes ─── */
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
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <p className="section-label mb-3">
          {t("home.finishesLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] mb-4">
          {t("home.finishesHeading")}
        </h2>
        <p className="text-base text-[var(--color-body)] max-w-lg mx-auto mb-16 leading-relaxed">
          {t("home.finishesDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
          {allFinishes.map((finish) => (
            <div key={finish.name} className="group flex flex-col items-center gap-3 cursor-pointer">
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-[var(--color-cloud)] group-hover:border-[var(--color-bronze)] transition-[border-color] duration-300"
                style={{ backgroundColor: finish.color }}
              />
              <span className="text-[0.6875rem] font-normal text-[var(--color-body)] tracking-[0.06em]">
                {finish.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: Game Room Furniture ─── */
function FurnitureBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src={`${IMAGEKIT_BASE}/game-room-furniture/skylar-furniture/hero.jpg`}
        alt={t("home.furnitureAlt")}
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep)]/80 via-[var(--color-deep)]/40 to-transparent" />
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 py-20">
        <div className="max-w-lg">
          <p className="section-label !text-[var(--color-light-on-dark)]/40 mb-4">
            {t("home.furnitureLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-5">
            {t("home.furnitureHeading")}
          </h2>
          <p className="text-base text-[var(--color-light-on-dark)]/50 mb-10 leading-relaxed">
            {t("home.furnitureDescription")}
          </p>
          <Link href="/products/game-room-furniture" className="btn-outline-white">
            {t("home.furnitureCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7: Heritage ─── */
function HeritageSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-cloud)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="section-label mb-4">
          {t("museum.heritageLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] mb-5">
          {t("home.heritageHeading")}
        </h2>
        <p className="text-base text-[var(--color-body)] max-w-lg mx-auto mb-12 leading-relaxed">
          {t("home.heritageDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/about" className="btn-outline">
            {t("home.heritageCta")}
          </Link>
          <Link href="/contact-us" className="btn-primary">
            {t("home.helpCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 8: Trade Program ─── */
function TradeProgramBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="section-label mb-3">{t("trade.heading")}</p>
          <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)]">
            {t("trade.whyJoinHeading")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: For Trade Professionals */}
          <div className="bg-white border border-[var(--color-cloud)] p-10 lg:p-12">
            <h3 className="heading-card mb-6">{t("trade.whyJoinHeading")}</h3>
            <p className="text-base text-[var(--color-body)] leading-relaxed mb-6">
              {t("trade.description")}
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--color-bronze)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[var(--color-body)] leading-relaxed">{t("trade.benefit1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--color-bronze)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[var(--color-body)] leading-relaxed">{t("trade.benefit2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--color-bronze)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[var(--color-body)] leading-relaxed">{t("trade.benefit3")}</span>
              </li>
            </ul>
            <Link href="/dealer" className="btn-primary">
              {t("trade.applyCta")}
            </Link>
          </div>

          {/* Card 2: Not a Trade Professional */}
          <div className="bg-white border border-[var(--color-cloud)] p-10 lg:p-12">
            <h3 className="heading-card mb-6">{t("trade.notTradeHeading")}</h3>
            <p className="text-base text-[var(--color-body)] leading-relaxed mb-8">
              {t("trade.notTradeDescription")}
            </p>
            <Link href="/dealer" className="btn-outline">
              {t("trade.findDealerCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Editorial Interstitial: About the Products ─── */
function EditorialProducts({ t }: { t: (key: string) => string }) {
  return (
    <section className="bg-[var(--color-deep)] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-[var(--color-light-on-dark)]/30 mb-6">
          {t("home.editorialProductsLabel")}
        </p>
        <p className="font-[family-name:var(--font-display)] text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-light italic text-[var(--color-light-on-dark)]/85 leading-relaxed mb-10">
          {t("home.editorialProducts")}
        </p>
        <Link href="/products" className="btn-outline-white">
          {t("home.editorialProductsCta")}
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
      <EditorialProducts t={t} />
      <DealerPortalBlock t={t} />
      <FeaturedProducts t={t} />
      <ShuffleboardBlock t={t} />
      <FurnitureBlock t={t} />
      <HeritageSection t={t} />
      <TradeProgramBlock t={t} />
    </>
  );
}
