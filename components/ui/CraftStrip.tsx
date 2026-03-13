import { getTranslations } from "next-intl/server";
import { TreePine, ShieldCheck, MapPin } from "lucide-react";

const pillars = [
  { icon: TreePine, titleKey: "pillar1Title", descKey: "pillar1Desc" },
  { icon: ShieldCheck, titleKey: "pillar2Title", descKey: "pillar2Desc" },
  { icon: MapPin, titleKey: "pillar3Title", descKey: "pillar3Desc" },
] as const;

const CraftStrip = async () => {
  const t = await getTranslations("craftStrip");

  return (
    <div className="bg-[var(--color-off-white)] border-y border-[var(--color-cloud)] py-12 lg:py-16">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {pillars.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="flex flex-col items-center text-center"
            >
              <Icon
                className="w-6 h-6 text-[var(--color-mid-gray)] mb-4"
                strokeWidth={1.25}
              />
              <p className="section-label mb-2">{t(titleKey)}</p>
              <p className="text-[13px] text-[var(--color-body)] leading-[22px] max-w-[280px]">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CraftStrip;
