"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = ["I", "P", "H", "E"];
const TYPE_DELAY = 0.1;
const HOLD_MS = 500;
const SHRINK_MS = 800;
const EASE = [0.76, 0, 0.24, 1] as const;

type Phase = "initial" | "typing" | "shrinking" | "done";

export default function Loader() {
  const [phase, setPhase] = useState<Phase>("initial");

  useEffect(() => {
    if (sessionStorage.getItem("iphe-loaded")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("iphe-loaded", "1");
    setPhase("typing");

    const typeMs = LETTERS.length * TYPE_DELAY * 1000;
    const shrinkAt = typeMs + HOLD_MS;
    const doneAt = shrinkAt + SHRINK_MS;

    const t1 = setTimeout(() => setPhase("shrinking"), shrinkAt);
    const t2 = setTimeout(() => setPhase("done"), doneAt);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={phase === "shrinking" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: SHRINK_MS / 1000, ease: EASE }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
      aria-hidden
    >
      <motion.div
        className="flex font-display leading-none tracking-tight text-fg"
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)" }}
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={
          phase === "shrinking"
            ? { scale: 0.18, x: "-38vw", y: "-38vh" }
            : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.6, ease: EASE }}
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={phase === "initial" ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            transition={{
              delay: phase === "typing" ? i * TYPE_DELAY : 0,
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
