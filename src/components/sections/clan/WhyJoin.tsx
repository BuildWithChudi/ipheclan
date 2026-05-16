"use client";

import { motion } from "framer-motion";

const REASONS = [
  "BE PART OF A FAST-GROWING COMMUNITY",
  "STAY UPDATED WITH CONTENT AND DROPS",
  "GET CLOSER TO THE JOURNEY BEHIND THE SCENES",
  "CONNECT WITH OTHERS IN THE CLAN",
];

export default function WhyJoin() {
  return (
    <section className="relative w-full bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Chapter · 03
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Why join
        </motion.h2>
      </div>

      <ul className="mt-16 w-full border-t border-line md:mt-24">
        {REASONS.map((reason, i) => (
          <motion.li
            key={reason}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: i * 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            data-cursor="hover"
            className="group relative w-full overflow-hidden border-b border-line transition-colors duration-300 hover:bg-accent"
          >
            <div className="mx-auto flex max-w-7xl items-baseline gap-6 px-6 py-10 md:px-10 md:py-14 lg:py-16">
              <span className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 group-hover:text-bg/60 md:text-sm">
                0{i + 1}
              </span>
              <span
                className="flex-1 font-display uppercase leading-[1.05] tracking-tight text-fg transition-colors duration-300 group-hover:text-bg"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
              >
                {reason}
              </span>
              <span
                aria-hidden
                className="hidden font-display text-fg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-bg md:block"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
              >
                →
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
