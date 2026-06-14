"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";
import { HERO_CLIPS } from "@/lib/cloudinary";

const LINES = ["THE IPHE", "CLAN"];

export default function ClanHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 75%)",
      }}
    >
      <HeroBackground clips={HERO_CLIPS.clan} />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative font-mono text-xs uppercase tracking-widest text-muted"
      >
        Community · 001
      </motion.p>

      <h1
        aria-label={LINES.join(" ")}
        className="mt-8 font-display uppercase leading-[0.85] tracking-tight text-fg"
        style={{ fontSize: "clamp(3.5rem, 15vw, 15rem)" }}
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
                delay: 0.15 + i * 0.14,
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
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mx-auto mt-8 max-w-xl font-sans text-base text-muted sm:text-lg"
      >
        More than followers. This is a community.
      </motion.p>
    </section>
  );
}
