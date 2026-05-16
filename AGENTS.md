# ipheclan

Portfolio / fan-hub site for **Iphe** — UK creator and entertainer building the "Iphe Clan." Editorial, kinetic, motion-heavy. Dark theme with one acid-yellow accent. Aiming for CSS-awards-grade polish.

---

## Stack (pinned — do not bump majors)

| Package | Version | Why pinned |
|---|---|---|
| next | **14.2.35** | Next 16 + Turbopack hangs first compile on M1 Pro. Stay on 14.x patched. |
| react / react-dom | **18.3.1** | React 19 breaks framer-motion 12, lenis 1.3, lucide 1.x. |
| tailwindcss | **3.4.x** | v4 drops the `tailwind.config.ts` design-token pattern. |
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

---

## Design tokens — [tailwind.config.ts](tailwind.config.ts)

```
bg     #0A0A0A   page background
fg     #FAFAFA   primary text
muted  #6B6B6B   secondary text
accent #EAFE07   acid yellow
line   #1A1A1A   subtle borders
```

### Fonts (via `next/font/google` in [layout.tsx](src/app/layout.tsx))
- **Anton** → `--font-display` → `font-display` (massive headlines only — never inline-style Anton)
- **Inter** → `--font-sans` → `font-sans` (body default)
- **JetBrains Mono** → `--font-mono` → `font-mono` (eyebrows, labels, CTAs, captions)

### Heading scale (typical values used across the site)
| Use | Clamp |
|---|---|
| Hero IPHE on `/` | `clamp(8rem, 20vw, 20rem)` |
| Page-hero (`/about`, `/work`) | `clamp(3rem, 10–11vw, 9–10rem)` |
| Closing/big-CTA punch | `clamp(3–4rem, 11–18vw, 11–18rem)` |
| Section heading (h2) | `clamp(3rem, 8vw, 7rem)` |
| Two-line section heading | `clamp(2.5–3rem, 6–8vw, 5–7rem)` |
| Card/service heading (h3) | `clamp(1.75rem, 3.5vw, 2.75rem)` |
| Body | `text-base sm:text-lg` |
| Eyebrow / micro-caption | `text-xs` mono uppercase, `tracking-widest` |

Use inline `style={{ fontSize: "clamp(...)" }}` for the clamps — Tailwind's `text-[clamp(...)]` arbitrary value gets verbose and clamp values aren't tokenizable.

### Accent usage rule (keep it scarce)
The acid yellow is loud. Use it for:
- Primary CTA fills (`JOIN THE CLAN`, `Get in Touch`, mailto pill)
- Recognition line on the homepage SocialProof ("Recognised by Meta…")
- Hover state on Services cards (border, ordinal, radial wash)
- The "Sound on" / "Copied" micro-indicators

**At display-heading scale, the accent is used exactly once in the entire site** — the [WhyWork](src/components/sections/work/WhyWork.tsx) pull quote `"Recognised by Meta as a Creator of Tomorrow."`. That scarcity is the punch. Don't spend it.

### Eyebrow vocabulary
Every section opens with one of these mono-uppercase eyebrows (matching `text-xs tracking-widest text-muted`):
- `Chapter · 01`, `Chapter · 02`, … for ordered subsections of a multi-section page (used on `/about` and `/work`).
- `Featured · 001`, `About · 001`, `Work · 001`, `Contact · 005`, `The Iphe Clan`, `Watched by Millions` — for standalone-feeling sections.
- `Portrait · 001`, `Portrait · 002`, `Reel · 01` — for media-frame micro-captions inside an image/video container.

Stay in this register. Never use sentence-case eyebrows ("About me", "Our work") — always `Word · 00N`.

---

## Asset inventory — [public/](public/)

**All Iphe videos are portrait 9:16** (TikTok/IG-native). Briefs that say "aspect-video" assume landscape — if you follow them literally you'll letterbox or crop the subject. Either flip the frame to portrait, or use editorial mono side-rails to fill the landscape frame's negative space (the [FeaturedVideo](src/components/sections/FeaturedVideo.tsx) pattern).

Videos (`public/videos/`):
- `mama-we-made-it-official.mov` — 2160×3840 (9:16), 5s, **27 MB** ← cleanest for autoplay loops
- `meta-creators-of-tomorrow-compilation.mp4` — 1080×1920 (9:16), 70s, **123 MB** ← do not ship raw; transcode first
- `meta-creators-of-tomorrow-ig-name.mp4` — 1080×1920 (9:16), 6s, 3.2 MB

Images (`public/images/`):
- `chinatown-thumbnail.png` — 1920×1080 (**16:9 landscape** — odd one out; doesn't work as poster for the portrait videos)
- `meta-creator-of-tomorrow-iphe.jpg`, `meta-post-on-creators-of-tomorrow.jpg` — Meta recognition shots
- ~13 `iphe-*.JPG/jpg` portraits (all ~2:3, very high-res — e.g. `iphe-sitting-pose.JPG` is 4160×6240). Always serve through `next/image` with `sizes` so they're downscaled.
- `ipheclan-logo.PNG`

**Curated subfolder convention**: `public/images/iphe/<kebab-name>.jpg` is the curated working set the components actually reference (`iphe/sitting-pose.jpg`, `iphe/smiling.jpg`, `iphe/kissing-award.jpg`). Copy from the flat originals into the subfolder rather than referencing `iphe-*.JPG` directly — keeps casing/extensions consistent and gives a stable working set.

---

## File layout

```
src/
  app/
    layout.tsx              Fonts, metadata, viewport, mounts SmoothScroll + Cursor + Nav + Footer + Analytics
    page.tsx                Homepage — composes section components
    globals.css             @tailwind directives, body bg/fg, cursor:none desktop-only, font-feature-settings
    about/page.tsx          /about — composes about/* sections
    work/page.tsx           /work — composes work/* sections
  components/
    SmoothScroll.tsx        Lenis + GSAP ticker bridge (desktop only)
    Cursor.tsx              Custom cursor, reads data-cursor attrs, 1:1 tracking
    Nav.tsx                 Fixed top, fades to blurred bg after 100px scroll, magnetic Next/Link nav
    Footer.tsx              3-col footer mounted in layout.tsx (visible on every route)
    Magnetic.tsx            Generic magnetic wrapper — children translate toward cursor within `radius` (default 100, strength 0.35)
    MagneticCTA.tsx         Two-variant pill button (primary acid-yellow / ghost white-outline). Renders <button>.
    sections/               Homepage sections
    sections/about/         /about sections
    sections/work/          /work sections
```

**New-page pattern**: a server `page.tsx` (sets metadata, composes) + client section components grouped in `src/components/sections/<route>/`. Don't put motion / `window` / `useState` code in the server `page.tsx` — keep it as a pure composer.

**New shared primitive**: goes in `src/components/`. Don't re-inline magnetic logic, cursor logic, or marquee math — extract.

---

## Routes status

- [ /  ](src/app/page.tsx) — homepage. Built.
- [ /about ](src/app/about/page.tsx) — Built.
- [ /work  ](src/app/work/page.tsx) — Built. The conversion page.
- [ /clan  ](src/app/clan/page.tsx) — Built. The community page.

All four routes shipped. No outstanding 404s in nav/footer/inter-section links.

---

## Conventions

### Cursor interop
- `data-cursor="hover"` on any interactive element → custom cursor scales to 32px.
- `data-cursor="watch"` → cursor shows `WATCH` label (for video/thumbnail tiles).
- The cursor is **1:1 with the trackpad** — no position spring. Only the *size* transition (8→32px) is sprung. Don't reintroduce a spring on `x`/`y` — the system pointer is hidden on desktop (`cursor: none` via `@media (hover: hover) and (pointer: fine)`), so any lag becomes "I lost my mouse."
- Hidden on touch devices entirely.

### Touch gating — required for every mouse-driven effect
```ts
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
if (isTouch) return;
```
Already gated: tilt, magnetic, cursor, Lenis smooth scroll. Match the pattern.

### Hover-only effects on hover-capable devices only
Tap-to-trigger is bad UX on phones. For effects like grayscale-on-hover that have no touch equivalent, use the Tailwind arbitrary media variant:
```
className="[@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
```
Photos stay in color on mobile, get the editorial hover treatment on desktop. Don't use breakpoint variants (`md:grayscale`) for this — tablets in landscape are touch + ≥ md, you'll get the wrong behaviour.

### Mobile spacing baseline
- Content sections: `py-24 md:py-40` (96px mobile, 160px desktop).
- Full-screen sections (hero, CTA, closing): `min-h-screen` and let them dominate.
- Story-row gaps: `space-y-20 md:space-y-48` (`32` on mobile feels too airy).
- Section horizontal padding: `px-6 md:px-10` everywhere.
- Hide ornamental columns on mobile if they'd add scroll without value (e.g. the vertical marquee in [Different](src/components/sections/about/Different.tsx) — `hidden md:block`).

### Magnetic CTAs — wrap, don't inline
- Use `<Magnetic radius={n} strength={n}>` from [Magnetic.tsx](src/components/Magnetic.tsx).
- For the standard primary/ghost button pair, use `<MagneticCTA variant="primary|ghost">` — it renders a `<button>`.
- **MagneticCTA renders a `<button>` — you cannot wrap it in `<a>`** (invalid HTML, nested interactive elements). For an anchor-style magnetic CTA (e.g. jump links, mailto, internal routes), use `<Magnetic>` + a styled `<a>` or Next `<Link>` directly. See [WorkHero](src/components/sections/work/WorkHero.tsx) and [FinalCTA](src/components/sections/work/FinalCTA.tsx) for the anchor pattern.
- **Magnetic is inline-block by default**, so it sizes to its child's content. For **card-shaped grid items**, pass `block` so it renders as a block element with `h-full w-full` and fills the grid cell — without this, cards in a 2-col / 3-col layout end up at different heights because the magnetic wrapper isn't reaching the grid cell's stretched height. See [JoinTheClan](src/components/sections/clan/JoinTheClan.tsx).

### Card grids — enforce uniform heights
Default CSS Grid stretches siblings within a row, but **rows don't equalize across themselves** unless told to. For any card grid:
- `md:auto-rows-fr` on the grid container — forces all implicit rows to `1fr` so they share equal height.
- `min-h-[...]` on each card sized to fit the largest expected content — guarantees uniform appearance even if Anton reflows mid-load.
- `h-full` on the motion.div wrapper and on the card's inner div so the height chain reaches the visible card surface.
- If using `<Magnetic>` around the card, pass `block` (see above).

Pattern in [Services](src/components/sections/work/Services.tsx) (3-then-2 layout, `md:grid-cols-6` with `col-start-2` on card 4) and [JoinTheClan](src/components/sections/clan/JoinTheClan.tsx) (2×2 platform grid). If a new card grid lands without these four pieces, it'll ladder vertically — that's the bug to look for first.

### Internal navigation = Next `<Link>`
Nav and footer links use `next/link`, not `<a>`. Hash anchors (`#contact`) use plain `<a>` — Next Link doesn't add value for same-page jumps.

### Components are client by default
Anything using framer-motion, gsap, lenis, or `window` needs `"use client"`. Sections live as client components; `app/<route>/page.tsx` stays a server component that just composes.

### Tailwind specifics
- `font-display` for Anton; never inline-style Anton.
- `text-muted` for secondary text; don't reach for `text-gray-*`.
- Massive type → inline `style={{ fontSize: "clamp(...)" }}`.

---

## Motion patterns

### 3D tilt (Hero IPHE)
`useMotionValue` (normalized -0.5..0.5) → `useTransform` to deg range → `useSpring` for smoothing → applied as `rotateX`/`rotateY`. Put `perspective: 1000` on a **wrapper** div and `transformStyle: "preserve-3d"` on the rotating element.

### Letter / word stagger
- Letters: `WORD.split("")` → each char a `motion.span`, `delay: i * 0.05`, easing `[0.22, 1, 0.36, 1]`.
- Words/lines: same idea, with `overflow-hidden` masks and the inner span starting at `y: "110%"` for the editorial type-rises-into-frame effect.

### GSAP ScrollTrigger
Register inside `useEffect` (or `useGSAP`), wrap in `gsap.context(() => {...}, ref)` and `return () => ctx.revert()` (or rely on `useGSAP`'s built-in cleanup). Don't register at module top — breaks SSR.

### `whileInView` + `overflow-hidden` mask gotcha
**When the inner `motion.span` has a large initial transform** (e.g. `y: "110%"` on a 200px-tall heading line), its bounding box is shifted far below natural position, so the IntersectionObserver in `whileInView` never sees it enter the viewport — the text stays hidden forever.

**Fix**: don't `whileInView` the translated element directly. `useInView(sectionRef, { once: true })` on the parent section and drive each `motion.span` via `animate={inView ? {...} : undefined}`. See [CTA](src/components/sections/CTA.tsx), [Closing](src/components/sections/about/Closing.tsx), [FinalCTA](src/components/sections/work/FinalCTA.tsx).

Small-pixel transforms (e.g. `y: 30`) don't trigger this; only large-percentage ones (`y: "100%"`+) do.

### Marquee continuity rule
Rendering only **2 copies** of the row and wrapping on `scrollWidth / 2` breaks on wide screens — the track is sometimes narrower than the viewport, so the loop point reveals a gap before wrapping.

**Fix**:
1. Render **4+ copies** of the row.
2. Measure the **first row's `offsetWidth`** (`firstRow = el.children[0]; rowWidth = firstRow.offsetWidth`).
3. Wrap when `next <= -rowWidth`, adding `rowWidth` back.

Same fix vertical (`offsetHeight`). See [RecognitionMarquee](src/components/sections/RecognitionMarquee.tsx), the vertical marquee in [Different](src/components/sections/about/Different.tsx), and the stat marquee in [Audience](src/components/sections/work/Audience.tsx).

### Marquee speed — don't drive duration via React state
State-driven `transition.duration` snaps the tween back to its start when state changes. Use a `useRef` for speed and mutate `ref.current` from `onMouseEnter`/`onMouseLeave` — `useAnimationFrame` reads the ref each frame, so speed changes smoothly mid-loop. Pattern in [RecognitionMarquee](src/components/sections/RecognitionMarquee.tsx).

### Vertical marquee column sizing
The longest word at the chosen font size must fit the column with margin. `COMMUNITY` in Anton at 3.5rem (56px) is ~260px wide — needed a 280–320px column to clear. If you change the marquee font max or add a longer word, re-budget.

### Sticky vs ScrollTrigger pin
For "image stays put while text scrolls past in a flex/grid row", use CSS `position: sticky` on the image column. ScrollTrigger pin replaces the pinned element with a placeholder and fights `gap`/`grid` layout. Sticky composes cleanly with Lenis. See [Story](src/components/sections/about/Story.tsx).

---

## Component & section catalog (compressed)

### Primitives ([src/components/](src/components/))
| File | Purpose |
|---|---|
| [SmoothScroll.tsx](src/components/SmoothScroll.tsx) | Lenis + GSAP ticker bridge, desktop only. |
| [Cursor.tsx](src/components/Cursor.tsx) | 1:1 dot, scales to 32px on `data-cursor="hover"`, labels `WATCH` on `data-cursor="watch"`. Position is raw motion values; size is sprung. |
| [Nav.tsx](src/components/Nav.tsx) | Fixed top, transparent → blurred backdrop after 100px scroll. Next `<Link>` magnetic links to `/about`, `/work`, `/clan`. |
| [Footer.tsx](src/components/Footer.tsx) | 3-col (brand / Explore / Follow) + bottom bar with copy-to-clipboard email. Socials use `Music2` for TikTok and `Ghost` for Snapchat (lucide doesn't ship those brand glyphs — intentional thematic substitutes). |
| [Magnetic.tsx](src/components/Magnetic.tsx) | Generic wrapper. `radius`, `strength` props. Use for any new magnetic effect. |
| [MagneticCTA.tsx](src/components/MagneticCTA.tsx) | `<button>` with `primary` (acid-yellow) / `ghost` (white-outline) variants. Don't wrap in `<a>`. |

### Homepage sections ([src/components/sections/](src/components/sections/))
- [Hero.tsx](src/components/sections/Hero.tsx) — 3D tilt on `IPHE`, letter stagger, GSAP scroll-out, magnetic CTAs.
- [SocialProof.tsx](src/components/sections/SocialProof.tsx) — GSAP `useGSAP` count-up animations (0 → target), suffix fade-in after, ScrollTrigger `start: "top 70%" once: true`. Meta recognition line in accent.
- [RecognitionMarquee.tsx](src/components/sections/RecognitionMarquee.tsx) — horizontal marquee, 40s loop default, 15s on hover. 4 copies, `offsetWidth` wrap.
- [FeaturedVideo.tsx](src/components/sections/FeaturedVideo.tsx) — scroll-scrubbed 60% → 100% width frame. Portrait 9:16 video inside 16:9 frame with mono editorial side-rails. Click-to-unmute. Touch devices skip scrub, go full-bleed portrait.
- [Intro.tsx](src/components/sections/Intro.tsx) — 2-col image/text. `next/image` 2:3 portrait, GSAP parallax `y: 0 → -50`, `[@media(hover:hover)]:grayscale` for desktop-only hover-to-color. "Read More" → `/about`.
- [CTA.tsx](src/components/sections/CTA.tsx) — `BE PART OF / THE MOVEMENT` mask reveal gated by `useInView(sectionRef)`. Radial gradient background.

### `/about` sections ([src/components/sections/about/](src/components/sections/about/))
- AboutHero — quieter than homepage hero.
- Story — alternating image/text rows, CSS sticky image column, GSAP scrub parallax `y: 40 → -40`.
- Different — `What Makes / Iphe Different` + vertical `ENERGY · HUMOUR · COMMUNITY` marquee (right rail, hidden on mobile).
- ClanTeaser — ghost-button "Meet the Clan" → `/clan`.
- Closing — `THIS IS ONLY THE BEGINNING.` word-by-word mask reveal.

### `/clan` sections ([src/components/sections/clan/](src/components/sections/clan/))
- ClanHero — `THE IPHE / CLAN` two-line mask reveal gated by `useInView(sectionRef)`. Radial gradient background (no crowd imagery — we don't have one; pure type is the right call).
- ClanIntro — narrow centered paragraphs, larger body type than other intros (`text-lg sm:text-xl md:text-2xl`) — the words are doing the work.
- WhatIsTheClan — heading + 2-col body + **polaroid**: Tailwind-faked white-bordered photo at `rotate-[-3.5deg]`, on-hover rotation eases to `-1deg`, `drop-shadow(0 30px 40px rgba(0,0,0,0.6))`, fake tape pin on top via a small translucent rectangle. Caption inside the bottom border.
- WhyJoin — full-bleed list of 4 numbered statement rows with thin borders. **Row hovers fill with acid yellow** (`hover:bg-accent`), text + ordinal flip to `text-bg`, `→` arrow slides in from the right on `md+`. The acid-fill is the page's signature interaction.
- JoinTheClan — 2×2 grid of platform cards (WhatsApp / Snapchat / Instagram / YouTube). Each card: icon top-left (lucide — `MessageCircle` for WhatsApp), `ArrowUpRight` top-right (animates in on hover), platform name in mono, big CTA `Join on WhatsApp` / `Follow on Snapchat` / etc. in `font-display`. Magnetic wrapper, accent radial wash on hover, `-translate-y-1` on hover. Links open in new tab.
- Closing — `YOU'RE NOT JUST WATCHING ANYMORE.` word-by-word mask reveal gated by `useInView(sectionRef)`. Apostrophe rendered as `'` directly in JSX (no entity needed).

### `/work` sections ([src/components/sections/work/](src/components/sections/work/))
- WorkHero — `WORK WITH IPHE` + acid-yellow "Get in Touch" jump-link to `#contact`.
- WorkIntro — 12-col grid, heading-left/body-right (5/7).
- Services — 5-card 3-top-2-centered grid (`md:grid-cols-6`, card 4 `col-start-2`). Hover composite: border → accent, accent ordinal, radial wash, `-translate-y-1 scale-[1.015]`.
- Audience — 4 display-size statements with mono ordinals + edge-to-edge horizontal stat marquee.
- WhyWork — 2-col + accent display-scale pull quote (only such usage on the site).
- FinalCTA — `id="contact"` anchor target. `LET'S WORK` letter-by-letter mask gated by `useInView(sectionRef)`. Mailto pill with embedded copy button (outer click → mail client, inner copy button → clipboard via `stopPropagation`).

---

## Dev workflow

```
npm run dev      # webpack dev, ~4–8s first compile, hot reloads sub-second
npm run build    # production build
npm run lint     # next lint (legacy eslint 8)
```

First `/` compile downloads Anton/Inter/JetBrains from Google Fonts. If you see `The user aborted a request` / `Retrying 1/3` in the dev log, it's the font fetcher hitting a transient network hiccup — Next retries and recovers. Not a code issue.

If a previous dev server is leaked on 3000/3001 (Brave often parks itself there), use `lsof -ti:3000 | xargs kill -9`. Don't `--port` your way around it — fix the leak.
