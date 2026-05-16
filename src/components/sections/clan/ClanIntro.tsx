"use client";

import { motion } from "framer-motion";

const PARAGRAPHS = [
  "The Iphe Clan is a growing community of fans, friends, and collaborators who showed up early, stayed, and kept showing up.",
  "It's the audience, the group chat, the strangers who quote his videos back at him in the street. The point of all of this.",
];

export default function ClanIntro() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Chapter · 01
        </motion.p>

        <div className="mt-10 space-y-6 font-sans text-lg leading-relaxed text-fg sm:text-xl md:text-2xl">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.18,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
