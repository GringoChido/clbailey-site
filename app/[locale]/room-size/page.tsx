import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sizeChart } from "@/lib/products";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Room Size Chart | The C.L. Bailey Co.",
  description: "Determine the right pool table size for your room. Minimum room dimensions for 7-foot, 8-foot, and 9-foot tables.",
};

const tableData = Object.entries(sizeChart).map(([size, dims]) => ({
  size,
  ...dims,
}));

export default async function RoomSizePage() {
  const t = await getTranslations();

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-16">
            {t("roomSize.title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            {t("roomSize.label")}
          </p>
          <div className="h-px bg-gray-200 mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="text-xl font-light leading-relaxed mb-10 max-w-2xl">
            {t("roomSize.description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 pr-8 text-xs font-semibold uppercase tracking-widest text-gray-400">{t("roomSize.tableSize")}</th>
                  <th className="text-left py-4 pr-8 text-xs font-semibold uppercase tracking-widest text-gray-400">{t("roomSize.minRoom")}</th>
                  <th className="text-left py-4 text-xs font-semibold uppercase tracking-widest text-gray-400">{t("roomSize.recommended")}</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.size} className="border-b border-gray-100">
                    <td className="py-4 pr-8 font-medium">{row.size}</td>
                    <td className="py-4 pr-8 text-gray-600">{row.min}</td>
                    <td className="py-4 text-gray-600">{row.recommended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <div className="mt-10 max-w-2xl space-y-4">
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("roomSize.note1")}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("roomSize.note2")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
