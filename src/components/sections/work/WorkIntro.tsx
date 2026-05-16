"use client";

import { motion } from "framer-motion";

export default function WorkIntro() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
        <div className="md:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Chapter · 01
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            More than
            <br />a post.
          </motion.h2>
        </div>

        <div className="md:col-span-7">
          <div className="max-w-xl space-y-6 font-sans text-base leading-relaxed text-muted sm:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Iphe doesn&apos;t just make content — he builds moments brands
              plug into. Real reach, real engagement, real cultural relevance.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Campaigns that feel native to the platform and the people watching
              — not bolted on, not algorithmic filler. Work that performs and
              still feels like him.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
