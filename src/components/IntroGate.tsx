"use client";

import { useEffect, useRef, useState } from "react";

type IntroPhase = "counting" | "exiting" | "done";

type IntroGateProps = {
  onComplete?: () => void;
};

const INITIAL_HOLD_MS = 180;
const HOLD_AT_100_MS = 220;
const EXIT_DURATION_MS = 820;

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

function getCounterDelay(current: number) {
  if (current < 70) return 24;
  if (current < 90) return 34;
  return 48;
}

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
      window.removeEventListener("wheel", preventScroll, {
        capture: true,
      });
      window.removeEventListener("touchmove", preventScroll, {
        capture: true,
      });
      window.removeEventListener("keydown", preventKeyboardScroll, {
        capture: true,
      });
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
        current === 0 ? INITIAL_HOLD_MS : getCounterDelay(current),
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
        <p className="intro-gate__quote" lang="ja">
          時を待つな。時を結べ。
        </p>
      </div>

      <div className="intro-gate__counter" aria-hidden="true">
        {count}
      </div>
    </div>
  );
}
