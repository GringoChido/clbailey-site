import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Lifetime Guarantee | The C.L. Bailey Co.",
  description: "Every C.L. Bailey pool table and shuffleboard carries a lifetime structural guarantee. No fine print. No expiration.",
  openGraph: {
    title: "Lifetime Guarantee | C.L. Bailey & Co.",
    description:
      "Every C.L. Bailey pool table and shuffleboard carries a lifetime structural guarantee. No fine print. No expiration.",
    type: "website",
  },
  alternates: {
    canonical: "https://clbailey.com/en/lifetime-guarantee",
    languages: {
      en: "https://clbailey.com/en/lifetime-guarantee",
      es: "https://clbailey.com/es/lifetime-guarantee",
    },
  },
};

export default async function LifetimeGuaranteePage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="heading-display text-3xl md:text-4xl mb-16">
            {t("guarantee.title")}
          </h1>
        </ScrollReveal>

        {/* Promise */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="section-label mb-3">
              {t("guarantee.promiseLabel")}
            </p>
            <div className="h-px bg-[var(--color-cloud)] mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="heading-sub text-2xl lg:text-3xl mb-8 max-w-xl">
              We guarantee the structural integrity of every table for the lifetime of the original owner.
            </p>
            <div className="space-y-6 text-[13px] text-[var(--color-body)] leading-[26px] max-w-2xl">
              <p>{t("guarantee.promiseP1")}</p>
              <p>{t("guarantee.promiseP2")}</p>
            </div>
          </ScrollReveal>
        </div>

        {/* What is Covered */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="section-label mb-3">
              {t("guarantee.coveredLabel")}
            </p>
            <div className="h-px bg-[var(--color-cloud)] mb-8" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: t("guarantee.covered1Title"), text: t("guarantee.covered1Desc") },
              { title: t("guarantee.covered2Title"), text: t("guarantee.covered2Desc") },
              { title: t("guarantee.covered3Title"), text: t("guarantee.covered3Desc") },
              { title: t("guarantee.covered4Title"), text: t("guarantee.covered4Desc") },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i + 1}>
                <h3 className="heading-card mb-2">{item.title}</h3>
                <p className="text-[13px] text-[var(--color-body)] leading-[26px]">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* How to Claim */}
        <div>
          <ScrollReveal>
            <p className="section-label mb-3">
              {t("guarantee.claimLabel")}
            </p>
            <div className="h-px bg-[var(--color-cloud)] mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="max-w-2xl space-y-4 text-[13px] text-[var(--color-body)] leading-[26px]">
              <p>{t("guarantee.claimP1")}</p>
              <p>{t("guarantee.claimP2")}</p>
              <p>{t("guarantee.claimP3")}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
