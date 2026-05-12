# ipheclan

Portfolio / fan-hub site for **Iphe** — creator and entertainer building the "Iphe Clan." Editorial, kinetic, motion-heavy. Dark theme with acid-yellow accent.

## Stack (pinned — do not bump majors)

| Package | Version | Why pinned |
|---|---|---|
| next | **14.2.35** | Next 16 + Turbopack hangs first compile on M1 Pro. Stay on 14.x patched. |
| react / react-dom | **18.3.1** | React 19 breaks framer-motion 12, lenis 1.3, lucide 1.x. |
| tailwindcss | **3.4.x** | v4 drops the `tailwind.config.ts` design-token pattern this project uses. |
| framer-motion | **11.x** | v12 requires React 19. |
| gsap | **3.12.x** + `@gsap/react` 2.1.x | Stable with the ScrollTrigger + Lenis bridge. |
| lenis | **1.1.x** | 1.3 has scroll-shim regressions. |
| lucide-react | **0.460.x** | The `1.x` on npm is a squat — real package is `0.4xx`. |
| tailwind-merge | **2.5.x**, react-intersection-observer **9.x**, @vercel/analytics **1.x** | Each major bump drops React-18 support. |
| eslint | **8.57.1** | Next 14 uses legacy config; eslint 9 flat config is flaky. |

**If a new chat tries to upgrade any of these, stop and read this file.** The M1 Pro hang is the canonical failure mode — `Ready in 300ms` then `Compiling /` wedges forever.

## Config gotchas (Next 14 specifics)

- `next.config.mjs` — **not** `.ts` (TS config landed in Next 15).
- `.eslintrc.json` extending `next/core-web-vitals` — **not** `eslint.config.mjs` flat config.
- `tsconfig.json` `include` does **not** reference `.next/dev/types/**` (Next 15+ only).
- PostCSS uses `tailwindcss` + `autoprefixer` plugins — **not** `@tailwindcss/postcss` (that's v4).

## Design tokens — [tailwind.config.ts](tailwind.config.ts)

```
bg     #0A0A0A   page background
fg     #FAFAFA   primary text
muted  #6B6B6B   secondary text
accent #EAFE07   acid yellow (CTAs, highlights)
line   #1A1A1A   subtle borders
```

Fonts via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx):
- **Anton** → `--font-display` → `font-display` (massive headlines only)
- **Inter** → `--font-sans` → `font-sans` (body default)
- **JetBrains Mono** → `--font-mono` → `font-mono` (labels, micro-text, CTAs)

## File layout

```
src/
  app/
    layout.tsx        Fonts, metadata, viewport, mounts SmoothScroll + Cursor + Nav + Analytics
    page.tsx          Composes sections
    globals.css       @tailwind directives, body bg/fg, cursor:none desktop-only, font-feature-settings
  components/
    SmoothScroll.tsx  Lenis + GSAP ticker bridge (desktop only)
    Cursor.tsx        Custom cursor, reads data-cursor attrs
    Nav.tsx           Fixed top, fades to blurred bg after 100px scroll, magnetic links
    sections/
      Hero.tsx        Hero section — see "patterns" below
```

New sections go in `src/components/sections/`. Reusable primitives (magnetic button, tilt wrapper, etc.) go in `src/components/`.

## Conventions

### Cursor interop
- `data-cursor="hover"` on any interactive element → custom cursor scales to 32px.
- `data-cursor="watch"` → cursor shows "WATCH" label (for video/thumbnail tiles).
- The cursor is hidden on touch devices and `cursor: none` is gated behind `@media (hover: hover) and (pointer: fine)` in [globals.css](src/app/globals.css). Don't break this — touch users need their native cursor/finger.

### Touch gating (do this for every mouse-driven effect)
```ts
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
if (isTouch) return;
```
Applies to: tilt, magnetic, custom cursor, Lenis smooth scroll. All four are already gated in current components — match the pattern.

### Motion patterns (already implemented — copy from [Hero.tsx](src/components/sections/Hero.tsx))

- **3D tilt**: `useMotionValue` (normalized -0.5..0.5) → `useTransform` to deg range → `useSpring` for smoothing → applied as `rotateX`/`rotateY`. Put `perspective: 1000` on a **wrapper** div and `transformStyle: "preserve-3d"` on the rotating element.
- **Magnetic**: global `mousemove` → `Math.hypot(dx, dy) < 100` of button center → set spring `x/y` to `d * 0.35`, else zero.
- **Letter stagger**: `WORD.split("")` → each char a `motion.span` with `delay: i * 0.05`, easing `[0.22, 1, 0.36, 1]`.
- **GSAP ScrollTrigger**: register inside `useEffect`, wrap in `gsap.context(() => {...}, ref)` and `return () => ctx.revert()` for cleanup. Don't register at module top — breaks SSR.

### Components are client by default
Anything using framer-motion, gsap, lenis, or `window` needs `"use client"` at top. Sections live as client components; keep `app/page.tsx` as a server component that just composes them.

### Tailwind
- Use `font-display` for any text in Anton; never inline-style Anton.
- Use `text-muted` for secondary text — don't reach for `text-gray-*`.
- For massive responsive type: `clamp(min, vw, max)` via inline `style={{ fontSize: ... }}` since Tailwind's arbitrary `text-[clamp(...)]` is verbose and clamp values aren't tokenizable.

## Dev workflow

```
npm run dev      # webpack dev, ~4–8s first compile, hot reloads sub-second
npm run build    # production build
npm run lint     # next lint (legacy eslint 8)
```

First `/` compile downloads Anton/Inter/JetBrains from Google Fonts. If you see `The user aborted a request` / `Retrying 1/3` in the dev log, it's the font fetcher hitting a transient network hiccup — Next retries and recovers. Not a code issue.

## What's built so far

- Project scaffold, design tokens, fonts, metadata
- [SmoothScroll](src/components/SmoothScroll.tsx) (Lenis + GSAP ticker)
- [Cursor](src/components/Cursor.tsx) (8px dot, 32px on `data-cursor="hover"`, "WATCH" on `data-cursor="watch"`)
- [Nav](src/components/Nav.tsx) (transparent → blurred after 100px, magnetic links)
- [Hero](src/components/sections/Hero.tsx) (tilt, letter stagger, scroll-out, magnetic CTAs, scroll indicator)
- [SocialProof](src/components/sections/SocialProof.tsx) (GSAP count-up via `useGSAP`, suffix fade-in, ScrollTrigger `start: "top 70%" once: true`, Meta recognition line)
- [RecognitionMarquee](src/components/sections/RecognitionMarquee.tsx) (seamless x-translate marquee via `useAnimationFrame` driving a `useMotionValue`; speed via `durationRef` ref — 40s default, 15s on section hover. Don't use state-driven `transition.duration` for marquee speed — it snaps to start.)

Sections still to build: About, Work, Clan, Footer.
