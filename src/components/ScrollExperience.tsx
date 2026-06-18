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
      gsap.set(".js-room, .js-company, .js-editorial-canvas, .js-philosophy, .js-room-title, .js-project-list, .js-company-copy", {
        autoAlpha: 0,
      });
      gsap.set(".js-label-room, .js-label-projects, .js-label-company", { autoAlpha: 0, y: 12 });
      gsap.set(".js-hero-copy", { autoAlpha: 1, y: 0 });
      gsap.set(".js-room-title-line", { autoAlpha: 0, yPercent: 110 });
      gsap.set(".js-project-row", { autoAlpha: 0, y: 26 });
      gsap.set(".js-company-copy > *", { autoAlpha: 0, y: 34 });
      gsap.set(".js-philosophy > *", { autoAlpha: 0, y: 28 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: ".js-scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.45,
        },
      });

      master
        .to(".js-progress", { scaleY: 1, ease: "none" }, 0)
        .to(".js-hero", { scale: 1.18, xPercent: -3.5, yPercent: 4, filter: "blur(1.8px)", ease: "none" }, 0)
        .to(".js-fog-a", { xPercent: 28, yPercent: -6, scale: 1.13, opacity: 0.78, ease: "none" }, 0)
        .to(".js-fog-b", { xPercent: -24, yPercent: 8, scale: 1.2, opacity: 0.72, ease: "none" }, 0)
        .to(".js-hero-copy", { autoAlpha: 0, y: -42, filter: "blur(6px)", ease: "power2.inOut" }, 0.12)
        .to(".js-veil", { opacity: 0.78, ease: "none" }, 0.18)
        .to(".js-room", { autoAlpha: 0.42, scale: 1.08, yPercent: 2, ease: "none" }, 0.24)
        .to(".js-label-hero", { autoAlpha: 0, y: -12, ease: "power2.out" }, 0.27)
        .to(".js-label-room", { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.3)
        .to(".js-editorial-canvas", { autoAlpha: 0.92, scaleX: 1, ease: "power2.inOut" }, 0.34)
        .to(".js-philosophy", { autoAlpha: 1, ease: "power2.out" }, 0.38)
        .to(".js-philosophy > *", { autoAlpha: 1, y: 0, stagger: 0.05, ease: "power3.out" }, 0.4)
        .to(".js-room", { autoAlpha: 0.72, scale: 1.03, yPercent: -2, ease: "none" }, 0.42)
        .to(".js-hero", { autoAlpha: 0, scale: 1.26, ease: "none" }, 0.46)
        .to(".js-philosophy", { autoAlpha: 0, y: -38, filter: "blur(4px)", ease: "power2.in" }, 0.53)
        .to(".js-editorial-canvas", { autoAlpha: 0.24, scaleX: 1.18, ease: "power2.inOut" }, 0.56)
        .to(".js-room", { autoAlpha: 1, scale: 1.16, xPercent: -2, yPercent: -6, filter: "blur(0px)", ease: "none" }, 0.56)
        .to(".js-veil", { opacity: 0.38, ease: "none" }, 0.58)
        .to(".js-room-title", { autoAlpha: 1, ease: "power2.out" }, 0.6)
        .to(".js-room-title-line", { autoAlpha: 1, yPercent: 0, stagger: 0.075, ease: "power3.out" }, 0.62)
        .to(".js-label-room", { autoAlpha: 0, y: -12, ease: "power2.out" }, 0.68)
        .to(".js-label-projects", { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.7)
        .to(".js-room-title", { autoAlpha: 0, y: -70, filter: "blur(7px)", ease: "power2.in" }, 0.74)
        .to(".js-veil", { opacity: 0.9, ease: "none" }, 0.76)
        .to(".js-room", { autoAlpha: 0.22, scale: 1.24, yPercent: -10, filter: "blur(3px)", ease: "none" }, 0.76)
        .to(".js-project-list", { autoAlpha: 1, ease: "power2.out" }, 0.79)
        .to(".js-project-row", { autoAlpha: 1, y: 0, stagger: 0.045, ease: "power3.out" }, 0.8)
        .to(".js-project-list", { autoAlpha: 0, y: -38, filter: "blur(4px)", ease: "power2.in" }, 0.88)
        .to(".js-label-projects", { autoAlpha: 0, y: -12, ease: "power2.out" }, 0.9)
        .to(".js-label-company", { autoAlpha: 1, y: 0, ease: "power2.out" }, 0.92)
        .to(".js-company", { autoAlpha: 1, scale: 1.08, yPercent: -2, ease: "none" }, 0.9)
        .to(".js-room", { autoAlpha: 0, scale: 1.3, ease: "none" }, 0.92)
        .to(".js-veil", { opacity: 0.46, ease: "none" }, 0.93)
        .to(".js-company-copy", { autoAlpha: 1, ease: "power2.out" }, 0.94)
        .to(".js-company-copy > *", { autoAlpha: 1, y: 0, stagger: 0.06, ease: "power3.out" }, 0.95)
        .to(".js-company", { scale: 1.18, xPercent: 2, yPercent: 4, ease: "none" }, 0.94)
        .to(".js-fog-a", { xPercent: -8, opacity: 0.64, ease: "none" }, 0.94)
        .to(".js-fog-b", { xPercent: 12, opacity: 0.58, ease: "none" }, 0.94);

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      context.revert();
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <main ref={rootRef} className="relative bg-black text-stone-100">
      <div className="grain" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 py-5 text-[0.62rem] uppercase tracking-[0.32em] text-stone-300/72 md:px-10 md:py-9">
        <div className="flex items-start gap-8 md:gap-12">
          <div className="h-9 w-9 border border-stone-200/28">
            <span className="block h-full w-full scale-[0.58] border border-[#b5a16c]/60" />
          </div>
          <div className="relative hidden h-44 w-7 md:block">
            <div className="absolute left-3 top-0 h-full w-px origin-top bg-stone-200/15">
              <span className="js-progress block h-full w-px origin-top scale-y-0 bg-[#b5a16c]/70" />
            </div>
            <div className="absolute left-7 top-0 h-full">
              <span className="js-label-hero absolute left-0 top-0 vertical-label">Forest</span>
              <span className="js-label-room absolute left-0 top-0 vertical-label">Architecture</span>
              <span className="js-label-projects absolute left-0 top-0 vertical-label">Projects</span>
              <span className="js-label-company absolute left-0 top-0 vertical-label">Company</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-stone-300/62 md:gap-8">
          <span>EN</span>
          <span>JA</span>
          <span>Menu</span>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-between px-5 pb-5 text-[0.58rem] uppercase tracking-[0.3em] text-stone-300/55 md:px-10 md:pb-9">
        <p>Tokyo / Kyoto / 2026</p>
        <p>Scroll</p>
      </div>

      <section className="js-scroll-track relative h-[920vh] bg-black">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <div className="absolute inset-0">
            <Image
              src="/images/home_fv_img.webp"
              alt="Dark forest at night"
              fill
              priority
              sizes="100vw"
              className="js-hero image-cover"
            />
            <Image
              src="/images/home_projects_img.webp"
              alt="Dark architectural room"
              fill
              priority
              sizes="100vw"
              className="js-room image-cover opacity-0"
            />
            <Image
              src="/images/home_company_img.webp"
              alt="Dark forest surrounding the company"
              fill
              sizes="100vw"
              className="js-company image-cover opacity-0"
            />
          </div>

          <CloudLayer
            src={CLOUD_ONE}
            priority
            className="js-fog-a fog-layer -left-[34vw] top-[-12vh] h-[76vh] w-[174vw] opacity-45"
            imageClassName="opacity-80 blur-[1.5px]"
          />
          <CloudLayer
            src={CLOUD_TWO}
            priority
            className="js-fog-b fog-layer bottom-[-18vh] right-[-40vw] h-[82vh] w-[184vw] opacity-36"
            imageClassName="opacity-75 blur-[2px]"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.05),rgba(0,0,0,0.58)_68%,rgba(0,0,0,0.9)),linear-gradient(90deg,rgba(0,0,0,0.8),rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.82))]" />
          <div className="js-veil absolute inset-0 bg-black opacity-20" />

          <div className="js-editorial-canvas absolute left-1/2 top-1/2 h-[68vh] w-[76vw] origin-center -translate-x-1/2 -translate-y-1/2 scale-x-[0.82] border border-stone-200/8 bg-black/90 opacity-0 shadow-[0_0_120px_rgba(0,0,0,0.9)] md:w-[64vw]" />

          <div className="js-hero-copy absolute inset-0 z-10 grid place-items-center px-6 text-center">
            <div>
              <p className="mb-8 text-[0.62rem] uppercase tracking-[0.56em] text-[#b5a16c]/78">
                Kuro Mori
              </p>
              <h1 className="editorial-title text-[clamp(2.4rem,6vw,6.4rem)] leading-none text-stone-100/92">
                Remember who you are
              </h1>
            </div>
          </div>

          <div className="js-philosophy absolute inset-0 z-20 flex items-center px-6 md:px-[13vw]">
            <div className="max-w-2xl">
              <p className="mb-8 text-[0.62rem] uppercase tracking-[0.48em] text-[#b5a16c]/72">
                Philosophy
              </p>
              <p className="editorial-title text-[clamp(2.4rem,6.6vw,7rem)] leading-[0.92] text-stone-100">
                The room is not entered. It is remembered.
              </p>
              <div className="mt-12 h-px w-48 bg-stone-200/28" />
              <p className="mt-8 max-w-md text-sm leading-8 text-stone-300/64">
                Shadow gathers at the edge of timber, paper, stone, and breath. The image stays open long enough for silence to take form.
              </p>
            </div>
            <div className="ml-auto hidden h-[42vh] w-[22vw] border border-stone-200/10 bg-stone-100/[0.03] md:block" />
          </div>

          <div className="js-room-title absolute inset-0 z-20 flex items-center px-6 md:px-[11vw]">
            <h2 className="editorial-title max-w-5xl overflow-hidden text-[clamp(4rem,10vw,11.5rem)] leading-[0.86] text-stone-100">
              <span className="js-room-title-line block">Designing</span>
              <span className="js-room-title-line block">the Dimensions</span>
              <span className="js-room-title-line block">of Life</span>
            </h2>
          </div>

          <div className="js-project-list absolute inset-0 z-20 flex items-center justify-center px-6">
            <div className="w-full max-w-5xl">
              <p className="mb-12 text-[0.62rem] uppercase tracking-[0.5em] text-[#b5a16c]/70">
                Selected works
              </p>
              {["House of Ash", "Garden for Low Light", "Listening Room", "Threshold Pavilion"].map((project, index) => (
                <div
                  className="js-project-row flex items-baseline justify-between border-t border-stone-200/12 py-6 text-stone-200/82 last:border-b"
                  key={project}
                >
                  <span className="editorial-title text-[clamp(2.1rem,5vw,5.4rem)] leading-none">
                    {project}
                  </span>
                  <span className="text-[0.58rem] uppercase tracking-[0.34em] text-stone-400/70">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="js-company-copy absolute inset-0 z-20 flex items-center px-6 md:px-[12vw]">
            <div className="ml-auto max-w-3xl">
              <p className="mb-8 text-[0.62rem] uppercase tracking-[0.5em] text-[#b5a16c]/74">
                Company
              </p>
              <h2 className="editorial-title text-[clamp(3.1rem,7.5vw,8.2rem)] leading-[0.9] text-stone-100">
                A studio at the edge of forest and form.
              </h2>
              <p className="mt-9 max-w-xl text-sm leading-8 text-stone-300/68 md:text-base md:leading-9">
                We compose spaces slowly, allowing atmosphere to decide what should remain visible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
