"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Share2 } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work With Me", href: "/work" },
  { label: "The Clan", href: "/clan" },
];

type Social = {
  label: string;
  href: string;
  slug: string;
  colorExt: "png" | "svg";
};

const SOCIALS: Social[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@iphe._a",
    slug: "tiktok",
    colorExt: "png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/iphe._a",
    slug: "instagram",
    colorExt: "png",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@iphe._a",
    slug: "youtube",
    colorExt: "png",
  },
  {
    label: "Snapchat",
    href: "https://snapchat.com/t/U89klCIj",
    slug: "snapchat",
    colorExt: "png",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CZPkTog4v/",
    slug: "facebook",
    colorExt: "svg",
  },
  {
    label: "X",
    href: "https://x.com/iphe__a",
    slug: "x",
    colorExt: "png",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@iphe._a",
    slug: "threads",
    colorExt: "png",
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VaiZ0ZDEgGfKjv85gf08",
    slug: "whatsapp",
    colorExt: "png",
  },
  {
    label: "Discord",
    href: "https://discord.gg/WDnXWpt6B",
    slug: "discord",
    colorExt: "png",
  },
];

const EMAIL = "contact@ipheclan.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!shared) return;
    const t = setTimeout(() => setShared(false), 1800);
    return () => clearTimeout(t);
  }, [shared]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: "Iphe",
      text: "Creator. Entertainer. Building the Iphe Clan.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
      }
    } catch {
      /* user dismissed the share sheet — ignore */
    }
  };

  return (
    <footer className="relative w-full border-t border-line bg-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3 md:gap-8 md:px-10 md:py-24">
        {/* Brand */}
        <div className="flex flex-col">
          <span
            className="font-display uppercase leading-none tracking-tight text-fg"
            style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
          >
            IPHE
          </span>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">
            © 2026. Built by{" "}
            <a
              href="https://www.greyform.org/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Greyform
            </a>
            .
          </p>
        </div>

        {/* Nav */}
        <div className="flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Explore
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Magnetic radius={70} strength={0.3}>
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    className="font-sans text-sm uppercase tracking-wider text-fg/80 transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Follow
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 sm:gap-x-10">
            {SOCIALS.map(({ label, href, slug, colorExt }) => (
              <li key={slug}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className="group/social relative flex items-center gap-3 py-1.5 text-fg/70 transition-colors duration-300 hover:text-fg"
                >
                  <span className="relative h-4 w-4 shrink-0">
                    <Image
                      src={`/icons/mono/${slug}.png`}
                      alt=""
                      width={16}
                      height={16}
                      className="absolute inset-0 h-full w-full object-contain opacity-70 transition-opacity duration-500 group-hover/social:opacity-0"
                      aria-hidden
                    />
                    <Image
                      src={`/icons/color/${slug}.${colorExt}`}
                      alt=""
                      width={16}
                      height={16}
                      className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover/social:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="font-sans text-[13px] uppercase tracking-wider transition-transform duration-300 ease-out group-hover/social:translate-x-0.5">
                    {label}
                  </span>
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    className="ml-auto -translate-x-1 translate-y-1 text-muted opacity-0 transition-all duration-300 ease-out group-hover/social:translate-x-0 group-hover/social:translate-y-0 group-hover/social:text-fg group-hover/social:opacity-100"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-widest text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <button
            type="button"
            onClick={copyEmail}
            data-cursor="hover"
            aria-label={copied ? "Email copied" : `Copy ${EMAIL}`}
            className="group inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
          >
            <span>{EMAIL}</span>
            {copied ? (
              <Check size={13} strokeWidth={1.8} className="text-accent" />
            ) : (
              <Copy
                size={13}
                strokeWidth={1.5}
                className="opacity-70 transition-opacity group-hover:opacity-100"
              />
            )}
            <span
              className={`text-[10px] transition-opacity ${
                copied ? "opacity-100 text-accent" : "opacity-0"
              }`}
            >
              Copied
            </span>
          </button>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={share}
              data-cursor="hover"
              aria-label="Share Iphe"
              className="group inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
            >
              {shared ? (
                <Check size={13} strokeWidth={1.8} className="text-accent" />
              ) : (
                <Share2
                  size={13}
                  strokeWidth={1.5}
                  className="opacity-70 transition-opacity group-hover:opacity-100"
                />
              )}
              <span>{shared ? "Link copied" : "Share"}</span>
            </button>
            <span className="text-muted">Est. 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
