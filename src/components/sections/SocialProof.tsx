"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Stat = {
  value: number;
  suffix: "M+" | "K+";
  platform: string;
};

// last updated: 2026-05-17 — refresh monthly
const stats: Stat[] = [
  { value: 4, suffix: "M+", platform: "TikTok" },
  { value: 300, suffix: "K+", platform: "Instagram" },
  { value: 50, suffix: "K+", platform: "YouTube" },
  { value: 500, suffix: "K+", platform: "Snapchat" },
  { value: 700, suffix: "K+", platform: "Facebook" },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const blocks = gsap.utils.toArray<HTMLElement>("[data-stat]");

      blocks.forEach((block, i) => {
        const numberEl = block.querySelector<HTMLElement>("[data-number]");
        const suffixEl = block.querySelector<HTMLElement>("[data-suffix]");
        if (!numberEl || !suffixEl) return;

        const target = Number(numberEl.dataset.target);
        const counter = { val: 0 };

        const tl = gsap.timeline({
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });

        tl.fromTo(
          block,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
          .to(
            counter,
            {
              val: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                numberEl.textContent = Math.round(counter.val).toString();
              },
            },
            "<"
          )
          .to(suffixEl, { opacity: 1, duration: 0.4 }, ">");
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-bg px-6 py-24 md:px-10 md:py-32"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Watched by Millions
      </p>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.platform} data-stat className="flex flex-col">
            <div className="h-px w-full bg-line" />
            <div
              className="mt-6 flex items-baseline font-display leading-none tracking-tight text-fg"
              style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
            >
              <span data-number data-target={stat.value}>
                0
              </span>
              <span data-suffix className="opacity-0">
                {stat.suffix}
              </span>
            </div>
            <p className="mt-5 font-sans text-xs uppercase tracking-wider text-muted">
              {stat.platform}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24 flex flex-col items-center text-center md:mt-32">
        <p className="max-w-xl font-sans text-base text-fg sm:text-lg">
          Recognised by <span className="text-accent">Meta</span> as a{" "}
          <span className="text-accent">Creator of Tomorrow</span>
        </p>
        <p className="mt-3 font-sans text-xs italic text-muted">(2024)</p>
      </div>
    </section>
  );
}
