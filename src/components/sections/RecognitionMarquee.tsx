"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const LABELS = ["META", "PULSE", "FACEBOOK", "INSTAGRAM"];

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {LABELS.map((label) => (
        <div key={label} className="flex items-center">
          <span
            data-cursor="hover"
            className="px-12 font-display uppercase leading-none tracking-tight text-muted transition-colors duration-200 hover:text-accent"
            style={{ fontSize: "3rem" }}
          >
            {label}
          </span>
          <span className="text-2xl text-muted/60">·</span>
        </div>
      ))}
    </div>
  );
}

const COPIES = 4;

export default function RecognitionMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const durationRef = useRef(40);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;
    const firstRow = el.children[0] as HTMLElement | undefined;
    if (!firstRow) return;
    const rowWidth = firstRow.offsetWidth;
    if (rowWidth === 0) return;
    const pxPerSecond = rowWidth / durationRef.current;
    let next = x.get() - (pxPerSecond * delta) / 1000;
    if (next <= -rowWidth) next += rowWidth;
    x.set(next);
  });

  return (
    <section
      aria-label="Recognised by"
      className="relative h-20 w-full overflow-hidden border-y border-line bg-black"
      onMouseEnter={() => {
        durationRef.current = 15;
      }}
      onMouseLeave={() => {
        durationRef.current = 40;
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex h-full w-max items-center will-change-transform"
      >
        {Array.from({ length: COPIES }, (_, i) => (
          <MarqueeRow key={i} />
        ))}
      </motion.div>
    </section>
  );
}
