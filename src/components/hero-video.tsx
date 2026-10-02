"use client";

import { useEffect, useRef } from "react";

const BASE =
  "https://res.cloudinary.com/z6gspcmd/video/upload/v1790943783/hero-1080p.mp4";
const DESKTOP_SRC = BASE;
// Cloudinary generates and caches this smaller variant on first request:
// scaled to 720px wide, with automatic quality/format negotiation.
const MOBILE_SRC =
  "https://res.cloudinary.com/z6gspcmd/video/upload/w_720,c_scale,q_auto,f_auto/v1790943783/hero-1080p.mp4";

export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mql = window.matchMedia("(min-width: 768px)");
    const applySource = () => {
      const src = mql.matches ? DESKTOP_SRC : MOBILE_SRC;
      if (video.currentSrc === src || video.src === src) return;
      video.src = src;
      video.load();
      video.play().catch(() => {
        // Autoplay can be rejected before the user has interacted with the
        // page; the poster stays visible and playback resumes on interaction.
      });
    };

    applySource();
    mql.addEventListener("change", applySource);
    return () => mql.removeEventListener("change", applySource);
  }, []);

  return (
    // src is intentionally not set here: it's managed entirely by the effect
    // above so React's reconciliation never overwrites it after the source
    // is switched based on viewport width (see the hero-video Safari fix).
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="https://djpguts9gwm3x.cloudfront.net/mofilmedit.jpg"
      className={className}
    />
  );
}
