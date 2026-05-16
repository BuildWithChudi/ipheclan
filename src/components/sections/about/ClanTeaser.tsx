"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function ClanTeaser() {
  return (
    <section className="relative w-full overflow-hidden bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          The Iphe Clan
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Built by the people,
          <br />
          for the people.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-10 max-w-xl font-sans text-base text-muted sm:text-lg"
        >
          The Clan isn&apos;t a fanbase. It&apos;s a community of friends,
          collaborators, and fans who showed up, stayed, and made something
          together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-12 inline-block"
        >
          <Magnetic radius={100} strength={0.35}>
            <Link
              href="/clan"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full border border-fg/80 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition-colors hover:border-fg"
            >
              Meet the Clan
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
