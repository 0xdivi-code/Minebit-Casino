"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { NavArrow } from "./Buttons";

export interface CarouselApi {
  prev: () => void;
  next: () => void;
}

export interface CarouselNavState {
  canPrev: boolean;
  canNext: boolean;
}

interface CarouselProps {
  children: ReactNode;
  label: string;
  apiRef?: RefObject<CarouselApi | null>;
  onNavChange?: (state: CarouselNavState) => void;
  className?: string;
}

export default function Carousel({ children, label, apiRef, onNavChange, className = "" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const navRef = useRef({ canPrev: false, canNext: true });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const prev = el.scrollLeft > 8;
    const next = el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
    if (prev !== navRef.current.canPrev || next !== navRef.current.canNext) {
      navRef.current = { canPrev: prev, canNext: next };
      onNavChange?.({ canPrev: prev, canNext: next });
    }
  }, [onNavChange]);

  useEffect(() => {
    const scroll = (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 320), behavior: "smooth" });
    };
    if (apiRef) apiRef.current = { prev: () => scroll(-1), next: () => scroll(1) };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [apiRef, update]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        onScroll={update}
        className={`no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth pb-1 ${className}`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1 bottom-0 top-0 z-[2] w-[25px] bg-gradient-to-l from-abyss to-transparent"
      />
    </div>
  );
}

export function CarouselNavButtons({
  onPrev,
  onNext,
  canPrev,
  canNext,
  label,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  label: string;
}) {
  return (
    <div className="flex gap-2">
      <NavArrow dir="prev" disabled={!canPrev} onClick={onPrev} label={`Previous ${label}`} />
      <NavArrow dir="next" disabled={!canNext} onClick={onNext} label={`Next ${label}`} />
    </div>
  );
}
