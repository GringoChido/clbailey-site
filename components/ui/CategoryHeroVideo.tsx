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
    video.play().catch(() => {
      // Autoplay blocked, poster frame shows as fallback
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
      poster={poster}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default CategoryHeroVideo;
