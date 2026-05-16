# ipheclan

Portfolio and fan-hub site for **Iphe** — UK creator, entertainer, building the Iphe Clan.

- **Live:** [ipheclan.com](https://ipheclan.com)
- **Stack:** Next.js 14 · TypeScript · Tailwind · Framer Motion · GSAP · Lenis · ImageKit
- **Host:** Vercel

---

## Quickstart

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). First compile ~6s, hot reloads sub-second.

---

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (webpack) |
| `npm run build` | Production build — regenerates `sitemap.xml` via the `next-sitemap` postbuild |
| `npm run start` | Production server (after `build`) |
| `npm run lint` | ESLint (legacy v8 config) |

---

## Structure

```
src/
  app/                    Routes — server pages compose client sections
    layout.tsx              Metadata, fonts, providers, JSON-LD, favicons
    page.tsx                /
    about/page.tsx          /about
    work/page.tsx           /work
    clan/page.tsx           /clan
    not-found.tsx           404
    globals.css
  components/             Shared primitives (Cursor, Nav, Footer, PageTransition, …)
    sections/             Page sections, grouped per route
  lib/imagekit.ts         next/image loader + URL helpers for ImageKit
public/
  icons/{mono,color}/     Social icons, two variants
  favicon*, og-image.jpg, robots.txt, sitemap.xml, site.webmanifest
```

---

## Conventions

All non-trivial design and engineering decisions — design tokens, font scale, motion patterns, magnetic CTAs, marquee math, cursor interop, accent-yellow scarcity rules, mobile gating — live in **[AGENTS.md](AGENTS.md)**. Read it before changing anything substantial.

Stack versions are pinned deliberately. Do not bump major versions of Next, React, Framer Motion, GSAP, or Lenis without reading the rationale in [AGENTS.md](AGENTS.md).

---

## Adding images and videos

All media is served from **ImageKit** at `https://ik.imagekit.io/chewdee/ipheclan/public/content/`.

1. Upload to the corresponding `images/` or `videos/` folder in the ImageKit dashboard.
2. Reference via the `imagekitLoader` from [src/lib/imagekit.ts](src/lib/imagekit.ts):

```tsx
import Image from "next/image";
import { imagekitLoader } from "@/lib/imagekit";

<Image
  loader={imagekitLoader}
  src="images/your-file.jpg"
  alt="Descriptive alt text"
  fill
  sizes="(min-width: 768px) 50vw, 100vw"
/>
```

Do not commit media to `public/`. The folder is kept under 1 MB intentionally.

---

## Editing copy, links, contact

| What | Where |
|---|---|
| Footer socials | [src/components/Footer.tsx](src/components/Footer.tsx) — `SOCIALS` |
| `/clan` platform cards | [src/components/sections/clan/JoinTheClan.tsx](src/components/sections/clan/JoinTheClan.tsx) — `PLATFORMS` |
| JSON-LD `sameAs`, Twitter creator, SEO metadata | [src/app/layout.tsx](src/app/layout.tsx) |
| Per-page metadata (titles, descriptions, canonicals) | `src/app/{about,work,clan}/page.tsx` |
| Contact email | [src/components/Footer.tsx](src/components/Footer.tsx) and [src/components/sections/work/FinalCTA.tsx](src/components/sections/work/FinalCTA.tsx) — both reference the same `EMAIL` constant |

---

## Deployment

`main` pushes auto-deploy on Vercel.

- **Domain** — `ipheclan.com` (managed via Vercel)
- **Image CDN** — ImageKit (`chewdee` account)
- **Analytics** — Vercel Web Analytics (free tier, 2.5K events/month)
- **Search** — Google Search Console; sitemap submitted at `/sitemap.xml`

---

Built by **Greyform**.
