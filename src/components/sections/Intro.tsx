"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { imagekitLoader } from "@/lib/imagekit";

const HEADING_WORDS = ["Who", "is", "Iphe?"];

const PARAGRAPHS = [
  "Iphe is an entertainer known for high-energy videos, humour, and storytelling that connects across cultures.",
  "From viral skits to real-life challenges, his content blends entertainment with personality — building not just an audience, but a community.",
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true, amount: 0.2 });

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
        { y: 0 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        {/* Image column */}
        <div className="relative">
          <div
            ref={imageRef}
            className="group relative aspect-[2/3] w-full overflow-hidden bg-line"
          >
            <Image
              loader={imagekitLoader}
              src="images/iphe-hand-on-face-pose.JPG"
              alt="Iphe — UK content creator, editorial portrait."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={82}
              className="object-cover transition-[filter] duration-700 ease-out [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/60 to-transparent" />
            <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-widest text-fg/70">
              Portrait · 001
            </div>
          </div>
        </div>

        {/* Text column */}
        <div ref={textRef} className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            About
          </motion.p>

          <h2
            aria-label={HEADING_WORDS.join(" ")}
            className="mt-6 flex flex-wrap font-display uppercase leading-[0.95] tracking-tight text-fg"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            {HEADING_WORDS.map((word, i) => (
              <span key={i} className="mr-[0.25em] overflow-hidden pb-[0.05em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: 30, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : undefined}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <div className="mt-8 max-w-lg space-y-5 font-sans text-base leading-relaxed text-muted sm:text-lg">
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  delay: 0.25 + i * 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10"
          >
            <Link
              href="/about"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg"
            >
              <span className="relative">
                Read More
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-fg transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
