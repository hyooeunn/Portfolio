"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Limb, MONKEY_HEAD, MonkeyHead } from "./MonkeyHead";
import { useWave } from "./useMonkey";

const VIEW = { x: 0, y: 0, w: 240, h: 240 } as const;
const HIP_L = "108 166";
const HIP_R = "132 166";

/**
 * Hero의 Curious Monkey — 나뭇가지에 걸터앉아 방문자를 맞이한다.
 *
 * 움직임과 이유
 * - 등장: 인트로 뒤 위에서 가지로 폴짝 내려앉는다 → 시선을 오른쪽 위로
 * - 대기: 발을 달랑거리고, 고개를 살짝 기울이고, 가끔 깜빡인다 → 살아 있는 캐릭터
 * - 커서: 눈이 커서를 따라본다 → 방문자와 눈 맞춤
 * - 호버/탭: 웃는 눈으로 바뀌며 손을 흔든다 → 인사
 * reduced-motion에서는 정지 상태.
 */
export function SittingMonkey({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useWave(rootRef, VIEW);

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        gsap
          .timeline({ delay: 0.9 })
          .from(".m-body", { y: -260, autoAlpha: 0, duration: duration.base, ease: "power2.in" })
          .to(".m-body", {
            scaleY: 0.9,
            scaleX: 1.06,
            svgOrigin: "120 190",
            duration: 0.12,
            ease: "power1.out",
            yoyo: true,
            repeat: 1,
          })
          .add(() => {
            // 발 달랑달랑 (좌우 엇갈리게)
            gsap.fromTo(
              ".m-leg-l",
              { rotation: -10 },
              { rotation: 14, svgOrigin: HIP_L, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 },
            );
            gsap.fromTo(
              ".m-leg-r",
              { rotation: 14 },
              { rotation: -10, svgOrigin: HIP_R, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 },
            );
            // 고개 갸웃
            gsap.fromTo(
              ".m-head",
              { rotation: -3 },
              {
                rotation: 3,
                svgOrigin: MONKEY_HEAD.neck,
                duration: 2.8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              },
            );
          });
      });

      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <div ref={rootRef} aria-hidden data-intro data-cursor="Hi!" className={cn("select-none", className)}>
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="h-auto w-full overflow-visible">
        {/* 꼬리 (가지 뒤) */}
        <g className="m-body">
          <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
            <Limb d="M146 160c24 2 34 30 18 40-10 6-18-4-10-12" width={7} />
          </g>
        </g>

        {/* 나뭇가지 — 오른쪽 화면 밖까지 이어진다 */}
        <path
          d="M-10 172C60 166 170 176 900 156"
          fill="none"
          stroke="var(--color-branch)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path d="M206 168c4-14 20-18 28-12-6 10-18 14-28 12Z" fill="var(--color-accent)" />
        <path d="M290 164c-2-14 10-24 20-22-2 12-10 20-20 22Z" fill="var(--color-accent)" opacity="0.6" />

        <g className="m-body">
          <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
            {/* 몸통 */}
            <path d="M90 172C84 148 92 120 120 118C148 120 156 148 150 172Z" fill="var(--color-fur)" />
            <ellipse cx="120" cy="152" rx="17" ry="14" fill="var(--color-face)" stroke="none" />

            {/* 다리 */}
            <g className="m-leg-l">
              <Limb d="M108 166L106 182" width={14} />
              <ellipse cx="105" cy="188" rx="11.5" ry="9" fill="var(--color-fur)" />
            </g>
            <g className="m-leg-r">
              <Limb d="M132 166L134 182" width={14} />
              <ellipse cx="135" cy="188" rx="11.5" ry="9" fill="var(--color-fur)" />
            </g>

            {/* 팔: 왼쪽은 가지를 짚고, 오른쪽은 인사할 때 든다 */}
            <Limb d="M96 136C88 146 86 156 88 164" width={11} />
            <circle cx="88" cy="166" r="8" fill="var(--color-fur)" />
            <g className="m-arm-wave">
              <Limb d="M144 136C152 146 154 156 152 164" width={11} />
              <circle cx="152" cy="166" r="8" fill="var(--color-fur)" />
            </g>

            {/* 라임 스카프 */}
            <path d="M98 132q22 12 44 0l-22 18Z" fill="var(--color-accent)" />
          </g>

          <MonkeyHead />
        </g>
      </svg>
    </div>
  );
}
