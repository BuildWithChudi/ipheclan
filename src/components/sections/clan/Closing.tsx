"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = ["YOU'RE", "NOT", "JUST", "WATCHING", "ANYMORE."];

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 75%)",
      }}
    >
      <h2
        aria-label={WORDS.join(" ")}
        className="font-display uppercase leading-[0.9] tracking-tight text-fg"
        style={{ fontSize: "clamp(2.75rem, 11vw, 11rem)" }}
      >
        {WORDS.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.05em] align-bottom"
            aria-hidden
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < WORDS.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </h2>
    </section>
  );
}
