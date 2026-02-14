import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SectionLabel from "@/components/ui/SectionLabel";
import { sizeChart } from "@/lib/products";

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
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-16 animate-fade-up">
          {t("roomSize.title")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-24">
          <SectionLabel label={t("roomSize.label")} />
          <div className="border-t border-brown/20 pt-4">
            <p className="font-serif text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up animate-delay-2">
              {t("roomSize.description")}
            </p>

            <div className="overflow-x-auto animate-fade-up animate-delay-3">
              <table className="w-full max-w-2xl text-sm">
                <thead>
                  <tr className="border-b border-brown/20">
                    <th className="text-left py-4 pr-8 text-xs uppercase tracking-wider text-brown/50 font-medium">{t("roomSize.tableSize")}</th>
                    <th className="text-left py-4 pr-8 text-xs uppercase tracking-wider text-brown/50 font-medium">{t("roomSize.minRoom")}</th>
                    <th className="text-left py-4 text-xs uppercase tracking-wider text-brown/50 font-medium">{t("roomSize.recommended")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.size} className="border-b border-brown/10">
                      <td className="py-4 pr-8 font-serif">{row.size}</td>
                      <td className="py-4 pr-8 text-brown/70">{row.min}</td>
                      <td className="py-4 text-brown/70">{row.recommended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 max-w-2xl space-y-4 animate-fade-up animate-delay-4">
              <p className="text-sm text-brown/60 leading-relaxed">
                {t("roomSize.note1")}
              </p>
              <p className="text-sm text-brown/60 leading-relaxed">
                {t("roomSize.note2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
