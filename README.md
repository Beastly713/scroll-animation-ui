# Hiraishin Landing Sequence

A small cinematic landing-page experiment for Hiraishin, a browser-to-browser file transfer concept. It is built with Next.js, React, GSAP, and Lenis as a single-page scroll sequence: the viewport stays sticky while an intro gate, branded title overlay, transfer-principle copy, layered forest imagery, fog, an archive illustration, and a rainy company/forest scene transition over a long scroll distance.

The page is intentionally sparse. It uses a few pieces of cinematic copy and motion states to explain the product idea without turning the first screen into a conventional content-heavy landing page.

## What It Does

- Opens with a black intro gate containing a Japanese quote, numeric counter, and slow mist dissolve.
- Holds one full-screen sticky stage while the document scrolls behind it.
- Reveals a Scene 1 landing title for Hiraishin with a small typewriter cycle between English and Japanese naming.
- Starts the scroll journey from a dark forest composition with animated fog layers.
- Presents Scene 2 as a timed sequence of transfer principles, one line at a time.
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
  ScrollTrigger lifecycle, image/video load refreshes, scene orchestration,
  and layer markup.

src/components/IntroGate.tsx
  Opening black-screen gate. Locks scroll during the intro, runs the quote,
  counter, and mist-bridge exit, then refreshes the scroll scene.

src/components/SceneOneOverlay.tsx
  Scene 1 landing copy: Hiraishin naming, headline, technology line,
  and scroll prompt.

src/components/SceneTwoPrinciples.tsx
  Scene 2 transfer-principle copy. The GSAP timeline reveals these lines
  one at a time during the scroll.

src/components/TypewriterCycle.tsx
  Small client helper used by Scene 1 to alternate the title between
  HIRAISHIN NO JUTSU and 飛雷神の術.

src/components/landing.css
  Main visual system. Defines the sticky stage, image layers, fog planes,
  intro gate, Scene 1 and Scene 2 overlays, archive layer, company/rain
  layer, and responsive sizing.

src/components/ScrollExperience.tsx
src/components/CloudLayer.tsx
  Older/alternate scroll experiment components. They are not mounted by
  the current home page.

public/images
  Forest, company, archive, painting, logo, and fog image assets.

public/videos
  Rain video overlays used in the final scene.
```

## Runtime Flow

The active route is `/`.

`page.tsx` renders `LandingExperience`, which is marked with `"use client"` because it depends on browser APIs, refs, `useEffect`, GSAP, video playback, and Lenis.

The route first mounts `IntroGate`. While the gate is active, scroll input is prevented and the document is kept at the top. When the counter reaches 100, the gate dissolves through the mist-bridge transition and calls back into `LandingExperience` so `ScrollTrigger` can refresh from a clean scroll position.

Inside the sticky stage, the important layers are:

- `.forest-world`: the tall opening forest image plus four drifting fog planes.
- `.landing-title`: Scene 1 title overlay rendered by `SceneOneOverlay`.
- `.scene-two-layer`: Scene 2 transfer principles rendered by `SceneTwoPrinciples`.
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

The sticky `.landing-stage` remains in view while the timeline moves and fades the internal layers. Scene 2 extends the early timeline so the transfer-principle lines can appear without overlapping the later archive, painting, and rain sequence.

## Story Flow

1. Black intro gate with the quote `時を待つな。時を結べ。`.
2. Mist dissolve into the forest landing view.
3. Scene 1 title: `HIRAISHIN NO JUTSU` / `飛雷神の術`.
4. Headline: `Teleport files between browsers.`
5. Scene 2 principles describe the transfer model: files stay in the browser, the share link is temporary, the server stores the route rather than the file, WebRTC carries chunks peer-to-peer, and the receiver rebuilds/verifies the transfer.
6. The scroll continues into the archive/architecture painting and rainy final scene.

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

## Current work status : under progress

## Notes For Future Work

This project uses a newer Next.js version with local docs in `node_modules/next/dist/docs/`. Before changing framework-specific APIs, routing conventions, image behavior, or config, read the relevant local guide first.

For visual changes, the safest place to start is usually `src/components/landing.css`. For scroll sequencing or layer timing, start in the GSAP timeline inside `src/components/LandingExperience.tsx`.
