"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const MARQUEE_WORDS = ["ENERGY", "HUMOUR", "COMMUNITY"];

function VerticalMarqueeColumn() {
  return (
    <div className="flex shrink-0 flex-col items-center" aria-hidden>
      {MARQUEE_WORDS.map((word) => (
        <div key={word} className="flex flex-col items-center">
          <span
            className="block py-8 font-display uppercase leading-none tracking-tight text-muted"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
          >
            {word}
          </span>
          <span className="text-xl text-muted/40">·</span>
        </div>
      ))}
    </div>
  );
}

const VERTICAL_COPIES = 4;

function VerticalMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCol = el.children[0] as HTMLElement | undefined;
    if (!firstCol) return;
    const colHeight = firstCol.offsetHeight;
    if (colHeight === 0) return;
    const pxPerSecond = colHeight / 30; // 30s for one full loop of one column
    let next = y.get() - (pxPerSecond * delta) / 1000;
    if (next <= -colHeight) next += colHeight;
    y.set(next);
  });

  return (
    <div className="relative h-[80vh] w-full overflow-hidden border-y border-line">
      <motion.div
        ref={trackRef}
        style={{ y }}
        className="flex flex-col items-center will-change-transform"
      >
        {Array.from({ length: VERTICAL_COPIES }, (_, i) => (
          <VerticalMarqueeColumn key={i} />
        ))}
      </motion.div>
      {/* fade masks top/bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}

export default function Different() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        Chapter · 02
      </motion.p>

      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[1fr_220px] md:gap-16 lg:grid-cols-[1fr_280px] lg:gap-24">
        <div className="flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display uppercase leading-[0.9] tracking-tight text-fg"
            style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
          >
            What Makes
            <br />
            Iphe Different
          </motion.h2>

          <div className="mt-12 max-w-xl space-y-6 font-sans text-base leading-relaxed text-muted sm:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              It&apos;s not just the videos. It&apos;s the relentless honesty,
              the comic timing that feels lived-in rather than rehearsed, and a
              refusal to dilute himself for an algorithm.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              The community can tell. That&apos;s why it&apos;s growing.
            </motion.p>
          </div>
        </div>

        <div className="hidden md:block">
          <VerticalMarquee />
        </div>
      </div>
    </section>
  );
}
