"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { img, isConvertible, type Product } from "@/lib/products";
import { getFinishColor } from "@/lib/finishes";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  locale?: string;
}

export default function ProductCard({
  product,
  priority = false,
  locale = "en",
}: ProductCardProps) {
  const t = useTranslations("common");
  const convertible = isConvertible(product);
  const showDots =
    product.finishes.length > 0 && product.finishes[0] !== "Various";

  return (
    <Link
      href={`/${locale}/products/${product.category}/${product.slug}`}
      className="group block"
    >
      {/* Image container with hover overlay */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-off-white)] border border-[var(--color-cloud)] mb-4">
        <Image
          src={img(product.images.categoryImage ?? product.images.hero)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />

        {/* Convertible badge */}
        {convertible && (
          <span className="absolute top-3 left-3 z-10 metadata bg-white/90 px-3 py-1.5 text-[var(--color-primary)]">
            {t("convertibleBadge")}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/40 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
          <p className="text-white text-sm max-w-[80%] text-center mb-4 line-clamp-2">
            {product.tagline}
          </p>
          <span className="metadata text-white border border-white px-5 py-2">
            {t("viewDetails")}
          </span>
        </div>
      </div>

      {/* Card content */}
      <h3 className="heading-card mb-1">{product.name}</h3>
      <p className="text-sm text-[var(--color-body)] line-clamp-1 mb-2">
        {product.tagline}
      </p>

      {/* Finish swatch dots */}
      {showDots && (
        <div className="flex items-center gap-1.5 mb-2">
          {product.finishes.map((finish) => {
            const color = getFinishColor(finish);
            return (
              <span
                key={finish}
                data-finish={finish}
                className="relative w-3 h-3 rounded-full inline-block group/swatch cursor-default after:content-[attr(data-finish)] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:mb-1.5 after:px-2 after:py-1 after:text-[9px] after:text-white after:bg-[var(--color-primary)] after:whitespace-nowrap after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-200 hover:after:opacity-100"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      )}

      <p className="metadata">{t("dealerExclusiveShort")}</p>
    </Link>
  );
}
