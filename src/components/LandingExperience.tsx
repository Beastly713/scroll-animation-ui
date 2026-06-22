"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { IntroGate } from "./IntroGate";
import { SceneOneOverlay } from "./SceneOneOverlay";
import { SceneTwoPrinciples } from "./SceneTwoPrinciples";
import "./landing.css";

gsap.registerPlugin(ScrollTrigger);

export default function LandingExperience() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const forestRef = useRef<HTMLImageElement | null>(null);
  const toneRef = useRef<HTMLDivElement | null>(null);
  const darkVeilRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const sceneTwoRef = useRef<HTMLDivElement | null>(null);
  const archiveBgRef = useRef<HTMLDivElement | null>(null);
  const archiveImageRef = useRef<HTMLDivElement | null>(null);
  const companyWorldRef = useRef<HTMLDivElement | null>(null);
  const companyImageRef = useRef<HTMLImageElement | null>(null);
  const companyRainVideoRef = useRef<HTMLVideoElement | null>(null);
  const companyRainVideoTwoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || !worldRef.current || !forestRef.current) return;

    const offsetSecondRainVideo = () => {
      const video = companyRainVideoTwoRef.current;
      if (!video) return;

      const fallbackOffsetSeconds = 7.5;
      const safeOffset =
        Number.isFinite(video.duration) && video.duration > fallbackOffsetSeconds + 0.5
          ? fallbackOffsetSeconds
          : Math.max(0, Math.floor((video.duration || 15) * 0.5));

      try {
        video.currentTime = safeOffset;
      } catch {
        // Browser may reject currentTime before metadata is ready.
      }

      const playPromise = video.play();
      if (playPromise) {
        void playPromise.catch(() => undefined);
      }
    };

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
        return -Math.max(rect.height - window.innerHeight, window.innerHeight * 0.85);
      };

      const getCompanyTravel = () => {
        const world = companyWorldRef.current;
        if (!world) return -window.innerHeight * 0.8;

        const rect = world.getBoundingClientRect();
        return -Math.max(rect.height - window.innerHeight, window.innerHeight * 0.75);
      };

      gsap.set(worldRef.current, {
        y: 0,
        opacity: 1,
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

      const sceneTwoLines = sceneTwoRef.current
        ? Array.from(sceneTwoRef.current.querySelectorAll<HTMLElement>("[data-scene-two-line]"))
        : [];

      gsap.set(sceneTwoRef.current, {
        opacity: 1,
      });

      gsap.set(sceneTwoLines, {
        autoAlpha: 0,
        visibility: "hidden",
        y: 24,
        filter: "blur(9px)",
      });

      gsap.set(archiveBgRef.current, {
        opacity: 0,
        scale: 1.04,
      });

      gsap.set(archiveImageRef.current, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        y: 42,
        scale: 0.94,
      });

      gsap.set(companyWorldRef.current, {
        opacity: 0,
        y: 0,
        scale: 1.02,
        transformOrigin: "50% 0%",
      });

      const companyRainVideos = [
        companyRainVideoRef.current,
        companyRainVideoTwoRef.current,
      ].filter((video): video is HTMLVideoElement => Boolean(video));

      gsap.set(companyRainVideos, {
        opacity: 0,
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

      const SCENE_TWO_START = 2.18;
      const SCENE_TWO_LINE_DURATION = 0.95;
      const SCENE_TWO_LINE_STEP = 1.08;
      const SCENE_TWO_AFTER_PAUSE = 0.32;

      const sceneTwoEnd =
        SCENE_TWO_START +
        Math.max(sceneTwoLines.length - 1, 0) * SCENE_TWO_LINE_STEP +
        SCENE_TWO_LINE_DURATION;

      const ARCHITECTURE_ORIGINAL_START = 3.05;
      const ARCHITECTURE_NEW_START = sceneTwoEnd + SCENE_TWO_AFTER_PAUSE;
      const DOWNSTREAM_SHIFT = ARCHITECTURE_NEW_START - ARCHITECTURE_ORIGINAL_START;

      const shifted = (position: number) => position + DOWNSTREAM_SHIFT;

      const addSceneTwoLine = (line: HTMLElement, start: number) => {
        tl.set(
          sceneTwoLines,
          {
            autoAlpha: 0,
            visibility: "hidden",
          },
          start - 0.001,
        )
          .set(
            line,
            {
              autoAlpha: 0,
              visibility: "visible",
              y: 24,
              filter: "blur(9px)",
            },
            start,
          )
          .to(
            line,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 0.26,
            },
            start,
          )
          .to(
            line,
            {
              autoAlpha: 1,
              ease: "none",
              duration: 0.42,
            },
            start + 0.26,
          )
          .to(
            line,
            {
              autoAlpha: 0,
              y: -18,
              filter: "blur(9px)",
              ease: "power2.inOut",
              duration: 0.27,
            },
            start + 0.68,
          )
          .set(
            line,
            {
              autoAlpha: 0,
              visibility: "hidden",
            },
            start + SCENE_TWO_LINE_DURATION,
          );
      };

      tl.to(
        worldRef.current,
        {
          y: getTravel,
          ease: "none",
          duration: 2.2,
        },
        0,
      )
        .to(
          toneRef.current,
          {
            opacity: 0.04,
            ease: "none",
            duration: 1.8,
          },
          0,
        )
        .to(
          darkVeilRef.current,
          {
            opacity: 0.34,
            ease: "none",
            duration: 1.1,
          },
          1.05,
        )
        .to(
          titleRef.current,
          {
            opacity: 0,
            y: -22,
            ease: "power2.out",
            duration: 0.45,
          },
          0.35,
        );

      sceneTwoLines.forEach((line, index) => {
        addSceneTwoLine(line, SCENE_TWO_START + index * SCENE_TWO_LINE_STEP);
      });

      tl.to(
        archiveBgRef.current,
        {
          opacity: 1,
          scale: 1,
          ease: "power1.inOut",
          duration: 0.95,
        },
        2.0,
      )
        .to(
          worldRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.85,
          },
          2.35,
        )
        .to(
          darkVeilRef.current,
          {
            opacity: 0.16,
            ease: "none",
            duration: 0.7,
          },
          2.75,
        )
        .to(
          archiveImageRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.85,
          },
          shifted(3.05),
        )
        .to(
          archiveImageRef.current,
          {
            opacity: 1,
            ease: "none",
            duration: 0.9,
          },
          shifted(3.9),
        )
        .to(
          companyWorldRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: "power1.inOut",
            duration: 0.95,
          },
          shifted(4.6),
        )
        .to(
          companyRainVideos,
          {
            opacity: 0.42,
            ease: "power1.inOut",
            duration: 0.95,
          },
          shifted(4.72),
        )
        .to(
          archiveBgRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.95,
          },
          shifted(4.72),
        )
        .to(
          archiveImageRef.current,
          {
            opacity: 0,
            y: -36,
            scale: 0.96,
            ease: "power2.inOut",
            duration: 0.78,
          },
          shifted(4.78),
        )
        .to(
          darkVeilRef.current,
          {
            opacity: 0.07,
            ease: "none",
            duration: 0.85,
          },
          shifted(4.76),
        )
        .to(
          companyWorldRef.current,
          {
            y: getCompanyTravel,
            ease: "none",
            duration: 1.65,
          },
          shifted(5.15),
        )
        .to(
          companyRainVideos,
          {
            opacity: 0.3,
            ease: "none",
            duration: 1.35,
          },
          shifted(5.45),
        );
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    if (forestRef.current.complete && companyImageRef.current?.complete) {
      ScrollTrigger.refresh();
    } else {
      forestRef.current.addEventListener("load", refresh, { once: true });
      companyImageRef.current?.addEventListener("load", refresh, { once: true });
    }

    const secondRainVideo = companyRainVideoTwoRef.current;

    if (secondRainVideo) {
      if (secondRainVideo.readyState >= 1) {
        offsetSecondRainVideo();
      } else {
        secondRainVideo.addEventListener("loadedmetadata", offsetSecondRainVideo, {
          once: true,
        });
      }
    }

    return () => {
      window.removeEventListener("resize", refresh);
      secondRainVideo?.removeEventListener("loadedmetadata", offsetSecondRainVideo);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
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

        <div ref={archiveBgRef} className="archive-transition-bg" />
        <div className="company-window">
          <div ref={companyWorldRef} className="company-world">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={companyImageRef}
              className="company-image"
              src="/images/home_company_img.webp"
              alt=""
              draggable={false}
            />

            <video
              ref={companyRainVideoRef}
              className="company-rain-video"
              src="/videos/distant-rain.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <video
              ref={companyRainVideoTwoRef}
              className="company-rain-video company-rain-video-mirrored"
              src="/videos/distant-rain-2.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>

        <div ref={archiveImageRef} className="archive-scroll-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hiraishin-architecture-painting.png"
            alt=""
            draggable={false}
          />
        </div>

        <div ref={toneRef} className="tone-wash" />
        <div ref={darkVeilRef} className="dark-veil" />

        <div ref={sceneTwoRef} className="scene-two-layer">
          <SceneTwoPrinciples />
        </div>

        <div ref={titleRef} className="landing-title">
          <SceneOneOverlay />
        </div>
      </section>
      </main>

      <IntroGate
        onComplete={() => {
          window.scrollTo(0, 0);
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }}
      />
    </>
  );
}
