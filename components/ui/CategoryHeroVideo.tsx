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

    // Set src programmatically to avoid React hydration stripping <source>
    if (!video.src || video.networkState === 3) {
      video.src = src;
      video.load();
    }

    video.play().catch(() => {
      // Autoplay blocked, poster frame shows as fallback
    });
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      src={src}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export default CategoryHeroVideo;
