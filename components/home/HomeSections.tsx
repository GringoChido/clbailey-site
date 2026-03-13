import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, img, IMAGEKIT_BASE } from "@/lib/products";
import DealerLocator from "./DealerLocator";

/* ─── Section 1: Category Navigation — Asymmetric Bento Grid ─── */
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
    <section className="py-16 lg:py-28 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="section-label mb-3">
              {t("museum.portfolioLabel")}
            </p>
            <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)]">
              {t("home.categoryHeading")}
            </h2>
            <p className="text-base text-[var(--color-body)] mt-3 max-w-md leading-relaxed">
              {t("home.editorialProducts")}
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-0.5 hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)] transition-colors duration-300 whitespace-nowrap"
          >
            {t("home.editorialProductsCta")} &rarr;
          </Link>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[240px]">
          {/* Pool Tables — large hero tile, spans 7 cols and 2 rows */}
          <Link
            href={items[0].href}
            className="group relative overflow-hidden col-span-2 lg:col-span-7 row-span-2 bg-[var(--color-cloud)]"
          >
            <Image
              src={items[0].image}
              alt={items[0].alt}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/30 mb-2">
                {items[0].subtitle}
              </p>
              <h3 className="heading-display text-2xl lg:text-4xl !text-white">
                {items[0].label}
              </h3>
            </div>
          </Link>

          {/* Shuffleboards — tall right tile */}
          <Link
            href={items[1].href}
            className="group relative overflow-hidden col-span-1 lg:col-span-5 row-span-1 bg-[var(--color-cloud)]"
          >
            <Image
              src={items[1].image}
              alt={items[1].alt}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 50vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
              <p className="font-[family-name:var(--font-label)] text-[9px] font-medium uppercase tracking-[3px] text-white/30 mb-1.5">
                {items[1].subtitle}
              </p>
              <h3 className="heading-display text-lg lg:text-2xl !text-white">
                {items[1].label}
              </h3>
            </div>
          </Link>

          {/* Furniture */}
          <Link
            href={items[2].href}
            className="group relative overflow-hidden col-span-1 lg:col-span-5 row-span-1 bg-[var(--color-cloud)]"
          >
            <Image
              src={items[2].image}
              alt={items[2].alt}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 50vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
              <p className="font-[family-name:var(--font-label)] text-[9px] font-medium uppercase tracking-[3px] text-white/30 mb-1.5">
                {items[2].subtitle}
              </p>
              <h3 className="heading-display text-lg lg:text-2xl !text-white">
                {items[2].label}
              </h3>
            </div>
          </Link>

          {/* Cue Racks — bottom left */}
          <Link
            href={items[3].href}
            className="group relative overflow-hidden col-span-1 lg:col-span-6 row-span-1 bg-[var(--color-cloud)]"
          >
            <Image
              src={items[3].image}
              alt={items[3].alt}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
              <p className="font-[family-name:var(--font-label)] text-[9px] font-medium uppercase tracking-[3px] text-white/30 mb-1.5">
                {items[3].subtitle}
              </p>
              <h3 className="heading-display text-lg lg:text-2xl !text-white">
                {items[3].label}
              </h3>
            </div>
          </Link>

          {/* Accessories — bottom right */}
          <Link
            href={items[4].href}
            className="group relative overflow-hidden col-span-1 lg:col-span-6 row-span-1 bg-[var(--color-cloud)]"
          >
            <Image
              src={items[4].image}
              alt={items[4].alt}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 1024px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
              <p className="font-[family-name:var(--font-label)] text-[9px] font-medium uppercase tracking-[3px] text-white/30 mb-1.5">
                {items[4].subtitle}
              </p>
              <h3 className="heading-display text-lg lg:text-2xl !text-white">
                {items[4].label}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Dealer Portal Block — Full-width Dark Panel ─── */
function DealerPortalBlock({ t }: { t: (key: string) => string }) {
  const features = [
    {
      title: t("dealerBlock.feature1Title"),
      desc: t("dealerBlock.feature1Desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>
      ),
    },
    {
      title: t("dealerBlock.feature2Title"),
      desc: t("dealerBlock.feature2Desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
    {
      title: t("dealerBlock.feature3Title"),
      desc: t("dealerBlock.feature3Desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      title: t("dealerBlock.feature4Title"),
      desc: t("dealerBlock.feature4Desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-deep)]">
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 0% 50%, rgba(168,146,121,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 100% 50%, rgba(168,146,121,0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {/* Top: Label + Heading + Description */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-[var(--color-bronze)]/50 mb-5">
            {t("dealerBlock.dealerLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.5rem] lg:text-[3rem] !text-[var(--color-light-on-dark)] mb-5">
            {t("dealerBlock.dealerHeading")}
          </h2>
          <p className="text-[14px] leading-[26px] text-[var(--color-light-on-dark)]/40 max-w-lg mx-auto">
            {t("dealerBlock.dealerDescription")}
          </p>
        </div>

        {/* Feature grid — 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] mb-16 lg:mb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[var(--color-deep)] p-6 lg:p-8 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="text-[var(--color-bronze)]/60 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-[13px] font-medium text-[var(--color-light-on-dark)] tracking-[0.02em] mb-2">
                {feature.title}
              </h3>
              <p className="text-[11px] text-[var(--color-light-on-dark)]/30 leading-[20px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom: CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/dealer-portal" className="btn-outline-white">
            {t("dealerBlock.dealerLoginCta")}
          </Link>
          <Link
            href="/contact-us"
            className="text-[11px] font-[family-name:var(--font-label)] font-medium uppercase tracking-[2px] text-[var(--color-light-on-dark)]/25 hover:text-[var(--color-light-on-dark)]/50 transition-colors duration-300"
          >
            {t("dealerBlock.applyAccess")}
          </Link>
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
