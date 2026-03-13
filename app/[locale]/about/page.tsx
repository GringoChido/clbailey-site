import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { company } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us | The C.L. Bailey Co.",
  description:
    "The story behind C.L. Bailey: three decades of billiards industry experience, solid hardwood construction, and a lifetime guarantee on every table.",
  openGraph: {
    title: "About Us | C.L. Bailey & Co.",
    description:
      "Three decades of billiards industry experience. Solid hardwood construction and a lifetime guarantee on every table.",
    type: "website",
  },
  alternates: {
    canonical: "https://clbailey.com/en/about",
    languages: {
      en: "https://clbailey.com/en/about",
      es: "https://clbailey.com/es/about",
    },
  },
};

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="heading-display text-3xl md:text-4xl mb-16">
            {t("about.title")}
          </h1>
        </ScrollReveal>

        {/* Origin */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="section-label mb-3">
              {t("about.storyLabel")}
            </p>
            <div className="h-px bg-[var(--color-cloud)] mb-8" />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal delay={1}>
              <p className="heading-sub text-2xl lg:text-3xl mb-8">
                {t("about.storySubheading")}
              </p>
              <div className="space-y-6 text-[13px] text-[var(--color-body)] leading-[26px]">
                <p>{t("about.storyP1")}</p>
                <p>{t("about.storyP2")}</p>
                <p>{t("about.storyP3")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-off-white)]">
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
          <div className="mb-24 py-16 border-y border-[var(--color-cloud)] text-center">
            <p className="section-label mb-4">
              {t("about.heritageLabel")}
            </p>
            <p className="heading-display text-4xl md:text-5xl lg:text-6xl">
              {t("about.heritageStatement")}
            </p>
            <p className="text-sm text-[var(--color-mid-gray)] mt-4 max-w-md mx-auto">
              {t("about.heritageSubtext")}
            </p>
          </div>
        </ScrollReveal>

        {/* Principles */}
        <div className="mb-24">
          <ScrollReveal>
            <p className="section-label mb-3">
              {t("about.principlesLabel")}
            </p>
            <div className="h-px bg-[var(--color-cloud)] mb-8" />
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
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="text-[13px] text-[var(--color-body)] leading-[26px]">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <ScrollReveal>
            <p className="section-label mb-3">
              {t("about.visitLabel")}
            </p>
            <div className="h-px bg-[var(--color-cloud)] mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="max-w-md">
              <p className="heading-card text-xl mb-4">{company.name}</p>
              <div className="text-sm text-[var(--color-body)] space-y-1 mb-4">
                <p>{company.address.street}</p>
                <p>{company.address.suite}</p>
                <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
              </div>
              <div className="text-sm text-[var(--color-body)] space-y-1 mb-4">
                <p>
                  <a href={`tel:${company.phone.replace(/-/g, "")}`} className="hover:text-[var(--color-primary)] transition-colors duration-300">
                    {company.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${company.email}`} className="hover:text-[var(--color-primary)] transition-colors duration-300">
                    {company.email}
                  </a>
                </p>
              </div>
              <div className="text-sm text-[var(--color-mid-gray)]">
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
