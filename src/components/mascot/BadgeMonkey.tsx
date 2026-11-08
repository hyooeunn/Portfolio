"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Limb, MonkeyHead } from "./MonkeyHead";
import { RaisedArm, Scarf, SitBody, STROKE } from "./MonkeyParts";
import { useWave } from "./useMonkey";

const VIEW = { x: 0, y: 0, w: 240, h: 230 } as const;
const MEDAL = "190 52";

/**
 * Activities의 Curious Monkey — 시상대에 앉아 메달을 들고 있다.
 * count가 늘어날 때마다(타임라인을 지날 때마다) 메달이 통통 튀어 "경험 배지를 하나 모았다"를 알린다.
 */
export function BadgeMonkey({ count, className }: { count: number; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useWave(rootRef, VIEW, { swapFace: false, raisedArm: true });

  useGsap(
    () => {
      if (count === 0) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(
          ".m-medal",
          { scale: 1.35, rotation: -12 },
          { scale: 1, rotation: 0, svgOrigin: MEDAL, duration: 0.6, ease: "back.out(3)" },
        );
      });
      return () => mm.revert();
    },
    [count],
    rootRef,
  );

  return (
    <div ref={rootRef} aria-hidden data-cursor="Yay!" className={cn("select-none", className)}>
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="h-auto w-full overflow-visible">
        {/* 시상대 */}
        <g {...STROKE}>
          <path d="M78 170h84v56H78Z" fill="var(--color-elevated)" />
        </g>
        <text
          x="120"
          y="219"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontWeight="700"
          fontSize="15"
          fill="var(--color-accent)"
        >
          1st
        </text>

        <g {...STROKE}>
          <SitBody />
          <Limb d="M96 136C88 146 86 156 88 164" width={11} />
          <circle cx="88" cy="166" r="8" fill="var(--color-fur)" />
          <Scarf />
        </g>

        <MonkeyHead expression="happy" />

        <g {...STROKE}>
          <RaisedArm>
            <g className="m-medal">
              <circle cx="190" cy="52" r="18" fill="#f2c94c" />
              <path
                d="M190 40l3.6 7.4 8 1.2-5.8 5.6 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.6 8-1.2Z"
                fill="var(--color-face)"
                strokeWidth="2"
              />
            </g>
          </RaisedArm>
        </g>
      </svg>
    </div>
  );
}
