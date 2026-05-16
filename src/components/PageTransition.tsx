"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const COVER_MS = 600;
const HOLD_MS = 300;
const EASE = [0.76, 0, 0.24, 1] as const;

function titleFor(path: string) {
  if (path === "/") return "IPHE";
  if (path.startsWith("/about")) return "ABOUT";
  if (path.startsWith("/work")) return "WORK";
  if (path.startsWith("/clan")) return "THE CLAN";
  return "";
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [overlayTitle, setOverlayTitle] = useState<string | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const rawHref = link.getAttribute("href");
      if (!rawHref) return;
      if (
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (activeRef.current) return;
      activeRef.current = true;
      setOverlayTitle(titleFor(url.pathname));

      timers.push(
        setTimeout(() => {
          router.push(url.pathname + url.search + url.hash);
          window.scrollTo({ top: 0, behavior: "auto" });
        }, COVER_MS)
      );

      timers.push(
        setTimeout(() => {
          setOverlayTitle(null);
          activeRef.current = false;
        }, COVER_MS + HOLD_MS)
      );
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      timers.forEach(clearTimeout);
    };
  }, [router]);

  return (
    <>
      {children}
      <AnimatePresence mode="wait">
        {overlayTitle !== null && (
          <motion.div
            key="page-transition-panel"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: COVER_MS / 1000, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
            aria-hidden
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.35,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display leading-none tracking-tight text-fg"
              style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}
            >
              {overlayTitle}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
