"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { imagekitLoader } from "@/lib/imagekit";

type Polaroid = {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  desktopPosition: string;
  z: number;
};

const polaroids: Polaroid[] = [
  {
    src: "images/iphe-smiling.JPG",
    alt: "Iphe smiling, candid moment.",
    caption: "Off camera.",
    rotate: -7,
    desktopPosition: "md:left-[2%] md:top-[2%]",
    z: 10,
  },
  {
    src: "images/iphe-downwards-camera-angle.jpg",
    alt: "Iphe shot from above in a studio.",
    caption: "Studio nights.",
    rotate: 5,
    desktopPosition: "md:right-[4%] md:top-[6%]",
    z: 20,
  },
  {
    src: "images/iphe-smiling-sitting-on-floor.jpg",
    alt: "Iphe smiling, sitting on the floor.",
    caption: "Tuesday.",
    rotate: -3,
    desktopPosition: "md:left-1/2 md:top-[34%] md:-translate-x-1/2",
    z: 40,
  },
  {
    src: "images/iphe-sitting-couch-pose.JPG",
    alt: "Iphe on a couch, relaxed.",
    caption: "London · 2025.",
    rotate: 6,
    desktopPosition: "md:left-[8%] md:bottom-[2%]",
    z: 30,
  },
  {
    src: "images/iphe-ground-sit-pose.jpg",
    alt: "Iphe seated on the ground, contemplative.",
    caption: "After the shoot.",
    rotate: -5,
    desktopPosition: "md:right-[10%] md:bottom-[4%]",
    z: 25,
  },
];

export default function Moments() {
  return (
    <section className="relative w-full overflow-hidden bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-widest text-muted"
            >
              Moments · 001
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              Off
              <br />
              Camera.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[36ch] font-sans text-sm leading-relaxed text-muted md:text-base"
          >
            The Clan isn&apos;t just the videos. It&apos;s the in-betweens —
            the photos, the late-night posts, the moments that don&apos;t make
            the final cut.
          </motion.p>
        </div>

        <div className="relative mx-auto flex flex-col items-center gap-10 md:block md:h-[820px] lg:h-[900px]">
          {polaroids.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                zIndex: p.z,
                filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.55))",
              }}
              className={clsx(
                "group relative w-[78%] max-w-[280px] origin-center md:absolute md:w-[260px] lg:w-[300px]",
                p.desktopPosition
              )}
            >
              <div className="pointer-events-none absolute -top-2 left-1/2 z-10 h-3 w-12 -translate-x-1/2 rotate-[-3deg] bg-fg/15 backdrop-blur-sm md:h-4 md:w-14" />

              <div
                className="relative bg-fg p-3 pb-12 transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:-rotate-[1deg]"
                data-cursor="hover"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
                  <Image
                    loader={imagekitLoader}
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 280px"
                    quality={80}
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-widest text-bg">
                  {p.caption}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
