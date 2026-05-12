"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "hover" | "watch";

export default function Cursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }

      const interactive = target.closest("[data-cursor]");
      const cursorAttr = interactive?.getAttribute("data-cursor");

      if (cursorAttr === "watch") setMode("watch");
      else if (cursorAttr === "hover") setMode("hover");
      else setMode("default");
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (isTouch) return null;

  const size = mode === "default" ? 8 : 32;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full bg-fg text-[10px] font-mono uppercase tracking-wider text-bg mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {mode === "watch" ? "WATCH" : null}
    </motion.div>
  );
}
