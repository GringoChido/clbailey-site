import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="cine-strip cine-strip--full">
      <Image
        src="/images/products/pool-tables/skylar/hero.jpg"
        alt={t("altImage")}
        fill
        className="cine-strip__img"
        priority
        sizes="100vw"
      />
      {/* Ink overlay — #121212 at 30% */}
      <div className="absolute inset-0 bg-ink/30" />

      <div className="cine-strip__content flex flex-col items-center text-center">
        <div className="max-w-3xl animate-fade-up">
          <p className="heritage-label text-white/50 mb-12">
            {t("craftsmanship")}
          </p>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-20 tracking-tight">
            {t("headline")}
          </h1>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/products"
              className="btn-heritage border border-white/10"
            >
              {t("exploreCollection")}
            </Link>
          </div>
        </div>
      </div>

      {/* "The Archive" scroll indicator — absolute positioned at bottom */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
        <span className="heritage-label text-white">{t("archive")}</span>
        <div className="w-[0.5px] h-20 bg-white" />
      </div>
    </section>
  );
}
