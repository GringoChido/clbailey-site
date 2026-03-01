import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DealerSearch from "@/components/ui/DealerSearch";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Find a Dealer",
  description:
    "Find an authorized C.L. Bailey dealer near you. Every table is sold, delivered, and professionally installed by a local dealer.",
  alternates: {
    canonical: "https://clbailey.com/en/dealer",
    languages: {
      en: "https://clbailey.com/en/dealer",
      es: "https://clbailey.com/es/dealer",
    },
  },
};

export default async function DealerPage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="heading-display text-3xl md:text-4xl mb-4">
            {t("dealer.title")}
          </h1>
          <p className="text-[13px] text-[var(--color-body)] leading-[26px] max-w-lg mb-16">
            {t("dealer.description")}
          </p>
        </ScrollReveal>

        <DealerSearch />
      </div>
    </div>
  );
}
