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
      <section className="bg-[var(--color-off-white)]">
        <div className="max-w-[90rem] mx-auto">

          {/* Hero product shot: full width */}
          {heroImage && (
            <div
              className="relative w-full aspect-[16/7] cursor-pointer overflow-hidden group"
              onClick={() => openLightbox(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") openLightbox(0); }}
              aria-label={`${productName}, click to enlarge`}
            >
              <Image
                src={img(heroImage)}
                alt={productName}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="100vw"
                quality={85}
              />
            </div>
          )}

          {/* Alternating grid rows */}
          <div className="px-3 lg:px-4 py-3 lg:py-4 space-y-3 lg:space-y-4">
            {images.length >= 2 && (
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {images.slice(0, 2).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] cursor-pointer overflow-hidden group bg-white"
                    onClick={() => openLightbox((heroImage ? 1 : 0) + i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") openLightbox((heroImage ? 1 : 0) + i); }}
                    aria-label={`${productName} detail ${i + 1}, click to enlarge`}
                  >
                    <Image
                      src={img(src)}
                      alt={`${productName} detail ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Third image: wide cinematic crop */}
            {images.length >= 3 && (
              <div
                className="relative aspect-[21/9] cursor-pointer overflow-hidden group bg-white"
                onClick={() => openLightbox(heroImage ? 3 : 2)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openLightbox(heroImage ? 3 : 2); }}
                aria-label={`${productName} detail 3, click to enlarge`}
              >
                <Image
                  src={img(images[2])}
                  alt={`${productName} detail 3`}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  sizes="100vw"
                />
              </div>
            )}

            {/* Remaining images in pairs */}
            {images.length > 3 && (
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {images.slice(3).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] cursor-pointer overflow-hidden group bg-white"
                    onClick={() => openLightbox((heroImage ? 4 : 3) + i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") openLightbox((heroImage ? 4 : 3) + i); }}
                    aria-label={`${productName} detail ${i + 4}, click to enlarge`}
                  >
                    <Image
                      src={img(src)}
                      alt={`${productName} detail ${i + 4}`}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
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
