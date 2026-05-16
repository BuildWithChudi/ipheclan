"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const STATEMENTS = [
  "Millions watching across TikTok, Instagram, YouTube, and Snapchat.",
  "Concentrated in the UK, with strong international reach.",
  "Young, mobile-first, and culturally engaged.",
  "A community that quotes the work back in real life.",
];

const STAT_LABELS = [
  "4M+ TIKTOK",
  "300K+ INSTAGRAM",
  "50K+ YOUTUBE",
  "500K+ SNAPCHAT",
];

function StatMarqueeRow() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {STAT_LABELS.map((label) => (
        <div key={label} className="flex items-center">
          <span
            className="px-10 font-display uppercase leading-none tracking-tight text-fg"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {label}
          </span>
          <span className="text-xl text-accent">·</span>
        </div>
      ))}
    </div>
  );
}

const STAT_COPIES = 4;

function StatMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;
    const firstRow = el.children[0] as HTMLElement | undefined;
    if (!firstRow) return;
    const rowWidth = firstRow.offsetWidth;
    if (rowWidth === 0) return;
    const pxPerSecond = rowWidth / 35; // 35s for one full row
    let next = x.get() - (pxPerSecond * delta) / 1000;
    if (next <= -rowWidth) next += rowWidth;
    x.set(next);
  });

  return (
    <div className="relative h-24 w-full overflow-hidden border-y border-line bg-bg md:h-28">
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex h-full w-max items-center will-change-transform"
      >
        {Array.from({ length: STAT_COPIES }, (_, i) => (
          <StatMarqueeRow key={i} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Audience() {
  return (
    <section className="relative w-full bg-bg">
      <div className="px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Chapter · 03
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            The Audience
          </motion.h2>

          <ul className="mt-16 space-y-6 md:mt-20 md:space-y-8">
            {STATEMENTS.map((statement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-baseline gap-4 font-display uppercase leading-[1.05] tracking-tight text-fg md:gap-6"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
              >
                <span className="font-mono text-xs text-muted md:text-sm">
                  0{i + 1}
                </span>
                <span>{statement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <StatMarquee />
    </section>
  );
}
