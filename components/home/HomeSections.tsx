import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, img, IMAGEKIT_BASE } from "@/lib/products";
import CatalogBrowser from "./CatalogBrowser";
import DealerLocator from "./DealerLocator";

/* ─── Section 1: Category Navigation ─── */
function CategoryNav({ t }: { t: (key: string) => string }) {
  const items = [
    {
      label: t("museum.poolTables"),
      subtitle: t("museum.nineModels"),
      href: "/products/pool-tables",
      image: `${IMAGEKIT_BASE}/The_C_L__Bailey_Co__Master_Organizer/Pool_Tables/Viking/Antique_Oak/viking%20combo_3-Iafpk-F.jpg`,
      alt: t("museum.altPoolTables"),
    },
    {
      label: t("museum.shuffleboards"),
      subtitle: t("museum.nineToFourteen"),
      href: "/products/shuffleboards",
      image: `${IMAGEKIT_BASE}/The_C_L__Bailey_Co__Master_Organizer/Shuffleboards/Viking/Antique_Oak/viking%20shb%20profile%20image_DQZaxvot3.jpg`,
      alt: t("museum.altShuffleboards"),
    },
    {
      label: t("museum.furniture"),
      subtitle: t("museum.completeTheRoom"),
      href: "/products/game-room-furniture",
      image: `${IMAGEKIT_BASE}/The_C_L__Bailey_Co__Master_Organizer/Benches/Viking/Antique_Oak/viking-bench-crop_ukWsqEDUI.jpg`,
      alt: t("museum.altFurniture"),
    },
    {
      label: t("museum.cueRacks"),
      subtitle: t("museum.wallAndFloor"),
      href: "/products/cue-racks",
      image: `${IMAGEKIT_BASE}/cue-racks/carved-leg-cue-rack/hero.jpg`,
      alt: t("museum.altCueRacks"),
    },
    {
      label: t("museum.accessories"),
      subtitle: t("museum.fromFirstBreak"),
      href: "/products/accessories",
      image: `${IMAGEKIT_BASE}/accessories/deluxe-accessory-kit/hero.jpg`,
      alt: t("museum.altAccessories"),
    },
  ];

  return (
    <section className="py-16 lg:py-32 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <p className="section-label text-center mb-3">
          {t("museum.portfolioLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] text-center mb-4">
          {t("home.categoryHeading")}
        </h2>
        <p className="text-base text-[var(--color-body)] text-center max-w-lg mx-auto mb-6 leading-relaxed">
          {t("home.editorialProducts")}
        </p>
        <div className="text-center mb-16">
          <Link href="/products" className="btn-outline">
            {t("home.editorialProductsCta")}
          </Link>
        </div>

        <div className="overflow-hidden -mx-6 px-6 lg:mx-0 lg:px-0 lg:overflow-visible">
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0">
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
    <section className="py-16 lg:py-32 bg-[var(--color-off-white)] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <p className="section-label text-center mb-3">
          {t("dealerBlock.label")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] text-center mb-16">
          {t("dealerBlock.heading")}
        </h2>

        <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
          {/* Left: Catalog Browser */}
          <div className="min-w-0">
            <CatalogBrowser />
          </div>

          {/* Right: Dealer Portal promo */}
          <div className="min-w-0 bg-[var(--color-deep)] p-6 md:p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-[var(--color-light-on-dark)]/30 mb-4">
                {t("dealerBlock.dealerLabel")}
              </p>
              <h3 className="heading-display text-2xl lg:text-3xl text-white mb-5">
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
    <section className="py-16 lg:py-32 bg-[var(--color-off-white)]">
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

        <div className="overflow-hidden -mx-6 px-6 lg:mx-0 lg:px-0 lg:overflow-visible">
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
      </div>
    </section>
  );
}

/* ─── Section 4: Shuffleboard Block ─── */
function ShuffleboardBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src={`${IMAGEKIT_BASE}/The_C_L__Bailey_Co__Master_Organizer/Shuffleboards/Viking/Antique_Oak/viking%20shb%20profile%20image_DQZaxvot3.jpg`}
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
        <div className="grid grid-cols-4 gap-6 md:flex md:flex-wrap md:justify-center md:gap-10 lg:gap-14">
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
    <section className="relative w-full min-h-[50vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src={`${IMAGEKIT_BASE}/The_C_L__Bailey_Co__Master_Organizer/Spectator_Chairs/Skylar/Warm_Chestnut/skylar%20Spec-chair_KmxSG58XqI.jpg`}
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
    <section className="py-16 lg:py-32 bg-[var(--color-cloud)]">
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
    <section className="bg-[var(--color-off-white)] overflow-hidden">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid lg:grid-cols-2 lg:min-h-[70vh]">

          {/* Left: Full-height lifestyle image */}
          <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
            <Image
              src="/images/trade-lifestyle.jpg"
              alt={t("trade.imageAlt")}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Right: Content panel */}
          <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20">

            <p className="section-label mb-4">
              {t("trade.heading")}
            </p>

            <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] mb-5">
              {t("trade.sectionHeading")}
            </h2>

            <p className="text-base text-[var(--color-body)] leading-relaxed mb-10 max-w-md">
              {t("trade.description")}
            </p>

            {/* Stat callout */}
            <div className="mb-10 pb-10 border-b border-[var(--color-cloud)]">
              <p className="heading-display text-[2.5rem] md:text-5xl text-[var(--color-primary)] mb-1">
                200+
              </p>
              <p className="section-label !text-[var(--color-mid-gray)]">
                {t("trade.statLabel")}
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-4 mb-10">
              {[t("trade.benefit1"), t("trade.benefit2"), t("trade.benefit3")].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0 mt-0.5 text-[var(--color-bronze)]"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-[13px] text-[var(--color-body)] leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="mb-10">
              <Link href="/dealer" className="btn-primary">
                {t("trade.applyCta")}
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--color-cloud)] mb-8" />

            {/* Consumer path */}
            <div>
              <p className="text-[13px] text-[var(--color-body)] mb-3">
                {t("trade.notTradeDescription")}
              </p>
              <Link
                href="/dealer"
                className="text-sm font-medium text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-0.5 hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)] transition-colors duration-300"
              >
                {t("trade.findDealerCta")} &rarr;
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Export assembled homepage sections ─── */
export default async function HomeSections() {
  const t = await getTranslations();

  return (
    <>
      <DealerLocator />
      <CategoryNav t={t} />
      <DealerPortalBlock t={t} />
      <ShuffleboardBlock t={t} />
      <FeaturedProducts t={t} />
      <FurnitureBlock t={t} />
      <HeritageSection t={t} />
      <TradeProgramBlock t={t} />
    </>
  );
}
