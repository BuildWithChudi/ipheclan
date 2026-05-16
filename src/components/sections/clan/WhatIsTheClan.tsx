"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { imagekitLoader } from "@/lib/imagekit";

const BODY = [
  "It started with videos. The Clan is what grew around them — a feedback loop of people who get the references, share the screenshots, and turn up to the comments before anyone else.",
  "It's not curated. There's no membership tier, no application, no waiting list. If you've ever quoted a video back at a friend, you're already in.",
];

export default function WhatIsTheClan() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Chapter · 02
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          What is
          <br />
          the Clan
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-16 lg:gap-24">
          {/* Body — two-column text */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
              {BODY.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-sans text-base leading-relaxed text-muted sm:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Polaroid */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3.5 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mx-auto w-full max-w-[360px] origin-center"
              style={{
                filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.6))",
              }}
            >
              {/* Pin / tape detail */}
              <div className="pointer-events-none absolute -top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rotate-[-2deg] bg-fg/15 backdrop-blur-sm" />

              <div className="relative bg-fg p-3 pb-14 transition-transform duration-700 ease-out group-hover:-rotate-[1deg]">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
                  <Image
                    loader={imagekitLoader}
                    src="images/iphe-smiling-sitting-on-floor.jpg"
                    alt="Iphe with the Clan, candid moment on the floor."
                    fill
                    sizes="(min-width: 768px) 380px, 100vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
                <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-widest text-bg">
                  Real moments · Real community
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
