import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/products/pool-tables/skylar/hero.jpg"
          alt={t("altImage")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Cinematic overlay — darker at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/15" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <p className="section-label !text-white/40 mb-5 animate-fade-up">
            {t("presenting")}
          </p>
          <h1 className="heading-hero text-white mb-6 animate-fade-up animate-delay-1">
            {t("headline")}
          </h1>
          <p className="text-lg font-light text-white/55 max-w-lg mx-auto mb-14 leading-relaxed animate-fade-up animate-delay-2">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up animate-delay-3">
            <Link href="/products" className="btn-outline-white">
              {t("exploreCollection")}
            </Link>
            <Link href="/dealer" className="btn-primary !bg-white !text-ink hover:!bg-white/90">
              {t("ctaDealer")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in animate-delay-5">
          <div className="w-[1px] h-10 bg-white/20 mx-auto mb-2" />
          <span className="text-[0.625rem] tracking-[0.2em] uppercase text-white/30">
            {t("scrollLabel")}
          </span>
        </div>
      </section>
    </>
  );
}
