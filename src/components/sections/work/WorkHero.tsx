"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import HeroBackground from "@/components/HeroBackground";
import { HERO_CLIPS } from "@/lib/cloudinary";

export default function WorkHero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 text-center md:px-10">
      <HeroBackground clips={HERO_CLIPS.work} />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative font-mono text-xs uppercase tracking-widest text-muted"
      >
        Work · 001
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 font-display uppercase leading-[0.9] tracking-tight text-fg"
        style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
      >
        Work with Iphe
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mx-auto mt-8 max-w-xl font-sans text-base text-muted sm:text-lg"
      >
        Partner with a creator who knows how to capture attention and turn it
        into impact.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="mt-12"
      >
        <Magnetic radius={100} strength={0.35}>
          <a
            href="#contact"
            data-cursor="hover"
            className="inline-block rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-widest text-bg transition-colors hover:bg-accent/90"
          >
            Get in Touch
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
}
