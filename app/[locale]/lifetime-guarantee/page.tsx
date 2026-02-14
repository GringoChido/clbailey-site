import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Lifetime Guarantee | The C.L. Bailey Co.",
  description: "Every C.L. Bailey pool table and shuffleboard carries a lifetime structural guarantee. No fine print. No expiration.",
};

export default async function LifetimeGuaranteePage() {
  const t = await getTranslations();

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-16 animate-fade-up">
          {t("guarantee.title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-24">
          <SectionLabel label={t("guarantee.promiseLabel")} />
          <div className="border-t border-brown/20 pt-4 animate-fade-up animate-delay-2">
            <p className="font-serif text-2xl lg:text-3xl leading-relaxed mb-8 max-w-xl">
              We guarantee the structural integrity of every table for the lifetime of the original owner.
            </p>
            <div className="space-y-6 text-brown/70 leading-relaxed max-w-2xl">
              <p>
                {t("guarantee.promiseP1")}
              </p>
              <p>
                {t("guarantee.promiseP2")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-24">
          <SectionLabel label={t("guarantee.coveredLabel")} />
          <div className="border-t border-brown/20 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: t("guarantee.covered1Title"), text: t("guarantee.covered1Desc") },
                { title: t("guarantee.covered2Title"), text: t("guarantee.covered2Desc") },
                { title: t("guarantee.covered3Title"), text: t("guarantee.covered3Desc") },
                { title: t("guarantee.covered4Title"), text: t("guarantee.covered4Desc") },
              ].map((item, i) => (
                <div key={item.title} className={`animate-fade-up animate-delay-${i + 2}`}>
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-brown/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <SectionLabel label={t("guarantee.claimLabel")} />
          <div className="border-t border-brown/20 pt-4 animate-fade-up animate-delay-4">
            <div className="max-w-2xl space-y-4 text-brown/70 leading-relaxed">
              <p>
                {t("guarantee.claimP1")}
              </p>
              <p>
                {t("guarantee.claimP2")}
              </p>
              <p>
                {t("guarantee.claimP3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
