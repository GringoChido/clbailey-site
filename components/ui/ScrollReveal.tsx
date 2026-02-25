"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const staggerClass = delay > 0 ? `reveal-stagger-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`reveal ${staggerClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
