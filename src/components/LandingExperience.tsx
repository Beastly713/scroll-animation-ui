"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./landing.css";

gsap.registerPlugin(ScrollTrigger);

export default function LandingExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const forestRef = useRef<HTMLImageElement | null>(null);
  const toneRef = useRef<HTMLDivElement | null>(null);
  const darkVeilRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || !worldRef.current || !forestRef.current) return;

    const lenis = new Lenis({
      duration: 1.45,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.72,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const getTravel = () => {
        const world = worldRef.current;
        if (!world) return -window.innerHeight * 0.85;

        const rect = world.getBoundingClientRect();
        const maxTravel = Math.max(
          rect.height - window.innerHeight,
          window.innerHeight * 0.85,
        );

        return -maxTravel;
      };

      gsap.set(worldRef.current, {
        y: 0,
        transformOrigin: "50% 0%",
      });

      gsap.set(toneRef.current, {
        opacity: 0.18,
      });

      gsap.set(darkVeilRef.current, {
        opacity: 0.02,
      });

      gsap.set(titleRef.current, {
        opacity: 0.88,
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        worldRef.current,
        {
          y: getTravel,
          ease: "none",
        },
        0,
      )
        .to(
          toneRef.current,
          {
            opacity: 0.04,
            ease: "none",
          },
          0,
        )
        .to(
          darkVeilRef.current,
          {
            opacity: 0.26,
            ease: "none",
          },
          0.22,
        )
        .to(
          titleRef.current,
          {
            opacity: 0,
            y: -22,
            ease: "power2.out",
          },
          0.12,
        );
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("resize", refresh);

    if (forestRef.current.complete) {
      ScrollTrigger.refresh();
    } else {
      forestRef.current.addEventListener("load", refresh, { once: true });
    }

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={rootRef} className="landing-scroll">
      <section className="landing-stage">
        <div className="forest-window">
          <div ref={worldRef} className="forest-world">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={forestRef}
              className="forest-image"
              src="/images/home_fv_img.webp"
              alt=""
              draggable={false}
            />

            <div className="fog-system" aria-hidden="true">
              <div className="fog-plane fog-plane-a">
                <div className="fog-track fog-track-a">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud01.webp" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud01.webp" alt="" />
                </div>
              </div>

              <div className="fog-plane fog-plane-b">
                <div className="fog-track fog-track-b">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud02.webp" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud02.webp" alt="" />
                </div>
              </div>

              <div className="fog-plane fog-plane-c">
                <div className="fog-track fog-track-c">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud01.webp" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud01.webp" alt="" />
                </div>
              </div>

              <div className="fog-plane fog-plane-d">
                <div className="fog-track fog-track-d">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud02.webp" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/common_fv_cloud02.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={toneRef} className="tone-wash" />
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
