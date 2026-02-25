import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCategory, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Game Room Furniture | The C.L. Bailey Co.",
  description: "Spectator chairs, storage benches, and cue racks designed to complement your C.L. Bailey pool table.",
};

export default async function GameRoomFurniturePage() {
  const t = await getTranslations("common");
  const category = getCategory("game-room-furniture")!;
  const products = getProductsByCategory("game-room-furniture");

  return (
    <div className="pt-28 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            {category.name}
          </h1>
          <p className="text-gray-500 mb-12 max-w-xl">
            {category.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <ScrollReveal key={product.slug} delay={Math.min(i + 1, 6)}>
              <ProductCard product={product} priority={i < 3} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
