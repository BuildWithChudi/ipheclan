"use client";

import { motion } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";
import { HERO_CLIPS } from "@/lib/cloudinary";

export default function AboutHero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 text-center md:px-10">
      <HeroBackground clips={HERO_CLIPS.about} />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative font-mono text-xs uppercase tracking-widest text-muted"
      >
        About · 001
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 font-display uppercase leading-[0.9] tracking-tight text-fg"
        style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
      >
        About Iphe
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mx-auto mt-8 max-w-xl font-sans text-base text-muted sm:text-lg"
      >
        More than content. It&apos;s personality, culture, and connection.
      </motion.p>
    </section>
  );
}
