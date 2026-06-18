"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CloudLayer from "./CloudLayer";

const CLOUD_ONE = "/images/common_fv_cloud01.webp";
const CLOUD_TWO = "/images/common_fv_cloud02.webp";

export default function ScrollExperience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.55,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.72,
      touchMultiplier: 1.08,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.set(".js-reveal", { autoAlpha: 0, y: 52 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".js-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
        .to(".js-hero-bg", { scale: 1.16, yPercent: 12, ease: "none" }, 0)
        .to(".js-hero-title", { autoAlpha: 0, y: -96, scale: 0.94, ease: "power2.out" }, 0)
        .to(".js-hero-cloud-a", { xPercent: 18, yPercent: -4, ease: "none" }, 0)
        .to(".js-hero-cloud-b", { xPercent: -16, yPercent: 3, ease: "none" }, 0);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".js-bridge",
            start: "top 72%",
            end: "bottom 28%",
            scrub: 1.15,
          },
        })
        .to(".js-bridge-line", { scaleX: 1, autoAlpha: 1, ease: "power2.out" }, 0)
        .to(".js-bridge-copy", { autoAlpha: 1, y: 0, ease: "power3.out" }, 0.12)
        .to(".js-bridge-copy", { autoAlpha: 0, y: -32, ease: "power2.in" }, 0.72);

      const projectTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".js-projects",
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.35,
          anticipatePin: 1,
        },
      });

      projectTimeline
        .fromTo(".js-projects-bg", { scale: 1.08, yPercent: 0 }, { scale: 1.24, yPercent: -9, ease: "none" }, 0)
        .fromTo(".js-projects-shade", { opacity: 0.62 }, { opacity: 0.82, ease: "none" }, 0)
        .to(".js-projects-kicker", { autoAlpha: 1, y: 0, ease: "power3.out" }, 0.08)
        .to(".js-projects-heading", { autoAlpha: 1, y: 0, ease: "power3.out" }, 0.16)
        .to(".js-projects-copy", { autoAlpha: 1, y: 0, ease: "power3.out" }, 0.26)
        .to(".js-projects-panel", { xPercent: -8, ease: "none" }, 0.28)
        .to(".js-projects-kicker, .js-projects-heading, .js-projects-copy", { autoAlpha: 0, y: -54, ease: "power2.in" }, 0.68)
        .to(".js-projects-mark", { autoAlpha: 0.7, scale: 1, ease: "power2.out" }, 0.72)
        .to(".js-projects-mark", { autoAlpha: 0, y: -24, ease: "power2.in" }, 0.94);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".js-company",
            start: "top 82%",
            end: "bottom top",
            scrub: 1.25,
          },
        })
        .fromTo(".js-company-bg", { scale: 1.04, yPercent: -8 }, { scale: 1.18, yPercent: 8, ease: "none" }, 0)
        .to(".js-company-cloud-a", { xPercent: -14, yPercent: 4, ease: "none" }, 0)
        .to(".js-company-cloud-b", { xPercent: 18, yPercent: -5, ease: "none" }, 0)
        .to(".js-company-text", { autoAlpha: 1, y: 0, ease: "power3.out" }, 0.18)
        .to(".js-company-text", { autoAlpha: 0.2, y: -44, ease: "power2.in" }, 0.84);

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <main ref={rootRef} className="relative min-h-screen overflow-hidden bg-black text-stone-100">
      <div className="grain" />

      <section className="js-hero cinematic-vignette relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="/images/home_fv_img.webp"
          alt="Dark forest at night"
          fill
          priority
          sizes="100vw"
          className="js-hero-bg image-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.24)_42%,rgba(0,0,0,0.82))]" />
        <CloudLayer
          src={CLOUD_ONE}
          priority
          className="js-hero-cloud-a left-[-16vw] top-[4vh] h-[42vh] w-[132vw] opacity-45 blur-[0.5px]"
        />
        <CloudLayer
          src={CLOUD_TWO}
          priority
          className="js-hero-cloud-b bottom-[2vh] right-[-22vw] h-[38vh] w-[125vw] opacity-36"
        />
        <div className="js-hero-title relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <p className="mb-7 text-[0.66rem] uppercase tracking-[0.48em] text-[#b5a16c] md:text-xs">
            Kyoto atelier of shadow and silence
          </p>
          <h1 className="editorial-title max-w-5xl text-[clamp(4rem,12vw,11rem)] leading-[0.82] text-stone-100">
            Kuro Mori
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-stone-300/78 md:text-base md:leading-8">
            A slow passage through forest, architecture, and smoke-softened light.
          </p>
        </div>
      </section>

      <section className="js-bridge relative grid min-h-[92vh] place-items-center overflow-hidden bg-black px-6">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-black" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="js-bridge-line mb-10 h-px w-48 origin-center scale-x-0 bg-[#b5a16c]/70 opacity-0" />
          <p className="js-bridge-copy translate-y-12 text-[0.68rem] uppercase tracking-[0.58em] text-stone-400 opacity-0 md:text-xs">
            The forest releases its breath. The room begins to appear.
          </p>
        </div>
      </section>

      <section className="js-projects cinematic-vignette relative min-h-screen overflow-hidden bg-black">
        <Image
          src="/images/home_projects_img.webp"
          alt="A dark luxury room interior"
          fill
          sizes="100vw"
          className="js-projects-bg image-cover"
        />
        <div className="js-projects-shade absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.36)_48%,rgba(0,0,0,0.72))]" />
        <div className="js-projects-panel relative z-10 flex min-h-screen items-center px-6 py-24 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <p className="js-projects-kicker js-reveal mb-7 text-[0.66rem] uppercase tracking-[0.52em] text-[#b5a16c] md:text-xs">
              Projects
            </p>
            <h2 className="js-projects-heading js-reveal editorial-title max-w-3xl text-[clamp(3.6rem,9vw,9rem)] leading-[0.86] text-stone-100">
              Rooms shaped by darkness.
            </h2>
            <p className="js-projects-copy js-reveal mt-8 max-w-xl text-sm leading-8 text-stone-300/76 md:text-lg md:leading-9">
              Materials are allowed to recede, so lacquer, paper, stone, and shadow can hold the frame with restraint.
            </p>
          </div>
        </div>
        <p className="js-projects-mark editorial-title pointer-events-none absolute bottom-[10vh] right-[7vw] z-10 scale-95 text-[clamp(4rem,12vw,12rem)] leading-none text-stone-200/0 opacity-0">
          間
        </p>
      </section>

      <section className="js-company cinematic-vignette relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 md:px-16 lg:px-24">
        <Image
          src="/images/home_company_img.webp"
          alt="A second dark forest scene"
          fill
          sizes="100vw"
          className="js-company-bg image-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.74))]" />
        <CloudLayer
          src={CLOUD_TWO}
          className="js-company-cloud-a left-[-24vw] top-[8vh] h-[40vh] w-[138vw] opacity-38"
        />
        <CloudLayer
          src={CLOUD_ONE}
          className="js-company-cloud-b bottom-[8vh] right-[-18vw] h-[35vh] w-[118vw] opacity-28 blur-[0.6px]"
        />
        <div className="js-company-text relative z-10 mx-auto max-w-5xl translate-y-16 opacity-0">
          <p className="mb-7 text-[0.66rem] uppercase tracking-[0.52em] text-[#b5a16c] md:text-xs">
            Company
          </p>
          <h2 className="editorial-title max-w-4xl text-[clamp(3.3rem,8vw,8.5rem)] leading-[0.9] text-stone-100">
            Returning to the quiet edge of the woods.
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-8 text-stone-300/78 md:text-lg md:leading-9">
            A studio language of restraint, ritual, and atmosphere, composed for spaces that are remembered slowly.
          </p>
        </div>
      </section>
    </main>
  );
}
