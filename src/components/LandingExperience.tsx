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
  const veilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.75,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, {
        scale: 1.08,
        yPercent: 0,
      });

      gsap.set(titleRef.current, {
        opacity: 1,
        y: 0,
      });

      gsap.set(veilRef.current, {
        opacity: 0.28,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
          },
        })
        .to(
          bgRef.current,
          {
            scale: 1.18,
            yPercent: -6,
            ease: "none",
          },
          0,
        )
        .to(
          titleRef.current,
          {
            opacity: 0,
            y: -36,
            ease: "power2.out",
          },
          0.08,
        )
        .to(
          veilRef.current,
          {
            opacity: 0.52,
            ease: "none",
          },
          0.12,
        );
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <main ref={rootRef} className="landing-scroll">
      <section className="landing-stage">
        <div ref={bgRef} className="landing-bg" />

        <div className="landing-clouds landing-clouds-a">
          <div className="cloud-track cloud-track-slow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud01.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud01.webp" alt="" />
          </div>
        </div>

        <div className="landing-clouds landing-clouds-b">
          <div className="cloud-track cloud-track-fast">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud02.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/common_fv_cloud02.webp" alt="" />
          </div>
        </div>

        <div ref={veilRef} className="landing-veil" />

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
