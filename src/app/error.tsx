"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticCTA from "@/components/MagneticCTA";

const LINES = ["ONE", "MOMENT."];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const triedReset = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && error) {
      // eslint-disable-next-line no-console
      console.error("[boundary]", error.digest ?? "", error);
    }
  }, [error]);

  useEffect(() => {
    if (triedReset.current) return;
    triedReset.current = true;
    const t = setTimeout(() => {
      try {
        reset();
      } catch {
        /* fall through to manual CTA */
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [reset]);

  return (
    <main
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 py-32 text-center md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-6 top-28 flex items-start justify-between font-mono text-[10px] uppercase tracking-widest text-muted md:inset-x-10 md:top-32">
        <span>Interlude</span>
        <span>Iphe · MMXXV</span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        Resetting the frame
      </motion.p>

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

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="mx-auto mt-10 max-w-md font-sans text-base text-muted sm:text-lg"
      >
        Recalibrating the scene. Stay close — we&apos;ll have you back in a beat.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.75, duration: 0.7 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <MagneticCTA variant="primary" onClick={() => reset()}>
          Continue
        </MagneticCTA>
        <MagneticCTA variant="ghost" href="/">
          Back to start
        </MagneticCTA>
      </motion.div>
    </main>
  );
}
