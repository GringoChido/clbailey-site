import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Lifetime Guarantee | The C.L. Bailey Co.",
  description: "Every C.L. Bailey pool table and shuffleboard carries a lifetime structural guarantee. No fine print. No expiration.",
};

export default async function LifetimeGuaranteePage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-16">
            {t("guarantee.title")}
          </h1>
        </ScrollReveal>

        {/* Promise */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("guarantee.promiseLabel")}
            </p>
            <div className="h-px bg-gray-200 mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="text-2xl lg:text-3xl font-light leading-relaxed mb-8 max-w-xl">
              We guarantee the structural integrity of every table for the lifetime of the original owner.
            </p>
            <div className="space-y-6 text-gray-600 leading-relaxed max-w-2xl">
              <p>{t("guarantee.promiseP1")}</p>
              <p>{t("guarantee.promiseP2")}</p>
            </div>
          </ScrollReveal>
        </div>

        {/* What is Covered */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("guarantee.coveredLabel")}
            </p>
            <div className="h-px bg-gray-200 mb-8" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: t("guarantee.covered1Title"), text: t("guarantee.covered1Desc") },
              { title: t("guarantee.covered2Title"), text: t("guarantee.covered2Desc") },
              { title: t("guarantee.covered3Title"), text: t("guarantee.covered3Desc") },
              { title: t("guarantee.covered4Title"), text: t("guarantee.covered4Desc") },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i + 1}>
                <h3 className="text-base font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* How to Claim */}
        <div>
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("guarantee.claimLabel")}
            </p>
            <div className="h-px bg-gray-200 mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="max-w-2xl space-y-4 text-gray-600 leading-relaxed">
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
