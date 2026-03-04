"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Product } from "@/lib/products";

type SortOption = "featured" | "az" | "za";

interface CategoryGridProps {
  products: Product[];
  availableSizes: string[];
  locale: string;
}

const CategoryGrid = ({ products, availableSizes, locale }: CategoryGridProps) => {
  const [sort, setSort] = useState<SortOption>("featured");
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];

    if (sizeFilter) {
      result = result.filter((p) => p.sizes.includes(sizeFilter));
    }

    switch (sort) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        result.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return result;
  }, [products, sort, sizeFilter]);

  return (
    <>
      <CategoryFilter
        availableSizes={availableSizes}
        onSortChange={setSort}
        onSizeFilter={setSizeFilter}
        currentSort={sort}
        currentSize={sizeFilter}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--color-mid-gray)] py-20">
              No products match the selected filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, i) => (
                <ScrollReveal key={product.slug} delay={Math.min(i + 1, 6)}>
                  <ProductCard
                    product={product}
                    priority={i < 3}
                    locale={locale}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Animated product count */}
          <div className="text-center mt-16">
            <p className="metadata !text-[var(--color-mid-gray)]">
              {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryGrid;
