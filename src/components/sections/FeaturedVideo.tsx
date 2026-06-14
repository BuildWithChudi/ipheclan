"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Volume2, VolumeX } from "lucide-react";
import { clVideo, clPoster } from "@/lib/cloudinary";

// Full-colour centrepiece clip (the grayscale treatment is reserved for the
// ambient hero backgrounds). Served via Cloudinary like the rest of the video.
const FEATURED = {
  publicId: "iphe-plugged-in-dancing-indoors-feeling-music_fk1nn1",
  version: "v1781424262",
};
const VIDEO_SRC = clVideo(FEATURED.publicId, FEATURED.version, { width: 1280 });
const POSTER_SRC = clPoster(FEATURED.publicId, FEATURED.version, { width: 1280 });

export default function FeaturedVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const isTouch = window.matchMedia(
        "(hover: none), (pointer: coarse)"
      ).matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (isTouch || prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        frameRef.current,
        { width: "60%", borderRadius: 24 },
        {
          width: "100%",
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "+=80%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-bg py-24 md:py-32"
    >
      <div className="px-6 text-center md:px-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Featured · 001
        </p>
        <h2
          className="mt-6 font-display uppercase leading-[0.9] tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
        >
          Watch the Madness
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base text-muted sm:text-lg">
          A glimpse into the chaos, creativity, and energy behind the content.
        </p>
      </div>

      <div className="mt-16 flex justify-center md:mt-24">
        <div
          ref={frameRef}
          className="relative aspect-[9/16] w-full overflow-hidden bg-black md:aspect-video md:w-[60%] md:rounded-3xl"
        >
          {/* Editorial side rails — desktop only, fill the 16:9 frame's negative space around the 9:16 video */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[20%] flex-col justify-between p-6 font-mono text-[10px] uppercase tracking-widest text-muted md:flex">
            <span>Reel · 01</span>
            <span className="block self-start [writing-mode:vertical-rl] rotate-180">
              Mama&nbsp;We&nbsp;Made&nbsp;It
            </span>
            <span>00 : 05</span>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[20%] flex-col items-end justify-between p-6 font-mono text-[10px] uppercase tracking-widest text-muted md:flex">
            <span>MMXXV</span>
            <span className="block [writing-mode:vertical-rl]">
              Iphe · Official
            </span>
            <span>9 : 16</span>
          </div>

          {/* Click-to-unmute button wraps the video; centered, native aspect on desktop, full-bleed on mobile */}
          <button
            type="button"
            onClick={toggleMute}
            data-cursor="watch"
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute inset-0 m-0 flex h-full w-full items-center justify-center bg-transparent p-0"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover md:h-full md:w-auto"
              src={shouldLoad ? VIDEO_SRC : undefined}
              poster={POSTER_SRC}
              playsInline
              muted
              loop
              autoPlay
              preload="metadata"
            />
          </button>

          {/* Bottom gradient overlay (bottom 30%) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[30%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Caption — bottom-left */}
          <div className="pointer-events-none absolute bottom-5 left-5 z-30 font-mono text-[11px] uppercase tracking-widest text-fg md:bottom-6 md:left-8">
            Mama We Made It <span className="mx-1 text-muted">—</span> 2025
          </div>

          {/* Sound indicator — bottom-right */}
          <div className="pointer-events-none absolute bottom-5 right-5 z-30 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-fg md:bottom-6 md:right-8">
            {muted ? (
              <>
                <VolumeX size={14} strokeWidth={1.5} />
                <span>Tap to unmute</span>
              </>
            ) : (
              <>
                <Volume2 size={14} strokeWidth={1.5} className="text-accent" />
                <span>Sound on</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
