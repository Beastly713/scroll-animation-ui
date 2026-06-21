"use client";

import { useEffect, useRef, useState } from "react";

type IntroGateProps = {
  onComplete?: () => void;
};

const EXIT_DURATION_MS = 950;
const HOLD_AT_COMPLETE_MS = 360;
const INITIAL_PAUSE_MS = 420;

function getDelayForCount(current: number) {
  if (current < 20) return 22;
  if (current < 55) return 26;
  if (current < 80) return 34;
  if (current < 93) return 48;
  return 76;
}

export function IntroGate({ onComplete }: IntroGateProps) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isMounted || isExiting) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const advance = (current: number) => {
      if (current >= 100) {
        timeoutId = setTimeout(() => {
          setIsExiting(true);

          timeoutId = setTimeout(() => {
            setIsMounted(false);
            onCompleteRef.current?.();
          }, EXIT_DURATION_MS);
        }, HOLD_AT_COMPLETE_MS);

        return;
      }

      timeoutId = setTimeout(
        () => {
          setCount(current + 1);
          advance(current + 1);
        },
        current === 0 ? INITIAL_PAUSE_MS : getDelayForCount(current),
      );
    };

    advance(0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isExiting, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`intro-gate${isExiting ? " intro-gate--exiting" : ""}`}
      aria-label="Opening sequence"
    >
      <div className="intro-gate__veil intro-gate__veil--left" />
      <div className="intro-gate__veil intro-gate__veil--right" />
      <div className="intro-gate__grain" />

      <div className="intro-gate__content">
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
