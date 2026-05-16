"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticCTA from "@/components/MagneticCTA";

const LINES = ["OFF", "SCRIPT."];

export default function NotFound() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <main
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 py-32 text-center md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%)",
      }}
    >
      {/* Corner editorial labels */}
      <div className="pointer-events-none absolute inset-x-6 top-28 flex items-start justify-between font-mono text-[10px] uppercase tracking-widest text-muted md:inset-x-10 md:top-32">
        <span>Error · 404</span>
        <span>Iphe · MMXXV</span>
      </div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        Page not found
      </motion.p>

      {/* Display headline — masked line reveal */}
      <h1
        aria-label={LINES.join(" ")}
        className="mt-8 font-display uppercase leading-[0.85] tracking-tight text-fg"
        style={{ fontSize: "clamp(3rem, 12vw, 12rem)" }}
      >
        {LINES.map((line, i) => (
          <span
            key={line}
            className="block overflow-hidden pb-[0.05em]"
            aria-hidden
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="mx-auto mt-10 max-w-md font-sans text-base text-muted sm:text-lg"
      >
        This page didn&apos;t make the cut. Or the link broke. Either way —
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.75, duration: 0.7 }}
        className="mt-10"
      >
        <MagneticCTA variant="ghost" href="/">
          Back to start
        </MagneticCTA>
      </motion.div>
    </main>
  );
}
