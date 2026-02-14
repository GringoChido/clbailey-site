import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DealerSearch from "@/components/ui/DealerSearch";

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
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-6 animate-fade-up">
          {t("dealer.title")}
        </h1>
        <p className="text-brown/60 max-w-lg mb-16 animate-fade-up animate-delay-1">
          {t("dealer.description")}
        </p>

        <DealerSearch />
      </div>
    </div>
  );
}
