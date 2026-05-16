"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

type Service = {
  number: string;
  name: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    name: "TikTok Campaigns",
    description:
      "Native, scroll-stopping skits and challenges built around your brand. From single drops to multi-video arcs.",
  },
  {
    number: "02",
    name: "Instagram Reels",
    description:
      "Short-form storytelling that lives in feeds and in Story shares. Designed for save, send, and replay.",
  },
  {
    number: "03",
    name: "YouTube Integrations",
    description:
      "Long-form placements inside vlogs, challenges, and series. Brand baked in, not bolted on.",
  },
  {
    number: "04",
    name: "Snapchat & Facebook",
    description:
      "Cross-platform amplification to the same loyal community that's already paying attention.",
  },
  {
    number: "05",
    name: "Content Creation",
    description:
      "Bespoke videos and creative direction for your channels. The voice and energy, on your owned assets.",
  },
];

function ServiceCard({
  service,
  className,
  delay,
}: {
  service: Service;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={clsx("group relative h-full", className)}
    >
      <div
        data-cursor="hover"
        className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-line bg-bg p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:border-accent md:min-h-[340px] md:p-10"
      >
        {/* hover gradient */}
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
             style={{
               background:
                 "radial-gradient(ellipse at top left, rgba(234,254,7,0.06), transparent 70%)",
             }}
        />

        <p className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-500 group-hover:text-accent">
          {service.number}
        </p>

        <h3
          className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
        >
          {service.name}
        </h3>

        <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-muted sm:text-base">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Chapter · 02
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Services
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:auto-rows-fr md:grid-cols-6 md:gap-8">
          <ServiceCard service={SERVICES[0]} className="md:col-span-2" delay={0} />
          <ServiceCard service={SERVICES[1]} className="md:col-span-2" delay={0.1} />
          <ServiceCard service={SERVICES[2]} className="md:col-span-2" delay={0.2} />
          <ServiceCard
            service={SERVICES[3]}
            className="md:col-span-2 md:col-start-2"
            delay={0.3}
          />
          <ServiceCard service={SERVICES[4]} className="md:col-span-2" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
