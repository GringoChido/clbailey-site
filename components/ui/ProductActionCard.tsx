"use client";

import { useState } from "react";
import Link from "next/link";
import FinishSwatches from "@/components/ui/FinishSwatches";

interface ProductActionCardProps {
  productName: string;
  sizes: string[];
  finishes: string[];
  locale: string;
  dealerHref: string;
  labels: {
    selectSize: string;
    selectFinish: string;
    findDealer: string;
    downloadSpec: string;
    dealerExclusive: string;
    selectedLabel: string;
  };
  specSheetSlot?: React.ReactNode;
}

const ProductActionCard = ({
  productName,
  sizes,
  finishes,
  locale,
  dealerHref,
  labels,
  specSheetSlot,
}: ProductActionCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.length === 1 ? sizes[0] : null
  );
  const [selectedFinish, setSelectedFinish] = useState<string | null>(
    finishes.length === 1 ? finishes[0] : null
  );

  return (
    <div>
      {/* Product name */}
      <h3 className="heading-card text-xl mb-2">{productName}</h3>
      <p className="metadata !text-[var(--color-mid-gray)] mb-8">
        {labels.dealerExclusive}
      </p>

      {/* Size selector */}
      {sizes.length > 0 && (
        <div className="mb-8">
          <p className="section-label text-[12px] mb-4">{labels.selectSize}</p>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`metadata px-5 py-2.5 transition-all duration-200 cursor-pointer ${
                  selectedSize === size
                    ? "bg-[var(--color-primary)] text-white border border-[var(--color-primary)]"
                    : "bg-transparent text-[var(--color-mid-gray)] border border-[var(--color-cloud)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Finish selector */}
      {finishes.length > 0 && (
        <div className="mb-8">
          <p className="section-label text-[12px] mb-4">{labels.selectFinish}</p>
          <FinishSwatches
            finishes={finishes}
            size="lg"
            selected={selectedFinish ?? undefined}
            onSelect={setSelectedFinish}
          />
        </div>
      )}

      {/* Selection summary */}
      {(selectedSize || selectedFinish) && (
        <div className="mb-8 py-4 border-t border-b border-[var(--color-cloud)]">
          <p className="metadata !text-[var(--color-mid-gray)] mb-1">
            {labels.selectedLabel}
          </p>
          <p className="text-base text-[var(--color-primary)] leading-[1.6]">
            {[productName, selectedSize, selectedFinish]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Link
          href={dealerHref}
          className="btn-primary text-center w-full"
        >
          {labels.findDealer}
        </Link>
        {specSheetSlot}
      </div>
    </div>
  );
};

export default ProductActionCard;
