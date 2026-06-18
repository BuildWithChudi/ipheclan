# ipheclan

Portfolio and fan-hub site for **Iphe** — a UK content creator and entertainer building the *Iphe Clan*. A four-page marketing site with a heavy motion layer: smooth scrolling, a custom cursor, magnetic interactions, page-transition overlays, and cinematic video heroes.

- **Live:** [ipheclan.com](https://ipheclan.com)
- **Host:** Vercel (auto-deploys from `main`)
- **Built by:** [Greyform](https://www.greyform.org)

---

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server components compose client sections |
| Language | TypeScript (strict) | Path alias `@/*` → `src/*` |
| Styling | Tailwind CSS 3 | Design tokens in `tailwind.config.ts` |
| Animation | Framer Motion + GSAP | Framer for component motion; GSAP/ScrollTrigger for scroll-scrubbed effects |
| Smooth scroll | Lenis | Desktop only; driven off the GSAP ticker |
| Images | ImageKit | `next/image` with a custom loader |
| Video | Cloudinary | Source `.mov` files transcoded to capped H.264 mp4 |
| Icons | lucide-react | Plus PNG/SVG social icons in `public/` |
| Analytics | Vercel Web Analytics + Speed Insights | |
| Sitemap | next-sitemap | Generated on `postbuild` |

Versions are pinned deliberately — see [Upgrade notes](#upgrade-notes) before bumping anything major.

There are **no environment variables and no secrets**. Every CDN account name and media identifier is a literal constant in the source (see [Media](#media)). The app builds and runs with nothing but `npm install`.

---

## Quickstart

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). First compile is a few seconds; hot reload is sub-second.

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build — runs `next-sitemap` afterward to regenerate `public/sitemap.xml` |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint (Next.js config, ESLint 8) |

---

## Project layout

```
src/
  app/                      Routes. Each page is a server component that composes client sections.
    layout.tsx              Root shell — metadata, fonts, JSON-LD, providers, favicons, CDN preconnects
    page.tsx                /        home
    about/page.tsx          /about
    work/page.tsx           /work
    clan/page.tsx           /clan
    opengraph-image.tsx     Per-route dynamic OG card (also under about/, work/, clan/)
    error.tsx               Route-level error boundary
    global-error.tsx        Root error boundary
    not-found.tsx           404
    globals.css             Base reset, font wiring, cursor + reduced-motion rules

  components/               Shared primitives used across routes
    sections/               Page sections, grouped by route
      about/  work/  clan/  Route-specific sections
      *.tsx                 Home-page sections (Hero, ReelWall, FeaturedVideo, …)

  lib/
    imagekit.ts             ImageKit base URL + next/image loader
    cloudinary.ts           Cloudinary video/poster URL builders + the clip catalogue
    og.tsx                  Shared <ImageResponse> generator for social cards

  types/css.d.ts            Ambient typings

public/
  icons/{mono,color}/       Social icons in two states (mono default, colour on hover)
  favicon*, og-image.jpg, robots.txt, sitemap.xml, site.webmanifest
```

The site is intentionally static — no API routes, no database, no auth. All copy and links are hard-coded constants inside the components that use them.

---

## How a page is built

Every route follows the same shape:

1. A **server component** (`app/<route>/page.tsx`) exports `metadata` and renders an ordered list of sections inside `<main className="bg-bg">`.
2. Each **section** lives in `components/sections/<route>/` and is a `"use client"` component owning its own layout, copy, and motion.
3. The root **layout** (`app/layout.tsx`) wraps every page in the global chrome — loader, smooth scroll, cursor, nav, page-transition overlay, footer, grain, and the analytics scripts.

To add a section: build it under the right `sections/` folder, then import and place it in the route's `page.tsx`. To reorder, move the JSX. There is no central route registry beyond the page files themselves.

---

## Design system

Tokens are defined once in `tailwind.config.ts` and mirrored in `globals.css` for the pre-hydration paint.

| Token | Value | Use |
|---|---|---|
| `bg` | `#0A0A0A` | Near-black background |
| `fg` | `#FAFAFA` | Off-white foreground |
| `muted` | `#6B6B6B` | Secondary text, captions |
| `accent` | `#EAFE07` | Acid yellow — **used sparingly** |
| `line` | `#1A1A1A` | Hairline borders |

**Fonts** (loaded via `next/font/google`, exposed as CSS variables):

- `--font-display` — Anton — oversized uppercase headlines
- `--font-sans` — Inter — body copy
- `--font-mono` — JetBrains Mono — labels, captions, eyebrow text

**Accent discipline.** The acid yellow is a punctuation mark, not a palette. It appears on the primary CTA, a few hover states, the live "sound on" indicator, and the OG card's corner square — and almost nowhere else. Keep it scarce; spreading it dilutes the effect the whole design leans on.

**Type scale.** Headlines use fluid `clamp()` sizing inline (e.g. `clamp(3rem, 9vw, 8rem)`) rather than Tailwind text classes, so they scale continuously with the viewport.

---

## Motion architecture

Motion is the product here, so it's worth understanding the moving parts before touching them. All of it degrades gracefully: anything below respects `prefers-reduced-motion` and is disabled on touch devices where it doesn't make sense.

| Component | Responsibility |
|---|---|
| `MotionProvider` | Wraps the app in Framer's `<MotionConfig reducedMotion="user">` so reduced-motion is honoured globally |
| `SmoothScroll` | Lenis smooth scrolling, ticked by GSAP. **Disabled on touch and reduced-motion.** |
| `Cursor` | Custom dot cursor (SSR-disabled). Grows and can show a `WATCH` label based on the hovered element's `data-cursor` attribute. Hidden on touch. |
| `Magnetic` | Wrapper that pulls its child toward the pointer within a radius. Tunable `radius`/`strength`; `block` mode for card-shaped grid cells. |
| `MagneticCTA` | The standard button/link. Polymorphic (renders `<a>`, `<Link>`, or `<button>` from its props), `primary` / `ghost` variants, wrapped in `Magnetic`. Use this for all CTAs. |
| `Loader` | One-time intro that types out "IPHE" then shrinks away. Gated by `sessionStorage` so it only plays once per session. |
| `PageTransition` | Intercepts same-origin link clicks, slides a titled panel over the screen, then navigates and scrolls to top. |
| `Grain` | Static SVG film-grain overlay at low opacity. Pure render, no per-frame work. |
| `HeroBackground` | The shared cinematic video hero (see below). |

### Cursor protocol

The custom cursor reads a `data-cursor` attribute off the nearest matching ancestor of whatever the pointer is over:

- `data-cursor="hover"` — cursor enlarges (links, buttons, cards)
- `data-cursor="watch"` — cursor enlarges and shows a `WATCH` label (the featured video)

Native cursors are hidden via `globals.css` (`cursor: none`) **only** on `hover: hover` + `pointer: fine` devices, so touch users keep their system cursor and the custom one never renders.

### Hero video backgrounds (`HeroBackground`)

Shared by every page hero. The performance contract is deliberate, so preserve it if you edit it:

- The **first poster frame is server-rendered** and is the page's LCP element — it's preloaded with high fetch priority.
- No `<video>` gets a `src` until JS arms playback **~700ms after paint**, and only on capable connections — it bails on `prefers-reduced-motion`, `saveData`, and `2g`.
- Clips crossfade on a 7s cycle; only the visible clip plays, the rest are paused.
- On any video error the clip is dropped and the poster remains.

Each page gets its own curated clip mix from `HERO_CLIPS` in `lib/cloudinary.ts`, so the heroes don't all feel identical.

---

## Media

Two CDNs, split by media type. Neither requires credentials in this repo — delivery is via public URLs built from constants.

### Images — ImageKit

Served from `https://ik.imagekit.io/chewdee/greyform/ipheclan/public/content`. Use `next/image` with the custom loader, which appends ImageKit transforms (`w-`, `f-auto`, `q-`):

```tsx
import Image from "next/image";
import { imagekitLoader } from "@/lib/imagekit";

<Image
  loader={imagekitLoader}
  src="images/your-file.jpg"   // path relative to the ImageKit base
  alt="Descriptive alt text"
  fill
  sizes="(min-width: 768px) 50vw, 100vw"
/>
```

Upload to the matching `images/` folder in the ImageKit dashboard (`chewdee` account), then reference by relative path. The hostname is allow-listed in `next.config.mjs` — new image hosts must be added there too.

### Video — Cloudinary

Source uploads are `.mov` (QuickTime): fine on Safari, broken or oversized elsewhere. The raw asset is **never served**. Instead, helpers in `lib/cloudinary.ts` build width-capped, auto-quality H.264 mp4 URLs (`clVideo`) and pull poster frames straight from the video (`clPoster`).

To add a clip:

1. Upload to Cloudinary (`dud5owpai` account). Note its **public ID** and **version**.
2. Register it in `lib/cloudinary.ts` — add to `REELS` (the reel strip) and/or the `CLIP` catalogue, then wire it into `HERO_CLIPS` for whichever heroes should feature it.
3. Build URLs with `clVideo(publicId, version, opts)` / `clPoster(...)`. The grayscale hero look is baked in per-call via `extra: ["e_grayscale"]` — full-colour is reserved for the featured centrepiece.

> Do not commit media to `public/`. It's kept deliberately small (favicons, social icons, one static OG fallback). All real content lives on the CDNs.

---

## SEO, metadata & social cards

- **Metadata** is centralised in `app/layout.tsx` (defaults, title template, OpenGraph, Twitter, robots, verification) and overridden per route via each `page.tsx`'s `metadata` export (title, description, canonical, route-specific keywords).
- **Structured data**: `Person` and `WebSite` JSON-LD are injected in the root layout. The `sameAs` array there is the canonical list of Iphe's social profiles.
- **OG images** are generated at the edge via `next/og`. `lib/og.tsx` holds one shared card generator (brand palette, no external font fetch so it can't fail at request time); each route's `opengraph-image.tsx` calls it with its own label/title/subtitle.
- **Sitemap**: `next-sitemap.config.js` runs on `postbuild`, writing `public/sitemap.xml` with per-route priorities. `robots.txt` and `site.webmanifest` are committed static files.

### Where to edit common things

| What | Where |
|---|---|
| Footer social links | `components/Footer.tsx` — `SOCIALS` |
| `/clan` platform cards | `components/sections/clan/JoinTheClan.tsx` — `PLATFORMS` |
| Nav links | `components/Nav.tsx` — `links` |
| Contact email | `components/Footer.tsx` and `components/sections/work/FinalCTA.tsx` — `EMAIL` constant in each |
| JSON-LD `sameAs`, site description, verification token | `app/layout.tsx` |
| Per-page title / description / canonical | `app/{about,work,clan}/page.tsx` |
| OG card copy | each route's `opengraph-image.tsx` |
| Hero clip mixes | `lib/cloudinary.ts` — `HERO_CLIPS` |
| Reel strip | `lib/cloudinary.ts` — `REELS` |

---

## Accessibility & resilience

These are easy to break and worth knowing about:

- **Reduced motion** disables Lenis, the page-transition overlay's heavier moves, hero autoplay, and GSAP scroll effects; CSS in `globals.css` collapses all transition/animation durations.
- **Touch detection** (`hover: none, pointer: coarse`) disables the custom cursor and magnetic effects and keeps the native cursor.
- **Data saver / slow connections** skip hero video playback and the featured reel; posters still render.
- **No-JS / failed hydration**: the intro loader is hidden via `<noscript>`, and a 5s inline failsafe in the layout force-removes the loader cover if hydration never completes — so the site is never stuck behind the intro.
- **Security headers** (`X-Frame-Options`, `Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) are set in `next.config.mjs`.

---

## Deployment

`main` auto-deploys on Vercel.

- **Domain** — `ipheclan.com`, managed in Vercel
- **CDNs** — ImageKit (`chewdee`) for images, Cloudinary (`dud5owpai`) for video; both independent of the deploy
- **Analytics** — Vercel Web Analytics + Speed Insights, wired in the root layout
- **Search** — Google Search Console; sitemap submitted at `/sitemap.xml`, verification token in `app/layout.tsx`

A standard production build is `npm run build` — the `postbuild` step regenerates the sitemap automatically.

---

## Upgrade notes

The motion stack is tightly coupled and version-sensitive. Treat major bumps to **Next, React, Framer Motion, GSAP, and Lenis** as their own task with a full visual QA pass — not a routine `npm update`. In particular:

- GSAP `ScrollTrigger` is registered once at module scope and each instance is killed on unmount (see `FeaturedVideo.tsx`); a careless refactor here leaks triggers and crashes on re-navigation.
- Lenis is hand-driven off the GSAP ticker in `SmoothScroll.tsx` rather than its own RAF loop. Keep them on the same clock.

After any dependency change, click through all four routes on both desktop and a touch device, and verify reduced-motion behaviour.

---

Built by **[Greyform](https://www.greyform.org)**.
