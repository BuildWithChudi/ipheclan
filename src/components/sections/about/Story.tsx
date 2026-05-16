"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { imagekitLoader } from "@/lib/imagekit";

type Row = {
  src: string;
  alt: string;
  caption: string;
  paragraphs: string[];
};

const ROWS: Row[] = [
  {
    src: "images/iphe-rings-pose.JPG",
    alt: "Iphe in fashion editorial — rings and hand detail.",
    caption: "Portrait · 002",
    paragraphs: [
      "Iphe is a UK-based content creator and entertainer with millions of followers across TikTok, Instagram, YouTube, and Snapchat. His videos blend humour, storytelling, and the everyday energy of someone who refuses to take himself too seriously.",
      "In 2025 he was named one of Meta's Creators of Tomorrow — a recognition of voices reshaping what online entertainment looks like in the UK.",
    ],
  },
  {
    src: "images/iphe-kissing-award.JPG",
    alt: "Iphe with his Meta Creator of Tomorrow award.",
    caption: "Portrait · 003",
    paragraphs: [
      "Beyond the camera, Iphe is building something quieter and harder — a community. The Iphe Clan is the audience, the friends, the strangers who quote his lines back at him in the street.",
      "Real-life experiences fuel the work. The challenges, the laughter, the moments most people would edit out. That's the bit that hits hardest. That's the bit that travels.",
    ],
  },
];

function StoryRow({ row, reverse }: { row: Row; reverse: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        imageRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: rowRef }
  );

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="md:sticky md:top-24 md:self-start">
        <div
          ref={imageRef}
          className="group relative aspect-[2/3] w-full overflow-hidden bg-line"
        >
          <Image
            loader={imagekitLoader}
            src={row.src}
            alt={row.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            quality={82}
            className="object-cover transition-[filter] duration-700 ease-out [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/60 to-transparent" />
          <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-widest text-fg/70">
            {row.caption}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="space-y-6 font-sans text-base leading-relaxed text-muted sm:text-lg">
          {row.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.12,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Story() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
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
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
      >
        The Story
      </motion.h2>

      <div className="mt-16 space-y-20 md:mt-28 md:space-y-48">
        {ROWS.map((row, i) => (
          <StoryRow key={row.src} row={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
