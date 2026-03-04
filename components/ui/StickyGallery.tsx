"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { img } from "@/lib/products";

interface StickyGalleryProps {
  images: string[];
  productName: string;
  onImageClick?: (index: number) => void;
}

const StickyGallery = ({ images, productName, onImageClick }: StickyGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleThumbnailClick = useCallback((index: number) => {
    const target = imageRefs.current[index];
    if (target && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: target.offsetTop - scrollRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  // Desktop: track scroll position to highlight active thumbnail
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const midpoint = containerTop + containerHeight / 3;

      let closest = 0;
      let closestDistance = Infinity;

      imageRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const refTop = ref.offsetTop - container.offsetTop;
        const distance = Math.abs(refTop - midpoint);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile: track horizontal scroll for dot indicators
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const slideWidth = carousel.clientWidth;
      const index = Math.round(scrollLeft / slideWidth);
      setActiveIndex(index);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  if (images.length === 0) return null;

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden lg:block sticky top-28 h-[calc(100vh-7rem)]">
        <div className="relative h-full">
          {/* Thumbnail strip */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailClick(i)}
                className={`
                  relative w-12 h-12 overflow-hidden flex-shrink-0
                  border border-[var(--color-cloud)]
                  transition-all duration-200
                  ${activeIndex === i
                    ? "border-l-2 border-l-[var(--color-primary)] opacity-100"
                    : "opacity-60 hover:opacity-90"
                  }
                `}
                aria-label={`View ${productName} image ${i + 1}`}
              >
                <Image
                  src={img(src)}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
            ))}
          </div>

          {/* Scrollable image column */}
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto no-scrollbar"
          >
            <div className="flex flex-col gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className="relative aspect-[4/3] w-full flex-shrink-0 cursor-pointer overflow-hidden bg-[var(--color-off-white)]"
                  onClick={() => onImageClick?.(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onImageClick?.(i);
                    }
                  }}
                  aria-label={`${productName} image ${i + 1}, click to enlarge`}
                >
                  <Image
                    src={img(src)}
                    alt={`${productName} ${i + 1} of ${images.length}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout: horizontal carousel */}
      <div className="lg:hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="min-w-full snap-start relative aspect-[4/3] cursor-pointer bg-[var(--color-off-white)]"
              onClick={() => onImageClick?.(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick?.(i);
                }
              }}
              aria-label={`${productName} image ${i + 1}, click to enlarge`}
            >
              <Image
                src={img(src)}
                alt={`${productName} ${i + 1} of ${images.length}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 pt-4 pb-2">
            {images.map((_, i) => (
              <button
                key={i}
                className={`
                  w-2 h-2 transition-all duration-200
                  ${activeIndex === i
                    ? "bg-[var(--color-primary)] scale-110"
                    : "bg-[var(--color-cloud)]"
                  }
                `}
                onClick={() => {
                  carouselRef.current?.scrollTo({
                    left: i * (carouselRef.current?.clientWidth ?? 0),
                    behavior: "smooth",
                  });
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StickyGallery;
