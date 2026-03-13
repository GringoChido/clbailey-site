import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, img } from "@/lib/products";

export const metadata: Metadata = {
  title: "Velocity Pro Worsted Cloth | The C.L. Bailey Co.",
  description: "87% wool worsted construction for professional-grade play. Faster ball speed, spill resistance, and extended cloth life.",
  openGraph: {
    title: "Velocity Pro Worsted Cloth | C.L. Bailey & Co.",
    description:
      "87% wool worsted construction for professional-grade play. Faster ball speed, spill resistance, and extended cloth life.",
    type: "website",
  },
  alternates: {
    canonical: "https://clbailey.com/en/velocity-pro-cloth",
    languages: {
      en: "https://clbailey.com/en/velocity-pro-cloth",
      es: "https://clbailey.com/es/velocity-pro-cloth",
    },
  },
};

const feltColors = [
  { name: "Tournament Green", color: "#2D5A27" },
  { name: "Burgundy", color: "#6B1D2A" },
  { name: "Navy", color: "#1B2A4A" },
  { name: "Camel", color: "#C4A55A" },
  { name: "Black", color: "#1D1D1D" },
  { name: "Red", color: "#8B2020" },
  { name: "Charcoal", color: "#3C3C3C" },
  { name: "Steel Blue", color: "#3A5F7A" },
];

const comparisonRows = [
  { feature: "Construction", pro: "Worsted", standard: "Woolen" },
  { feature: "Wool Content", pro: "87%", standard: "~60%" },
  { feature: "Resists tracks and grooves", pro: true, standard: false },
  { feature: "Repels liquid spills", pro: true, standard: false },
  { feature: "Eliminates pilling/fuzzing", pro: true, standard: false },
  { feature: "Minimizes ball burns", pro: true, standard: false },
  { feature: "Ball speed", pro: "Faster, consistent", standard: "Slower, variable" },
  { feature: "Longevity", pro: "Extended", standard: "Standard" },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block">
      <path d="M3 8.5L6.5 12L13 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default async function VelocityProClothPage() {
  const t = await getTranslations("velocityPro");
  const tCommon = await getTranslations();
  const featured = getFeaturedProducts().slice(0, 3);

  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/velocity-pro/hero.jpg"
          alt="Velocity Pro Worsted Cloth surface texture"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-[var(--overlay-soft)]" />
        <div className="relative z-10 text-center px-6 py-20">
          <p className="section-label !text-white/40 mb-4">
            {t("label")}
          </p>
          <h1 className="heading-hero text-white mb-6">
            {t("heading")}
          </h1>
          <p className="heading-sub !text-white/50 mb-12">
            {t("subheading")}
          </p>
          <a href="#features" className="btn-outline-white">
            {tCommon("common.learnMore")}
          </a>
        </div>
      </section>

      {/* Section 2: Why Velocity Pro */}
      <section id="features" className="py-24 lg:py-32 bg-[var(--color-off-white)]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <p className="section-label text-center mb-3">
            {t("whyLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.5rem] text-center mb-16">
            {t("whyHeading")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cloud)]">
              <Image
                src="/images/velocity-pro/detail.jpg"
                alt="Close-up of Velocity Pro worsted cloth weave"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
                Worsted cloth features a tighter, denser weave than standard woolen billiard felt. The result is a faster, more consistent playing surface that professional and serious recreational players prefer. Ball speed is predictable from the first break to the last shot.
              </p>
              <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
                The 87% wool content in Velocity Pro cloth resists the track and groove development that degrades accuracy over time. Standard woolen cloth compresses under repeated play, creating visible paths that redirect ball movement. Worsted construction maintains its flat, even surface significantly longer.
              </p>
              <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
                Velocity Pro naturally repels liquid spills and stains, giving you time to clean up before damage occurs. The tight weave also eliminates the pilling and fuzzing common with standard cloth, keeping the surface clean and professional in appearance.
              </p>
              <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
                Higher wool content reduces ball burns, the discoloration caused by friction during powerful shots. Combined with superior resistance to wear, Velocity Pro extends cloth life well beyond what standard woolen alternatives can offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Comparison Table */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label text-center mb-3">
            {t("comparisonLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.5rem] text-center mb-16">
            {t("comparisonHeading")}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-cloud)]">
                  <th className="metadata text-left pb-4 pr-8">&nbsp;</th>
                  <th className="metadata text-left pb-4 pr-8">Velocity Pro</th>
                  <th className="metadata text-left pb-4">Standard</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-[var(--color-cloud)]">
                    <td className="py-4 pr-8 text-sm text-[var(--color-primary)]">
                      {row.feature}
                    </td>
                    <td className="py-4 pr-8 text-sm text-[var(--color-body)]">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? <CheckIcon /> : <span className="text-[var(--color-mid-gray)]">&mdash;</span>
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className="py-4 text-sm text-[var(--color-body)]">
                      {typeof row.standard === "boolean" ? (
                        row.standard ? <CheckIcon /> : <span className="text-[var(--color-mid-gray)]">&mdash;</span>
                      ) : (
                        row.standard
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Available Colors */}
      <section className="py-24 lg:py-32 bg-[var(--color-off-white)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <p className="section-label mb-3">
            {t("colorsLabel")}
          </p>
          <h2 className="heading-display text-3xl md:text-[2.5rem] mb-16">
            {t("colorsHeading")}
          </h2>
          <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
            {feltColors.map((swatch) => (
              <div key={swatch.name} className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-[var(--color-cloud)]"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="metadata !text-[var(--color-body)]">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Which Tables Include Velocity Pro */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="section-label mb-3">
              {t("includedLabel")}
            </p>
            <h2 className="heading-display text-3xl md:text-[2.5rem] mb-5">
              {t("includedHeading")}
            </h2>
            <p className="text-[13px] text-[var(--color-body)] leading-[26px] max-w-lg mx-auto">
              Velocity Pro worsted cloth comes standard on our Skylar, Viking, and Dutchess models. It is available as a premium upgrade on all other C.L. Bailey pool tables through your authorized dealer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {featured.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.category}/${product.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[var(--color-off-white)] border border-[var(--color-cloud)] mb-4">
                  <Image
                    src={img(product.images.hero)}
                    alt={product.name}
                    width={640}
                    height={480}
                    className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <h3 className="heading-card mb-1">{product.name}</h3>
                <p className="text-sm text-[var(--color-body)]">{product.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-24 lg:py-32 bg-[var(--color-deep)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="heading-display text-3xl md:text-[2.5rem] !text-[var(--color-silver)] mb-5">
            {t("ctaHeading")}
          </h2>
          <p className="text-[13px] text-[var(--color-body)] leading-[26px] max-w-lg mx-auto mb-12">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dealer" className="btn-outline-white">
              {t("findDealer")}
            </Link>
            <Link href="/catalogs" className="btn-outline-white">
              {t("downloadSpec")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
