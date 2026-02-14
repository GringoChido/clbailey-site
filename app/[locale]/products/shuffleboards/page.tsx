import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCategory, getProductsByCategory } from "@/lib/products";
import SectionLabel from "@/components/ui/SectionLabel";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Shuffleboards | The C.L. Bailey Co.",
  description: "Premium shuffleboards from 9 feet to 14 feet. Solid playfield. Precision scoring. Viking, Skylar, Tunbridge, and Level Best models.",
};

export default async function ShuffleboardsPage() {
  const t = await getTranslations("common");
  const category = getCategory("shuffleboards")!;
  const products = getProductsByCategory("shuffleboards");

  return (
    <div className="pt-32 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl lg:text-5xl mb-4 animate-fade-up">
          {category.name}
        </h1>
        <p className="text-brown/60 mb-16 max-w-xl animate-fade-up animate-delay-1">
          {category.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <SectionLabel label={t("collection")} />
          <div className="border-t border-brown/20 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, i) => (
                <div key={product.slug} className={`animate-fade-up animate-delay-${Math.min(i + 2, 6)}`}>
                  <ProductCard product={product} priority={i < 2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
