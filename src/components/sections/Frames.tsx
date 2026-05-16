"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { clsx } from "clsx";
import { imagekitLoader } from "@/lib/imagekit";

const frames = [
  {
    src: "images/iphe-smiling-sitting-on-floor.jpg",
    alt: "Iphe in editorial portrait, sitting on the floor, smiling.",
    caption: "Portrait · 001",
  },
  {
    src: "images/iphe-ground-sit-pose.jpg",
    alt: "Iphe sitting on the ground, smiling.",
    caption: "Portrait · 002",
  },
  {
    src: "images/iphe-downwards-camera-angle.jpg",
    alt: "Iphe looking up at the camera from a downwards angle.",
    caption: "Portrait · 003",
  },
];

export default function Frames() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yOuter = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yInner = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={sectionRef}
      className="bg-bg px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Frames · 001
          </p>
          <p className="max-w-[28ch] text-right font-mono text-[10px] uppercase tracking-widest text-muted md:text-xs">
            Editorial portraits — outside the algorithm.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {frames.map((frame, i) => {
            const isMiddle = i === 1;
            const y = isMiddle ? yInner : yOuter;
            return (
              <motion.figure
                key={frame.src}
                style={{ y }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={clsx(
                  "group relative",
                  isMiddle && "md:mt-24"
                )}
              >
                <div
                  className="relative aspect-[2/3] overflow-hidden"
                  data-cursor="hover"
                >
                  <Image
                    loader={imagekitLoader}
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={82}
                    className="object-cover transition-[filter,transform] duration-[1200ms] ease-out [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {frame.caption}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
