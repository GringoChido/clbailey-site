import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";

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
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-16 animate-fade-up">
          {t("careGuide.title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <SectionLabel label={t("careGuide.label")} />
          <div className="border-t border-brown/20 pt-4">
            <p className="font-serif text-xl leading-relaxed mb-12 max-w-2xl animate-fade-up animate-delay-2">
              {t("careGuide.intro")}
            </p>

            <div className="space-y-12 max-w-2xl">
              {sections.map((section, i) => (
                <div key={section.title} className={`animate-fade-up animate-delay-${Math.min(i + 2, 6)}`}>
                  <h3 className="font-serif text-xl mb-4">{section.title}</h3>
                  <p className="text-sm text-brown/70 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
