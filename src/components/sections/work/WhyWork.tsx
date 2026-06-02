"use client";

import { motion } from "framer-motion";

export default function WhyWork() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-widest text-muted"
            >
              Chapter · 04
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Why work
              <br />
              with Iphe
            </motion.h2>
          </div>

          <div className="md:col-span-7">
            <div className="max-w-xl space-y-6 font-sans text-base leading-relaxed text-muted sm:text-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                Numbers are easy. Trust isn&apos;t. Iphe&apos;s audience shows
                up because they choose to — week after week, video after video.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.15, duration: 0.8 }}
              >
                That&apos;s the kind of attention that moves product, fills
                rooms, and shifts brand perception. Not impressions. Not
                metrics theatre. Decisions.
              </motion.p>
            </div>
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 border-t border-line pt-12 md:mt-32 md:pt-16"
        >
          <p
            className="font-display uppercase leading-[0.95] tracking-tight text-accent"
            style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          >
            &ldquo;Recognised by Meta as a Creator of Tomorrow.&rdquo;
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            Meta · 2024
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
