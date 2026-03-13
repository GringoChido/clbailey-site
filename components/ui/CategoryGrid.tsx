"use client";

import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products";

interface CategoryGridProps {
  products: Product[];
  locale: string;
}

const CategoryGrid = ({ products, locale }: CategoryGridProps) => {
  const t = useTranslations("categoryPage");
  const sorted = [...products].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((product, i) => (
            <ScrollReveal key={product.slug} delay={Math.min(i + 1, 6)}>
              <ProductCard
                product={product}
                priority={i < 3}
                locale={locale}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="metadata !text-[var(--color-mid-gray)]">
            {t("productCount", { count: sorted.length })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
