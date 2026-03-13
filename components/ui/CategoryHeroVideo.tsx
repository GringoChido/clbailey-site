"use client";

import { useRef, useEffect } from "react";

interface CategoryHeroVideoProps {
  src: string;
  poster: string;
}

const CategoryHeroVideo = ({ src, poster }: CategoryHeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      if (video.paused && video.readyState >= 2) {
        video.play().catch(() => {
          // Autoplay blocked, poster frame shows as fallback
        });
      }
    };

    // Set src programmatically to avoid React hydration stripping <source>
    if (!video.src || video.networkState === 3) {
      video.src = src;
      video.load();
    }

    tryPlay();

    // Retry when video data is ready
    video.addEventListener("canplay", tryPlay);

    // Resume playback when tab becomes visible again
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Resume when video scrolls into viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      poster={poster}
      src={src}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export default CategoryHeroVideo;
