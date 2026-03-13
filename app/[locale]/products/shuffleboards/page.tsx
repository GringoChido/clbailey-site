import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCategory, getProductsByCategory, img } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Shuffleboards | The C.L. Bailey Co.",
    description:
      "Premium shuffleboards from 9 to 14 feet with solid playfield and precision scoring. Viking, Skylar, Tunbridge, and Level Best models. Dealer exclusive.",
    openGraph: {
      title: "Shuffleboards | C.L. Bailey & Co.",
      description:
        "Premium shuffleboards from 9 to 14 feet with solid playfield and precision scoring. Viking, Skylar, Tunbridge, and Level Best models.",
      type: "website",
    },
    alternates: {
      canonical: `https://clbailey.com/${locale}/products/shuffleboards`,
      languages: {
        en: "https://clbailey.com/en/products/shuffleboards",
        es: "https://clbailey.com/es/products/shuffleboards",
      },
    },
  };
}

export default async function ShuffleboardsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const tc = await getTranslations("categoryPage");
  const category = getCategory("shuffleboards")!;
  const products = getProductsByCategory("shuffleboards");

  return (
    <>
      {/* Category Hero Banner */}
      <section className="relative w-full h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image
          src={img(category.heroImage)}
          alt={tc("shuffleboardsName")}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 pb-14">
          <p className="section-label !text-white/40 mb-3">
            {t("products")}
          </p>
          <h1 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-3">
            {tc("shuffleboardsName")}
          </h1>
          <p className="text-base text-white/50 max-w-lg">
            {tc("shuffleboardsDesc")}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <ScrollReveal key={product.slug} delay={Math.min(i + 1, 6)}>
                <ProductCard product={product} priority={i < 2} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
