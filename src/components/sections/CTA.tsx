"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticCTA from "@/components/MagneticCTA";

const LINES = ["BE PART OF", "THE MOVEMENT"];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        The Iphe Clan
      </motion.p>

      <h2
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
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mx-auto mt-10 max-w-xl font-sans text-base text-muted sm:text-lg"
      >
        Join a growing community of people who don&apos;t just watch — they&apos;re
        part of the journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <MagneticCTA variant="primary" href="/clan">
          JOIN THE CLAN
        </MagneticCTA>
        <MagneticCTA variant="ghost" href="/work">
          WORK WITH ME
        </MagneticCTA>
      </motion.div>
    </section>
  );
}
