"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterCycleItem = {
  text: string;
  lang?: string;
};

type TypewriterCycleProps = {
  items: TypewriterCycleItem[];
  className?: string;
  typeMs?: number;
  holdMs?: number;
  switchMs?: number;
  startDelayMs?: number;
};

export function TypewriterCycle({
  items,
  className,
  typeMs = 58,
  holdMs = 1900,
  switchMs = 360,
  startDelayMs = 0,
}: TypewriterCycleProps) {
  const [hasStarted, setHasStarted] = useState(startDelayMs === 0);
  const [itemIndex, setItemIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const activeItem = items[itemIndex % items.length];
  const characters = useMemo(() => Array.from(activeItem.text), [activeItem.text]);
  const visibleText = characters.slice(0, visibleLength).join("");

  useEffect(() => {
    if (hasStarted) return;

    const timeoutId = setTimeout(() => {
      setHasStarted(true);
    }, startDelayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hasStarted, startDelayMs]);

  useEffect(() => {
    if (!hasStarted || items.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (isSwitching) {
      timeoutId = setTimeout(() => {
        setItemIndex((currentIndex) => (currentIndex + 1) % items.length);
        setVisibleLength(0);
        setIsSwitching(false);
      }, switchMs);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    if (visibleLength < characters.length) {
      timeoutId = setTimeout(() => {
        setVisibleLength((currentLength) => currentLength + 1);
      }, typeMs);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    timeoutId = setTimeout(() => {
      setIsSwitching(true);
    }, holdMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    characters.length,
    hasStarted,
    holdMs,
    isSwitching,
    items.length,
    switchMs,
    typeMs,
    visibleLength,
  ]);

  return (
    <span
      className={`typewriter-cycle${className ? ` ${className}` : ""}${
        isSwitching ? " typewriter-cycle--switching" : ""
      }`}
      data-script={activeItem.lang === "ja" ? "ja" : "en"}
      lang={activeItem.lang}
      aria-label={activeItem.text}
    >
      <span className="typewriter-cycle__text">{visibleText}</span>
      <span className="typewriter-cycle__cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
