"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  /**
   * Render as a block-level element that fills its parent (`h-full w-full`).
   * Use for card-shaped grid items so they stretch to the grid cell's height.
   * Defaults to inline-block — keep that for buttons, nav links, social icons.
   */
  block?: boolean;
};

export default function Magnetic({
  children,
  className,
  radius = 100,
  strength = 0.35,
  block = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

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
      if (dist < radius) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [radius, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={clsx(block && "block h-full w-full", className)}
      style={{
        x: sx,
        y: sy,
        display: block ? undefined : "inline-block",
      }}
    >
      {children}
    </motion.div>
  );
}
