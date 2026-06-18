"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

type Platform = {
  label: string;
  cta: string;
  href: string;
  slug: string;
};

const PLATFORMS: Platform[] = [
  {
    label: "Discord",
    cta: "Join the Discord",
    href: "https://discord.gg/kU7Cyngexc",
    slug: "discord",
  },
  {
    label: "WhatsApp Channel",
    cta: "Join on WhatsApp",
    href: "https://whatsapp.com/channel/0029VaiZ0ZDEgGfKjv85gf08",
    slug: "whatsapp",
  },
  {
    label: "Instagram",
    cta: "Follow on Instagram",
    href: "https://www.instagram.com/iphe._a",
    slug: "instagram",
  },
  {
    label: "YouTube",
    cta: "Subscribe on YouTube",
    href: "https://youtube.com/@iphe._a",
    slug: "youtube",
  },
];

function PlatformCard({ platform, delay }: { platform: Platform; delay: number }) {
  const { label, cta, href, slug } = platform;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Magnetic radius={140} strength={0.18} block>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          aria-label={cta}
          className="group relative flex h-full min-h-[320px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-fg md:min-h-[420px] md:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at top left, rgba(234,254,7,0.08), transparent 70%)",
            }}
          />

          <div className="flex items-start justify-between">
            <div className="relative h-9 w-9 md:h-10 md:w-10">
              <Image
                src={`/icons/mono/${slug}.png`}
                alt=""
                fill
                sizes="40px"
                className="object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-0"
                aria-hidden
              />
              <Image
                src={`/icons/color/${slug}.png`}
                alt=""
                fill
                sizes="40px"
                className="scale-90 object-contain opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                aria-hidden
              />
            </div>
            <ArrowUpRight
              size={28}
              strokeWidth={1.5}
              className="-translate-x-1 translate-y-1 text-muted opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-fg group-hover:opacity-100"
            />
          </div>

          <div className="mt-16 md:mt-24">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {label}
            </p>
            <h3
              className="mt-3 font-display uppercase leading-[0.95] tracking-tight text-fg"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              {cta}
            </h3>
          </div>
        </a>
      </Magnetic>
    </motion.div>
  );
}

export default function JoinTheClan() {
  return (
    <section className="relative w-full bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            Chapter · 04
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display uppercase leading-[0.9] tracking-tight text-fg"
            style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
          >
            Join the Clan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mx-auto mt-8 max-w-xl font-sans text-base text-muted sm:text-lg"
          >
            Pick a doorway. They all lead to the same room.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-fr md:mt-24 md:gap-6">
          {PLATFORMS.map((platform, i) => (
            <PlatformCard
              key={platform.label}
              platform={platform}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
