"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

const WORD = "IPHE";

function MagneticCTA({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        x.set(dx * 0.35);
        y.set(dy * 0.35);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      data-cursor="hover"
      style={{ x: sx, y: sy }}
      className={clsx(
        "rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors",
        variant === "primary"
          ? "bg-accent text-bg hover:bg-accent/90"
          : "border border-fg/80 text-fg hover:border-fg"
      )}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
    mass: 0.5,
  });

  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-bg"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div style={{ perspective: 1000 }}>
          <motion.div
            ref={titleRef}
            aria-label={WORD}
            className="font-display leading-none tracking-tight text-fg"
            style={{
              fontSize: "clamp(8rem, 20vw, 20rem)",
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {WORD.split("").map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                aria-hidden
                className="inline-block"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.p
          className="mt-8 font-mono text-xs uppercase tracking-widest text-muted sm:text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Creator. Entertainer. Building the Iphe Clan.
        </motion.p>

        <motion.p
          className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          Millions watching. A community growing.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <MagneticCTA variant="primary">JOIN THE CLAN</MagneticCTA>
          <MagneticCTA variant="ghost">WORK WITH ME</MagneticCTA>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.0 }}
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={14} strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
