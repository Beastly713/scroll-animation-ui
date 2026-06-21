"use client";

import { TypewriterCycle } from "./TypewriterCycle";

const titleItems = [
  { text: "HIRAISHIN NO JUTSU", lang: "en" },
  { text: "飛雷神の術", lang: "ja" },
];

const provenanceLines = [
  {
    label: "Created by",
    english: "Senju Tobirama",
    japanese: "千手扉間",
    delay: 0,
  },
  {
    label: "Mastered by",
    english: "Namikaze Minato",
    japanese: "波風ミナト",
    delay: 140,
  },
  {
    label: "Resurrected by",
    english: "Sharma Priyanshu",
    japanese: "シャルマ・プリヤンシュ",
    delay: 280,
  },
];

export function SceneOneOverlay() {
  return (
    <div className="scene-one-overlay" aria-label="Hiraishin landing introduction">
      <aside className="scene-one-brand" aria-label="Project provenance">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="scene-one-logo"
          src="/images/hiraishin-transfer-logo.png"
          alt="Hiraishin-no-Jutsu project emblem"
          draggable={false}
        />

        <div className="scene-one-provenance">
          {provenanceLines.map((line) => (
            <p className="scene-one-provenance__line" key={line.label}>
              <span className="scene-one-provenance__label">{line.label}</span>
              <TypewriterCycle
                className="scene-one-provenance__name"
                items={[
                  { text: line.english, lang: "en" },
                  { text: line.japanese, lang: "ja" },
                ]}
                typeMs={42}
                holdMs={2250}
                switchMs={360}
                startDelayMs={line.delay}
              />
            </p>
          ))}
        </div>
      </aside>

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
