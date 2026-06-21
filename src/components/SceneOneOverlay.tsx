"use client";

import { TypewriterCycle } from "./TypewriterCycle";

const titleItems = [
  { text: "HIRAISHIN NO JUTSU", lang: "en" },
  { text: "飛雷神の術", lang: "ja" },
];

export function SceneOneOverlay() {
  return (
    <div className="scene-one-overlay" aria-label="Hiraishin landing introduction">
      <section className="scene-one-hero" aria-label="Teleport files between browsers">
        <TypewriterCycle
          className="scene-one-kicker"
          items={titleItems}
          typeMs={58}
          holdMs={2050}
          switchMs={420}
          startDelayMs={240}
        />

        <h1 className="scene-one-headline">
          <span>Teleport files</span>
          <span>between browsers.</span>
        </h1>
      </section>

      <p className="scene-one-tech">Peer-to-Peer · WebRTC · Ephemeral · Verified</p>
      <p className="scene-one-scroll">SCROLL</p>
    </div>
  );
}
