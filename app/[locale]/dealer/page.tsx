import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import DealerLocatorPage from "@/components/dealer/DealerLocatorPage";

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

export default async function DealerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DealerLocatorPage />;
}
