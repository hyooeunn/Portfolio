"use client";

import { type ReactNode, useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * 스크롤 패럴랙스 래퍼. speed > 0이면 스크롤보다 느리게(멀리 있는 것처럼),
 * speed < 0이면 빠르게(가까이 있는 것처럼) 움직인다. 데스크톱 · 모션 허용일 때만.
 */
export function Parallax({ children, speed = 0.2, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MEDIA.motionOk} and ${MEDIA.desktop}`, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: speed * 60 },
          {
            yPercent: -speed * 60,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    [speed],
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
