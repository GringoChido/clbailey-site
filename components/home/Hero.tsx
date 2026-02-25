import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/products/pool-tables/skylar/hero.jpg"
        alt={t("altImage")}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
          {t("craftsmanship")}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
          {t("headline")}
        </h1>
        <p className="text-lg text-white/70 font-normal max-w-lg mx-auto mb-10">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="border border-white text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            {t("exploreCollection")}
          </Link>
          <Link
            href="/dealer"
            className="bg-white text-gray-900 px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
          >
            {t("ctaDealer")}
          </Link>
        </div>
      </div>
    </section>
  );
}
