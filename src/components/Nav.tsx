"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import Magnetic from "@/components/Magnetic";

const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Clan", href: "/clan" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/60 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-4xl leading-none tracking-tight text-fg md:text-5xl"
        >
          IPHE
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {links.map((l) => (
            <Magnetic key={l.href} radius={70} strength={0.3}>
              <Link
                href={l.href}
                data-cursor="hover"
                className="font-sans text-xs uppercase tracking-wider text-fg/80 transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            </Magnetic>
          ))}
        </div>
      </nav>
    </header>
  );
}
