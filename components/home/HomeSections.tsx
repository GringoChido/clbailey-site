import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, img } from "@/lib/products";

/* ─── Section 1: Category Navigation — Arhaus "Shop Everything New" pattern ─── */
function CategoryNav({ t }: { t: (key: string) => string }) {
  const items = [
    {
      label: t("museum.poolTables"),
      subtitle: t("museum.nineModels"),
      href: "/products/pool-tables",
      image: "/images/products/pool-tables/viking/hero.jpg",
      alt: t("museum.altPoolTables"),
    },
    {
      label: t("museum.shuffleboards"),
      subtitle: t("museum.nineToFourteen"),
      href: "/products/shuffleboards",
      image: "/images/products/shuffleboards/viking-shuffleboard/hero.jpg",
      alt: t("museum.altShuffleboards"),
    },
    {
      label: t("museum.furniture"),
      subtitle: t("museum.completeTheRoom"),
      href: "/products/game-room-furniture",
      image: "/images/products/game-room-furniture/viking-furniture/chair-detail.jpg",
      alt: t("museum.altFurniture"),
    },
    {
      label: t("museum.cueRacks"),
      subtitle: t("museum.wallAndFloor"),
      href: "/products/cue-racks",
      image: "/images/products/cue-racks/carved-leg-cue-rack/hero.jpg",
      alt: t("museum.altCueRacks"),
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <p className="section-label text-center mb-3">
          {t("museum.portfolioLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-primary text-center mb-16">
          {t("home.categoryHeading")}
        </h2>

        {/* Horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex-shrink-0 w-[260px] lg:w-auto"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-cloud">
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

/* ─── Section 2: Editorial Feature — Arhaus "The Outdoor Preview" full-bleed ─── */
function EditorialFeature({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/products/pool-tables/dutchess/hero.jpg"
        alt={t("museum.altDutchess")}
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
      <div className="relative z-10 text-center px-6 py-20">
        <p className="section-label !text-white/40 mb-4">
          {t("museum.catalogLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-8">
          {t("museum.requestSourcebook")}
        </h2>
        <Link href="/catalogs" className="btn-outline-white">
          {t("museum.viewCatalogs")}
        </Link>
      </div>
    </section>
  );
}

/* ─── Section 3: Featured Products — horizontal scroll ─── */
function FeaturedProducts({ t }: { t: (key: string) => string }) {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 lg:py-32 bg-cloud">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="section-label mb-3">
              {t("museum.portfolioLabel")}
            </p>
            <h2 className="heading-display text-3xl md:text-[2.5rem] text-primary">
              {t("home.featuredHeading")}
            </h2>
            <p className="text-base text-body mt-3 max-w-md leading-relaxed">
              {t("home.featuredSubheading")}
            </p>
          </div>
          <Link
            href="/products/pool-tables"
            className="text-sm font-medium text-primary border-b border-primary pb-0.5 hover:border-body transition-[border-color] duration-300 whitespace-nowrap"
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
              <div className="aspect-[4/3] overflow-hidden bg-whisper mb-5">
                <Image
                  src={img(product.images.hero)}
                  alt={product.name}
                  width={640}
                  height={480}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <h3 className="text-base font-medium text-primary tracking-[0.01em]">
                {product.name}
              </h3>
              <p className="text-sm text-body mt-1">{product.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Shuffleboard Category Block — full-bleed ─── */
function ShuffleboardBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src="/images/products/shuffleboards/viking-shuffleboard/lifestyle.jpg"
        alt={t("home.shuffleboardAlt")}
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/65 lg:via-black/30 lg:to-transparent" />
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 py-20">
        <div className="max-w-lg">
          <p className="section-label !text-white/40 mb-4">
            {t("home.shuffleboardLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-5">
            {t("home.shuffleboardHeading")}
          </h2>
          <p className="text-base text-white/50 mb-10 leading-relaxed">
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

/* ─── Section 5: Finishes — swatches with names ─── */
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
    <section className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <p className="section-label mb-3">
          {t("home.finishesLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-primary mb-4">
          {t("home.finishesHeading")}
        </h2>
        <p className="text-base text-body max-w-lg mx-auto mb-16 leading-relaxed">
          {t("home.finishesDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
          {allFinishes.map((finish) => (
            <div key={finish.name} className="group flex flex-col items-center gap-3 cursor-pointer">
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-[var(--color-cloud)] group-hover:border-[var(--color-primary)] transition-[border-color] duration-300"
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

/* ─── Section 7: Game Room Furniture — full-bleed ─── */
function FurnitureBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
      <Image
        src="/images/products/game-room-furniture/skylar-furniture/hero.jpg"
        alt={t("home.furnitureAlt")}
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/65 lg:via-black/30 lg:to-transparent" />
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 py-20">
        <div className="max-w-lg">
          <p className="section-label !text-white/40 mb-4">
            {t("home.furnitureLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-5">
            {t("home.furnitureHeading")}
          </h2>
          <p className="text-base text-white/50 mb-10 leading-relaxed">
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

/* ─── Section 6: Heritage closing ─── */
function HeritageSection({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-24 lg:py-32 bg-cloud">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="section-label mb-4">
          {t("museum.heritageLabel")}
        </p>
        <h2 className="heading-display text-3xl md:text-[2.5rem] text-primary mb-5">
          {t("home.heritageHeading")}
        </h2>
        <p className="text-base text-body max-w-lg mx-auto mb-12 leading-relaxed">
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

/* ─── Section 8: Trade Program Block ─── */
function TradeProgramBlock({ t }: { t: (key: string) => string }) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-off-white)]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          {/* Part 1: Hero message */}
          <h2 className="heading-display text-3xl md:text-[2.5rem] text-[var(--color-primary)] mb-5">
            {t("trade.heading")}
          </h2>
          <p className="text-base text-[var(--color-body)] leading-relaxed">
            {t("trade.description")}
          </p>

          {/* Divider */}
          <div className="border-t border-[var(--color-cloud)] my-12" />

          {/* Part 2: Why Join */}
          <h3 className="heading-sub mb-6">
            {t("trade.whyJoinHeading")}
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="text-base text-[var(--color-body)] leading-relaxed">
              {t("trade.benefit1")}
            </li>
            <li className="text-base text-[var(--color-body)] leading-relaxed">
              {t("trade.benefit2")}
            </li>
            <li className="text-base text-[var(--color-body)] leading-relaxed">
              {t("trade.benefit3")}
            </li>
          </ul>
          <Link href="/dealer" className="btn-primary">
            {t("trade.applyCta")}
          </Link>

          {/* Divider */}
          <div className="border-t border-[var(--color-cloud)] my-12" />

          {/* Part 3: Not a Trade Professional */}
          <h3 className="heading-sub mb-5">
            {t("trade.notTradeHeading")}
          </h3>
          <p className="text-base text-[var(--color-body)] leading-relaxed mb-8">
            {t("trade.notTradeDescription")}
          </p>
          <Link href="/dealer" className="btn-primary">
            {t("trade.findDealerCta")}
          </Link>
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
      <CategoryNav t={t} />
      <EditorialFeature t={t} />
      <FeaturedProducts t={t} />
      <ShuffleboardBlock t={t} />
      <FinishesSection t={t} />
      <FurnitureBlock t={t} />
      <HeritageSection t={t} />
      <TradeProgramBlock t={t} />
    </>
  );
}
