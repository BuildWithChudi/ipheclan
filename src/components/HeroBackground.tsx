"use client";

import { useEffect, useRef, useState } from "react";
import { clVideo, clPoster } from "@/lib/cloudinary";

const HERO_W = 960;
const HERO_FX = ["e_grayscale"];
const CYCLE_MS = 7000;

export type HeroClip = { publicId: string; version: string };

/**
 * Cinematic hero background — poster-first, then a slow grayscale crossfade
 * through a handful of hand-picked clips. Shared by every page hero.
 *
 * Performance contract:
 *  - The first poster is server-rendered and is the page's LCP element.
 *  - No <video> carries a src until JS arms it ~700ms after paint, and only
 *    on capable connections (skips reduced-motion / data-saver / 2G).
 *  - Only the visible clip plays; the one that faded out is paused.
 */
export default function HeroBackground({ clips }: { clips: HeroClip[] }) {
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [armed, setArmed] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return;

    const t = window.setTimeout(() => {
      setArmed(true);
      setLoaded(new Set([0]));
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!armed || clips.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % clips.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, [armed, clips.length]);

  useEffect(() => {
    if (!armed) return;
    const next = (active + 1) % clips.length;
    setLoaded((s) =>
      s.has(active) && s.has(next) ? s : new Set(s).add(active).add(next)
    );
    videosRef.current[active]?.play().catch(() => {});

    const prev = (active - 1 + clips.length) % clips.length;
    if (prev === active) return;
    const t = window.setTimeout(() => videosRef.current[prev]?.pause(), 1200);
    return () => clearTimeout(t);
  }, [active, armed, clips.length]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-bg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={clPoster(clips[0].publicId, clips[0].version, {
          width: HERO_W,
          extra: HERO_FX,
        })}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {clips.map((clip, i) => (
        <video
          key={clip.publicId}
          ref={(el) => {
            videosRef.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: armed && i === active ? 1 : 0 }}
          src={
            loaded.has(i)
              ? clVideo(clip.publicId, clip.version, {
                  width: HERO_W,
                  extra: HERO_FX,
                })
              : undefined
          }
          poster={clPoster(clip.publicId, clip.version, {
            width: HERO_W,
            extra: HERO_FX,
          })}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          disablePictureInPicture
          aria-hidden
        />
      ))}
      {/* Scrims: enough to keep the wordmark legible, light enough that the
          footage clearly reads. Bottom is darker for the CTA / scroll cue. */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-bg/25" />
    </div>
  );
}
