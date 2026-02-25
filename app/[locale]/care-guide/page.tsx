import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Table Care Guide | The C.L. Bailey Co.",
  description: "Proper care and maintenance for your C.L. Bailey pool table, shuffleboard, and game room furniture.",
};

export default async function CareGuidePage() {
  const t = await getTranslations();

  const sections = [
    {
      title: t("careGuide.section1Title"),
      body: t("careGuide.section1Body"),
    },
    {
      title: t("careGuide.section2Title"),
      body: t("careGuide.section2Body"),
    },
    {
      title: t("careGuide.section3Title"),
      body: t("careGuide.section3Body"),
    },
    {
      title: t("careGuide.section4Title"),
      body: t("careGuide.section4Body"),
    },
    {
      title: t("careGuide.section5Title"),
      body: t("careGuide.section5Body"),
    },
  ];

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-16">
            {t("careGuide.title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            {t("careGuide.label")}
          </p>
          <div className="h-px bg-gray-200 mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="text-xl font-light leading-relaxed mb-12 max-w-2xl">
            {t("careGuide.intro")}
          </p>
        </ScrollReveal>

        <div className="space-y-12 max-w-2xl">
          {sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={Math.min(i + 2, 6)}>
              <h3 className="text-lg font-medium mb-4">{section.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
