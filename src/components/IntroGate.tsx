"use client";

import { useEffect, useRef, useState } from "react";

type IntroPhase = "counting" | "exiting" | "done";

type IntroGateProps = {
  onComplete?: () => void;
};

const INITIAL_HOLD_MS = 250;
const COUNTER_STEP_MS = 27;
const HOLD_AT_100_MS = 1400;
const EXIT_DURATION_MS = 1800;

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

export function IntroGate({ onComplete }: IntroGateProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<IntroPhase>("counting");

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, {
      passive: false,
      capture: true,
    });

    window.addEventListener("touchmove", preventScroll, {
      passive: false,
      capture: true,
    });

    window.addEventListener("keydown", preventKeyboardScroll, {
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);
      window.removeEventListener("keydown", preventKeyboardScroll, true);
    };
  }, []);

  useEffect(() => {
    if (phase !== "counting") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = (current: number) => {
      if (current >= 100) {
        timeoutId = setTimeout(() => {
          setPhase("exiting");
        }, HOLD_AT_100_MS);

        return;
      }

      timeoutId = setTimeout(
        () => {
          const next = current + 1;
          setCount(next);
          tick(next);
        },
        current === 0 ? INITIAL_HOLD_MS : COUNTER_STEP_MS,
      );
    };

    tick(0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      setPhase("done");
      onCompleteRef.current?.();
    }, EXIT_DURATION_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [phase]);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`intro-gate${phase === "exiting" ? " intro-gate--exiting" : ""}`}
      aria-label="Opening sequence"
    >
      <div className="intro-gate__void" aria-hidden="true" />

      <div className="intro-gate__quote-shell">
        <p className="intro-gate__quote" lang="ja" translate="no">
          時を待つな。時を結べ。
        </p>
      </div>

      <div className="intro-gate__counter" aria-hidden="true">
        {count}
      </div>
    </div>
  );
}
