"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Copy } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const HEADLINE = "LET'S WORK";
const EMAIL = "teamiphe@gmail.com";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 75%)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        Contact · 005
      </motion.p>

      <h2
        aria-label={HEADLINE}
        className="mt-8 font-display uppercase leading-[0.85] tracking-tight text-fg"
        style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
      >
        {HEADLINE.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="inline-block overflow-hidden pb-[0.05em] align-bottom"
            aria-hidden
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                delay: 0.15 + i * 0.05,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <Magnetic radius={120} strength={0.3}>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-widest text-bg transition-colors hover:bg-accent/90 sm:text-sm"
          >
            <span>{EMAIL}</span>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email"}
              className="-mr-1 flex items-center gap-1 border-l border-bg/30 pl-3 transition-opacity hover:opacity-80"
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={2} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={1.75} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </a>
        </Magnetic>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1, duration: 0.8 }}
        className="mx-auto mt-12 max-w-xl font-sans text-base text-muted sm:text-lg"
      >
        Built on content. Backed by community. Driven by results.
      </motion.p>
    </section>
  );
}
