"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { categories, img } from "@/lib/products";

const SLIDE_DURATION = 6000;
const FADE_DURATION = 700;

const SLIDE_CATEGORIES = categories
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, 5);

const SLIDE_KEYS = ["poolTables", "shuffleboards", "furniture", "cueRacks", "accessories"] as const;

const HeroCarouselNav = ({
  categories: cats,
  activeIndex,
  onSelect,
  isPaused,
}: {
  categories: typeof SLIDE_CATEGORIES;
  activeIndex: number;
  onSelect: (i: number) => void;
  isPaused: boolean;
}) => (
  <div
    role="tablist"
    aria-label="Category slides"
    className="flex gap-4 md:gap-10 overflow-x-auto no-scrollbar px-6 md:px-16 lg:px-24 max-w-full"
  >
    {cats.map((cat, i) => {
      const isActive = i === activeIndex;
      return (
        <button
          key={cat.slug}
          role="tab"
          aria-selected={isActive}
          aria-controls={`slide-${cat.slug}`}
          onClick={() => onSelect(i)}
          className={`relative pb-3 whitespace-nowrap transition-colors duration-300 cursor-pointer
            font-[family-name:var(--font-label)] text-[9px] md:text-[10px] font-medium uppercase tracking-[2px] md:tracking-[3px]
            ${isActive ? "text-white" : "text-white/40 hover:text-white/60"}`}
        >
          {cat.name}
          {/* Progress bar track */}
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10" />
          {/* Progress bar fill */}
          {isActive && (
            <span
              className="absolute bottom-0 left-0 h-[2px] bg-white/80"
              style={{
                animation: isPaused
                  ? "none"
                  : `heroProgress ${SLIDE_DURATION}ms linear forwards`,
                width: isPaused ? undefined : "0%",
              }}
            />
          )}
        </button>
      );
    })}
  </div>
);

const HeroCarousel = () => {
  const t = useTranslations("hero");
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotionRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sync displayIndex for text animation
  useEffect(() => {
    setDisplayIndex(activeIndex);
  }, [activeIndex]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reducedMotionRef.current) return;
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % SLIDE_CATEGORIES.length);
      }
    }, SLIDE_DURATION);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);
      startTimer();
    },
    [startTimer]
  );

  // Auto-advance timer
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Pause on hover/focus
  const pause = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
  }, []);

  // Touch swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartRef.current === null) return;
      const diff = touchStartRef.current - e.changedTouches[0].clientX;
      const threshold = 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToSlide((activeIndex + 1) % SLIDE_CATEGORIES.length);
        } else {
          goToSlide(
            (activeIndex - 1 + SLIDE_CATEGORIES.length) %
              SLIDE_CATEGORIES.length
          );
        }
      }
      touchStartRef.current = null;
    },
    [activeIndex, goToSlide]
  );

  const slideKey = SLIDE_KEYS[displayIndex];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Product category showcase"
      aria-roledescription="carousel"
      className="relative w-full h-full"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide images */}
      {SLIDE_CATEGORIES.map((cat, i) => (
        <div
          key={cat.slug}
          id={`slide-${cat.slug}`}
          role="tabpanel"
          aria-label={cat.name}
          className="absolute inset-0"
          aria-hidden={i !== activeIndex}
        >
          <Image
            src={img(cat.heroImage)}
            alt={`${cat.name} collection by C.L. Bailey`}
            fill
            className={`object-cover transition-opacity ease-in-out ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION}ms` }}
            sizes="100vw"
            priority={i === 0}
            quality={80}
          />
        </div>
      ))}

      {/* Gradient overlay — editorial left-to-right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

      {/* Text overlay — vertically centered left, generous spacing */}
      <div
        key={`text-${displayIndex}`}
        className="absolute inset-0 z-10 flex items-center"
      >
        <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pb-24 md:pb-8">
          <p className="section-label !text-white/50 mb-6 animate-fade-up">
            {t(`slides.${slideKey}.label`)}
          </p>
          <h1 className="heading-hero text-white mb-5 max-w-[680px] leading-[1.05] animate-fade-up animate-delay-1">
            {SLIDE_CATEGORIES[displayIndex].headline}
          </h1>
          <p className="text-[15px] leading-[1.7] font-light text-white/60 max-w-[520px] mb-10 animate-fade-up animate-delay-2">
            {SLIDE_CATEGORIES[displayIndex].description}
          </p>
          <Link
            href={`/products/${SLIDE_CATEGORIES[displayIndex].slug}`}
            className="btn-outline-white animate-fade-up animate-delay-3"
          >
            {t(`slides.${slideKey}.cta`)}
          </Link>
        </div>
      </div>

      {/* Navigation strip */}
      <div className="absolute bottom-12 md:bottom-14 left-0 right-0 z-10">
        <HeroCarouselNav
          categories={SLIDE_CATEGORIES}
          activeIndex={activeIndex}
          onSelect={goToSlide}
          isPaused={isPaused}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-center animate-fade-in animate-delay-5">
        <div className="w-[1px] h-8 bg-white/15 mx-auto mb-1.5" />
        <span className="text-[0.625rem] tracking-[0.2em] uppercase text-white/30">
          {t("scrollLabel")}
        </span>
      </div>
    </div>
  );
};

export default HeroCarousel;
