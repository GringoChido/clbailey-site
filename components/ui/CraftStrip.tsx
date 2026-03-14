import { getTranslations } from "next-intl/server";

const CraftStrip = async () => {
  const t = await getTranslations("craftStrip");

  return (
    <div className="bg-[var(--color-primary)] py-16 lg:py-20">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {/* Solid Hardwood */}
          <div className="relative pl-6 border-l border-white/20">
            <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
              {t("pillar1Title")}
            </p>
            <p className="text-[15px] leading-[1.7] font-light text-white/70 max-w-[300px]">
              {t("pillar1Desc")}
            </p>
          </div>

          {/* Lifetime Warranty */}
          <div className="relative pl-6 border-l border-white/20">
            <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
              {t("pillar2Title")}
            </p>
            <p className="text-[15px] leading-[1.7] font-light text-white/70 max-w-[300px]">
              {t("pillar2Desc")}
            </p>
          </div>

          {/* Handcrafted in Texas */}
          <div className="relative pl-6 border-l border-white/20">
            <p className="font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] text-white/40 mb-3">
              {t("pillar3Title")}
            </p>
            <p className="text-[15px] leading-[1.7] font-light text-white/70 max-w-[300px]">
              {t("pillar3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftStrip;
