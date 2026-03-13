"use client";

import { useRef, useEffect, useCallback } from "react";

interface CategoryHeroVideoProps {
  src: string;
  poster: string;
}

const CategoryHeroVideo = ({ src, poster }: CategoryHeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;

    // Ensure muted (required for autoplay in all browsers)
    video.muted = true;

    if (video.readyState >= 2) {
      video.play().catch(() => {
        // Autoplay blocked by browser policy, poster shows as fallback
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted + playsInline attributes (some browsers strip on hydration)
    video.muted = true;
    video.playsInline = true;

    // Attempt play immediately (covers case where video is already loaded)
    tryPlay();

    // Listen for ALL relevant ready-state events to catch every case
    const onReady = () => tryPlay();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);

    // Polling fallback: check every 500ms for 5 seconds
    // This catches edge cases where events fire before listeners attach
    let pollCount = 0;
    const poll = () => {
      pollCount++;
      tryPlay();
      if (videoRef.current?.paused && pollCount < 10) {
        retryTimer.current = setTimeout(poll, 500);
      }
    };
    retryTimer.current = setTimeout(poll, 200);

    // Resume on visibility change (tab switch)
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Resume when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [src, tryPlay]);

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
