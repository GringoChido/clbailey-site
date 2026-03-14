"use client";

import { useState } from "react";
import Image from "next/image";
import { img } from "@/lib/products";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface PDPShowcaseProps {
  heroImage: string | null;
  images: string[];
  productName: string;
}

const PDPShowcase = ({ heroImage, images, productName }: PDPShowcaseProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = [heroImage, ...images].filter(Boolean) as string[];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="py-10 lg:py-12 bg-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
          <p className="section-label mb-6 text-center">Gallery</p>
        </div>

        {/* Horizontal scrolling gallery */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-3 lg:gap-4 px-6 lg:px-10 pb-4">
            {allImages.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[240px] md:w-[300px] lg:w-[360px] aspect-[4/3] cursor-pointer overflow-hidden group bg-[var(--color-off-white)]"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openLightbox(i); }}
                aria-label={`${productName} image ${i + 1}, click to enlarge`}
              >
                <Image
                  src={img(src)}
                  alt={`${productName} ${i + 1} of ${allImages.length}`}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 360px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        images={allImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        productName={productName}
      />
    </>
  );
};

export default PDPShowcase;
