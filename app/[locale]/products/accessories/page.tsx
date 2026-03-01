import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCategory, getProductsByCategory, img } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Accessories | The C.L. Bailey Co.",
  description: "Premium billiard accessories, from professional-grade ball sets to handcrafted leather pockets.",
};

export default async function AccessoriesPage() {
  const t = await getTranslations();
  const category = getCategory("accessories")!;
  const products = getProductsByCategory("accessories");

  return (
    <>
      {/* Category Hero Banner */}
      <section className="relative w-full h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image
          src={img(category.heroImage)}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-10 pb-14">
          <p className="section-label !text-white/40 mb-3">
            {t("common.products")}
          </p>
          <h1 className="heading-display text-3xl md:text-[2.75rem] lg:text-5xl text-white mb-3">
            {category.name}
          </h1>
          <p className="text-base text-white/50 max-w-lg">
            {category.description}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ScrollReveal key={product.slug} delay={Math.min(i + 1, 6)}>
                <ProductCard product={product} priority={i < 3} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
