"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { clVideo, clPoster, REELS, type Reel } from "@/lib/cloudinary";

/**
 * A single vertical reel.
 *
 * Performance contract (this matters under launch-day traffic):
 *  - The <video> carries NO src until it nears the viewport — nothing downloads
 *    for cards the visitor never scrolls to.
 *  - It only plays while actually on screen, and pauses the moment it leaves,
 *    so we never decode 7 videos at once — just the 2–3 currently visible.
 *  - prefers-reduced-motion: never autoplays; shows the poster, tap to play.
 */
function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [reduced, setReduced] = useState(false);

  const poster = clPoster(reel.publicId, reel.version, { width: 480 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(prefersReduced);

    // Respect data-saver: keep the poster, never pull the clip.
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) {
      setReduced(true); // poster-only, tap-to-play
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setSrc(clVideo(reel.publicId, reel.version, { width: 640 }));
      return;
    }

    // 1) Attach the source once the card gets close — then stop watching.
    const loader = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc(clVideo(reel.publicId, reel.version, { width: 640 }));
          loader.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    loader.observe(el);

    // 2) Play only while visible; pause (and stay paused) when it scrolls away.
    const player = new IntersectionObserver(
      (entries) => {
        const v = videoRef.current;
        if (!v) return;
        const visible = entries[0]?.intersectionRatio > 0.4;
        if (visible && !prefersReduced) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.4, 0.75] }
    );
    player.observe(el);

    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, [reel.publicId, reel.version]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative w-[68vw] shrink-0 snap-start sm:w-[300px] md:w-[320px]"
    >
      <div
        ref={wrapRef}
        onClick={reduced ? togglePlay : undefined}
        data-cursor={reduced ? "watch" : "hover"}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-line"
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          onError={() => setSrc(undefined)}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={reel.alt}
        />

        {/* Edge vignette + bottom scrim for caption legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        {/* Index, top-left */}
        <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-fg/80">
          Reel · {String(index + 1).padStart(2, "0")}
        </span>

        {/* Caption, bottom-left */}
        <figcaption className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="font-display uppercase leading-none tracking-tight text-fg [font-size:clamp(1.1rem,3vw,1.5rem)]">
            {reel.caption}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-fg/60">
            9 : 16
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
}

export default function ReelWall() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Pointer drag-to-scroll for desktop (no visible scrollbar, cursor is hidden).
  // Touch devices already scroll natively, so this only arms for fine pointers.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let down = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
    };

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-bg py-24 md:py-32">
      <div className="mx-auto mb-12 flex max-w-7xl items-end justify-between gap-6 px-6 md:mb-16 md:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            In Motion · 001
          </p>
          <h2
            className="mt-6 font-display uppercase leading-[0.9] tracking-tight text-fg"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            The Reels
          </h2>
        </div>
        <p className="hidden max-w-[26ch] text-right font-mono text-[10px] uppercase tracking-widest text-muted sm:block md:text-xs">
          Drag → swipe the strip. Straight from the feed.
        </p>
      </div>

      <div className="relative">
        {/* Edge fades hint that the strip continues off-screen */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent md:w-20" />

        <div
          ref={trackRef}
          className={clsx(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 md:gap-6 md:px-10",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {REELS.map((reel, i) => (
            <ReelCard key={reel.publicId} reel={reel} index={i} />
          ))}
          {/* Trailing spacer so the last card can snap clear of the edge fade */}
          <div aria-hidden className="w-2 shrink-0 md:w-6" />
        </div>
      </div>
    </section>
  );
}
