"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LeadModal from "@/components/ui/LeadModal";
import { products, img, pdf } from "@/lib/products";

const CATALOG_CATEGORIES = [
  { slug: "pool-tables", label: "Pool Tables" },
  { slug: "shuffleboards", label: "Shuffleboards" },
  { slug: "game-room-furniture", label: "Furniture" },
  { slug: "cue-racks", label: "Cue Racks" },
];

const productsWithPdfs = products.filter((p) => p.pdf && p.images.hero);

const CatalogBrowser = () => {
  const t = useTranslations("dealerBlock");
  const [activeCategory, setActiveCategory] = useState("pool-tables");

  const filteredProducts = productsWithPdfs
    .filter((p) => p.category === activeCategory)
    .slice(0, 4);

  return (
    <div className="bg-white border border-[var(--color-cloud)] p-8 lg:p-10">
      {/* Category tabs */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar mb-8">
        {CATALOG_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActiveCategory(cat.slug)}
            className={`whitespace-nowrap font-[family-name:var(--font-label)] text-[10px] font-medium uppercase tracking-[3px] pb-2 transition-colors duration-300 cursor-pointer ${
              activeCategory === cat.slug
                ? "text-[var(--color-primary)] border-b-2 border-[var(--color-bronze)]"
                : "text-[var(--color-mid-gray)] hover:text-[var(--color-primary)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product card grid */}
      <div className="grid grid-cols-2 gap-5">
        {filteredProducts.map((product) => (
          <LeadModal
            key={product.slug}
            productName={product.name}
            pdfUrl={pdf(product.pdf!)}
          >
            <div className="group cursor-pointer border border-[var(--color-cloud)] hover:border-[var(--color-sand)] transition-colors duration-300 bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={img(product.images.hero)}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="heading-card text-sm">{product.name}</h3>
                <span className="metadata !text-[var(--color-mid-gray)] mt-2 inline-flex items-center gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="flex-shrink-0"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8M16 17H8M10 9H8" />
                  </svg>
                  {t("viewSpecSheet")}
                </span>
              </div>
            </div>
          </LeadModal>
        ))}
      </div>

      {/* View All link */}
      <div className="mt-8">
        <Link
          href="/catalogs"
          className="text-sm font-medium text-[var(--color-primary)] border-b border-[var(--color-primary)] hover:border-[var(--color-bronze)] hover:text-[var(--color-bronze)] transition-colors duration-300"
        >
          {t("viewAll")} &rarr;
        </Link>
      </div>
    </div>
  );
};

export default CatalogBrowser;
