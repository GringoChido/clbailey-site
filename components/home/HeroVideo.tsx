"use client";

import { useRef, useEffect } from "react";
import { IMAGEKIT_BASE } from "@/lib/products";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay blocked — silent fallback, poster frame shows
    });
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={`${IMAGEKIT_BASE}/pool-tables/skylar/hero.jpg`}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/golden-hour-carousel.mp4" type="video/mp4" />
    </video>
  );
}
