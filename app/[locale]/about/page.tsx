import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";
import { company } from "@/lib/products";

export const metadata: Metadata = {
  title: "About Us | The C.L. Bailey Co.",
  description:
    "The story behind C.L. Bailey — three decades of billiards industry experience, solid hardwood construction, and a lifetime guarantee on every table.",
};

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-16 animate-fade-up">
          {t("about.title")}
        </h1>

        {/* Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-24">
          <SectionLabel label={t("about.storyLabel")} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-brown/20 pt-4">
            <div className="animate-fade-up animate-delay-2">
              <p className="font-serif text-2xl lg:text-3xl leading-relaxed mb-8">
                Three decades of industry experience. One uncompromising standard.
              </p>
              <div className="space-y-6 text-brown/70 leading-relaxed">
                <p>
                  {t("about.storyP1")}
                </p>
                <p>
                  {t("about.storyP2")}
                </p>
                <p>
                  {t("about.storyP3")}
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden animate-fade-up animate-delay-3">
              <Image
                src="/images/brand/nameplate.jpg"
                alt="C.L. Bailey nameplate"
                fill
                className="object-cover"
                sizes="600px"
              />
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-24">
          <SectionLabel label={t("about.principlesLabel")} />
          <div className="border-t border-brown/20 pt-4">
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
                <div key={item.title} className={`animate-fade-up animate-delay-${i + 3}`}>
                  <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-brown/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <SectionLabel label={t("about.visitLabel")} />
          <div className="border-t border-brown/20 pt-4 animate-fade-up animate-delay-4">
            <div className="max-w-md">
              <p className="font-serif text-xl mb-4">{company.name}</p>
              <div className="text-sm text-brown/60 space-y-1 mb-4">
                <p>{company.address.street}</p>
                <p>{company.address.suite}</p>
                <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
              </div>
              <div className="text-sm text-brown/60 space-y-1 mb-4">
                <p>
                  <a href={`tel:${company.phone.replace(/-/g, "")}`} className="hover:text-brown transition-colors">
                    {company.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${company.email}`} className="hover:text-brown transition-colors">
                    {company.email}
                  </a>
                </p>
              </div>
              <div className="text-sm text-brown/40">
                <p>{company.hours.weekday}</p>
                <p>{company.hours.friday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
