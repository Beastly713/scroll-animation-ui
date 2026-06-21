# Scroll Animation UI

A small cinematic landing-page experiment built with Next.js, React, GSAP, and Lenis. The project is a single-page scroll scene: the viewport stays sticky while layered imagery, fog, an archive illustration, and a rainy company/forest scene transition over a long scroll distance.

The page currently has no visible copy, navigation, logo, or UI chrome. It is meant to read as a visual motion study rather than a content-heavy landing page.

## What It Does

- Holds one full-screen sticky stage while the document scrolls behind it.
- Starts from a dark forest composition with animated fog layers.
- Uses GSAP `ScrollTrigger` to scrub through the scene as the user scrolls.
- Crossfades into an archive-style transition background and illustration.
- Transitions again into a company/forest image with two overlaid looping rain videos.
- Uses Lenis to smooth wheel scrolling and keep `ScrollTrigger` updated.

## Project Shape

```text
src/app/page.tsx
  Renders the active landing experience.

src/app/layout.tsx
  Defines the document shell and metadata.

src/app/globals.css
  Imports Tailwind and sets global page defaults.

src/components/LandingExperience.tsx
  Main client component. Owns refs, Lenis setup, GSAP timeline,
  ScrollTrigger lifecycle, image/video load refreshes, and scene markup.

src/components/landing.css
  Main visual system. Defines the sticky stage, image layers, fog planes,
  archive layer, company/rain layer, overlays, and responsive sizing.

src/components/ScrollExperience.tsx
src/components/CloudLayer.tsx
  Older/alternate scroll experiment components. They are not mounted by
  the current home page.

public/images
  Forest, company, project/archive, and fog image assets.

public/videos
  Rain video overlays used in the final scene.
```

## Runtime Flow

The active route is `/`.

`page.tsx` renders `LandingExperience`, which is marked with `"use client"` because it depends on browser APIs, refs, `useEffect`, GSAP, video playback, and Lenis.

Inside `LandingExperience`, the important layers are:

- `.forest-world`: the tall opening forest image plus four drifting fog planes.
- `.archive-transition-bg`: the full-screen archive transition texture.
- `.archive-scroll-image`: the illustrated archive image that appears mid-sequence.
- `.company-world`: the final image layer, with rain videos blended over it.
- `.tone-wash` and `.dark-veil`: color and darkness overlays used to tune mood during the scroll.

The GSAP timeline is attached to `.landing-scroll`:

```ts
scrollTrigger: {
  trigger: rootRef.current,
  start: "top top",
  end: "bottom bottom",
  scrub: 1.2,
  invalidateOnRefresh: true,
}
```

The scroll area is intentionally much taller than the viewport:

- Desktop: `.landing-scroll` is `760vh`.
- Mobile: `.landing-scroll` is reduced to `245vh`.

The sticky `.landing-stage` remains in view while the timeline moves and fades the internal layers.

## Commands

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Check lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Tech Stack

- Next.js `16.2.9`
- React `19.2.4`
- GSAP `3.15.0`
- Lenis `1.3.23`
- Tailwind CSS `4`
- TypeScript

## Notes For Future Work

This project uses a newer Next.js version with local docs in `node_modules/next/dist/docs/`. Before changing framework-specific APIs, routing conventions, image behavior, or config, read the relevant local guide first.

For visual changes, the safest place to start is usually `src/components/landing.css`. For scroll sequencing or layer timing, start in the GSAP timeline inside `src/components/LandingExperience.tsx`.
