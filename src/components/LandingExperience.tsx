"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./landing.css";

gsap.registerPlugin(ScrollTrigger);

export default function LandingExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const fogARef = useRef<HTMLDivElement | null>(null);
  const fogBRef = useRef<HTMLDivElement | null>(null);
  const fogWashRef = useRef<HTMLDivElement | null>(null);
  const greyWashRef = useRef<HTMLDivElement | null>(null);
  const darkVeilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const lenis = new Lenis({
      duration: 1.75,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.72,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, {
        scale: 1.08,
        yPercent: 0,
      });

      gsap.set(fogARef.current, {
        opacity: 0.58,
        xPercent: 0,
        yPercent: 0,
      });

      gsap.set(fogBRef.current, {
        opacity: 0.36,
        xPercent: 0,
        yPercent: 0,
      });

      gsap.set(fogWashRef.current, {
        opacity: 0.46,
        xPercent: 0,
      });

      gsap.set(greyWashRef.current, {
        opacity: 0.54,
      });

      gsap.set(darkVeilRef.current, {
        opacity: 0.08,
      });

      gsap.set(titleRef.current, {
        opacity: 0.82,
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.45,
        },
      });

      tl.to(
        bgRef.current,
        {
          scale: 1.16,
          yPercent: -4.5,
          ease: "none",
        },
        0,
      )
        .to(
          fogARef.current,
          {
            opacity: 0.82,
            xPercent: -8,
            yPercent: 2,
            ease: "none",
          },
          0,
        )
        .to(
          fogBRef.current,
          {
            opacity: 0.62,
            xPercent: 10,
            yPercent: -3,
            ease: "none",
          },
          0,
        )
        .to(
          fogWashRef.current,
          {
            opacity: 0.72,
            xPercent: -12,
            ease: "none",
          },
          0.08,
        )
        .to(
          greyWashRef.current,
          {
            opacity: 0.34,
            ease: "none",
          },
          0.18,
        )
        .to(
          darkVeilRef.current,
          {
            opacity: 0.34,
            ease: "none",
          },
          0.34,
        )
        .to(
          titleRef.current,
          {
            opacity: 0,
            y: -28,
            ease: "power2.out",
          },
          0.12,
        );
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={rootRef} className="landing-scroll">
      <section className="landing-stage">
        <div ref={bgRef} className="landing-bg" />

        <div ref={greyWashRef} className="grey-atmosphere" />

        <div ref={fogARef} className="fog-layer fog-layer-a">
          <div className="fog-track fog-track-a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud01.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud01.webp" alt="" />
          </div>
        </div>

        <div ref={fogBRef} className="fog-layer fog-layer-b">
          <div className="fog-track fog-track-b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud02.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud02.webp" alt="" />
          </div>
        </div>

        <div ref={fogWashRef} className="fog-wash">
          <div className="fog-wash-track">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud01.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud01.webp" alt="" />
          </div>
        </div>

        <div ref={darkVeilRef} className="dark-veil" />

        <header className="landing-chrome">
          <div className="brand">
            <div className="brand-mark">景</div>
            <div className="brand-name">IZANAMI</div>
          </div>

          <nav className="top-nav">
            <span>EN</span>
            <span>JA</span>
            <span>MENU</span>
          </nav>
        </header>

        <div ref={titleRef} className="landing-title">
          Remember who you are
        </div>

        <div className="landing-meta">
          <span>©2026</span>
          <span>SCROLL</span>
        </div>
      </section>
    </main>
  );
}
