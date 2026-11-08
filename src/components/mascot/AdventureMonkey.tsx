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

/**
 * Contact의 Curious Monkey — 배낭에 앉아 깃발을 들고 "다음 모험"을 기다린다.
 * - 깃발이 바람에 살짝 펄럭인다
 * - 호버/탭: 웃는 눈으로 바뀌며 손을 흔든다 (작별 인사 겸 "연락 주세요")
 */
export function AdventureMonkey({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useWave(rootRef, VIEW, { raisedArm: true });

  useGsap(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(
          ".m-flag",
          { scaleX: 1 },
          { scaleX: 0.82, svgOrigin: "34 38", duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
        gsap.fromTo(
          ".m-leg-l",
          { rotation: -8 },
          { rotation: 12, svgOrigin: "108 166", duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
        gsap.fromTo(
          ".m-leg-r",
          { rotation: 12 },
          { rotation: -8, svgOrigin: "132 166", duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      });
      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <div ref={rootRef} aria-hidden data-cursor="Bye!" className={cn("select-none", className)}>
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="h-auto w-full overflow-visible">
        {/* 깃발 */}
        <path d="M62 214L34 30" stroke="var(--color-branch)" strokeWidth="7" strokeLinecap="round" />
        <path
          className="m-flag"
          d="M34 30l-34 6 30 16Z"
          fill="var(--color-accent)"
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <g {...STROKE}>
          {/* 배낭 */}
          <rect x="76" y="166" width="88" height="48" rx="14" fill="var(--color-branch)" />
          <rect x="100" y="182" width="40" height="22" rx="6" fill="#6e5443" />
          <path d="M112 182v-6M128 182v-6" stroke="var(--color-accent)" />

          <SitBody />
          {/* 깃대를 잡은 왼팔 */}
          <Limb d="M96 136C80 144 66 150 56 152" width={11} />
          <circle cx="54" cy="153" r="8" fill="var(--color-fur)" />
          <Scarf />
        </g>

        <MonkeyHead />

        <g {...STROKE}>
          <RaisedArm />
        </g>
      </svg>
    </div>
  );
}
