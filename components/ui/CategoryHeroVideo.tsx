"use client";

import { useRef, useEffect } from "react";

interface CategoryHeroVideoProps {
  src: string;
  poster: string;
}

/**
 * Autoplay hero video for category pages.
 *
 * Why this is built the way it is:
 * - React hydration strips the `muted` HTML attribute, which causes
 *   browsers to treat the video as unmuted and block autoplay.
 * - We set src, muted, and playsInline via DOM properties in useEffect
 *   to bypass hydration issues entirely.
 * - Multiple event listeners + polling guarantee playback starts
 *   regardless of load timing or browser quirks.
 */
const CategoryHeroVideo = ({ src, poster }: CategoryHeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set all critical properties via DOM (not JSX) to bypass React hydration bugs
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = "auto";
    // Also set the HTML attribute directly (some browsers check the attribute, not the property)
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    // Set src and start loading
    if (video.src !== src) {
      video.src = src;
      video.load();
    }

    const play = () => {
      if (!video.paused) return;
      video.muted = true; // re-assert before every play attempt
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      }
    };

    // Try immediately
    play();

    // Listen for every possible ready event
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("canplaythrough", play);
    video.addEventListener("loadedmetadata", play);

    // Polling fallback: covers race conditions where events fire before listeners
    let stopped = false;
    let count = 0;
    const poll = () => {
      if (stopped) return;
      count++;
      play();
      if (video.paused && count < 20) {
        setTimeout(poll, 250);
      }
    };
    setTimeout(poll, 100);

    // Resume on tab focus
    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Resume on scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) play(); },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      stopped = true;
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("canplaythrough", play);
      video.removeEventListener("loadedmetadata", play);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [src]);

  // Render a bare video tag with NO src and NO muted in JSX.
  // All of these are set via DOM in useEffect to avoid React hydration stripping them.
  // The poster is safe in JSX (it's just an image URL, no hydration issues).
  return (
    <video
      ref={videoRef}
      poster={poster}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export default CategoryHeroVideo;
