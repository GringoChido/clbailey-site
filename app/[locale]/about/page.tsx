import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { company } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us | The C.L. Bailey Co.",
  description:
    "The story behind C.L. Bailey — three decades of billiards industry experience, solid hardwood construction, and a lifetime guarantee on every table.",
};

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-16">
            {t("about.title")}
          </h1>
        </ScrollReveal>

        {/* Origin */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("about.storyLabel")}
            </p>
            <div className="h-px bg-gray-200 mb-8" />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal delay={1}>
              <p className="text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                Three decades of industry experience. One uncompromising standard.
              </p>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>{t("about.storyP1")}</p>
                <p>{t("about.storyP2")}</p>
                <p>{t("about.storyP3")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src="/images/brand/nameplate.jpg"
                  alt="C.L. Bailey nameplate"
                  fill
                  className="object-cover"
                  sizes="600px"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Heritage Badge */}
        <ScrollReveal>
          <div className="mb-24 py-16 border-y border-gray-200 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              {t("about.heritageLabel")}
            </p>
            <p className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              {t("about.heritageStatement")}
            </p>
            <p className="text-sm text-gray-400 mt-4 max-w-md mx-auto">
              {t("about.heritageSubtext")}
            </p>
          </div>
        </ScrollReveal>

        {/* Principles */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("about.principlesLabel")}
            </p>
            <div className="h-px bg-gray-200 mb-8" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: t("about.principle1Title"),
                text: t("about.principle1Desc"),
              },
              {
                title: t("about.principle2Title"),
                text: t("about.principle2Desc"),
              },
              {
                title: t("about.principle3Title"),
                text: t("about.principle3Desc"),
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i + 1}>
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {t("about.visitLabel")}
            </p>
            <div className="h-px bg-gray-200 mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="max-w-md">
              <p className="text-xl font-medium mb-4">{company.name}</p>
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>{company.address.street}</p>
                <p>{company.address.suite}</p>
                <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
              </div>
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>
                  <a href={`tel:${company.phone.replace(/-/g, "")}`} className="hover:text-gray-900 transition-colors">
                    {company.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${company.email}`} className="hover:text-gray-900 transition-colors">
                    {company.email}
                  </a>
                </p>
              </div>
              <div className="text-sm text-gray-400">
                <p>{company.hours.weekday}</p>
                <p>{company.hours.friday}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
