import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sizeChart } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Room Size Chart | The C.L. Bailey Co.",
  description: "Determine the right pool table size for your room. Minimum room dimensions for 7-foot, 8-foot, and 9-foot tables.",
  openGraph: {
    title: "Room Size Chart | C.L. Bailey & Co.",
    description:
      "Determine the right pool table size for your room. Minimum room dimensions for 7-foot, 8-foot, and 9-foot tables.",
    type: "website",
  },
  alternates: {
    canonical: "https://clbailey.com/en/room-size",
    languages: {
      en: "https://clbailey.com/en/room-size",
      es: "https://clbailey.com/es/room-size",
    },
  },
};

const tableData = Object.entries(sizeChart).map(([size, dims]) => ({
  size,
  ...dims,
}));

export default async function RoomSizePage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="heading-display text-3xl md:text-4xl mb-16">
            {t("roomSize.title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="section-label mb-3">
            {t("roomSize.label")}
          </p>
          <div className="h-px bg-[var(--color-cloud)] mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="heading-sub text-xl mb-10 max-w-2xl">
            {t("roomSize.description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl text-sm">
              <thead>
                <tr className="border-b border-[var(--color-cloud)]">
                  <th className="text-left py-4 pr-8 metadata !text-[var(--color-mid-gray)]">{t("roomSize.tableSize")}</th>
                  <th className="text-left py-4 pr-8 metadata !text-[var(--color-mid-gray)]">{t("roomSize.minRoom")}</th>
                  <th className="text-left py-4 metadata !text-[var(--color-mid-gray)]">{t("roomSize.recommended")}</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.size} className="border-b border-[var(--color-cloud)]">
                    <td className="py-4 pr-8 text-[var(--color-primary)] font-medium">{row.size}</td>
                    <td className="py-4 pr-8 text-[var(--color-body)]">{row.min}</td>
                    <td className="py-4 text-[var(--color-body)]">{row.recommended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <div className="mt-10 max-w-2xl space-y-4">
            <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
              {t("roomSize.note1")}
            </p>
            <p className="text-[13px] text-[var(--color-body)] leading-[26px]">
              {t("roomSize.note2")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
