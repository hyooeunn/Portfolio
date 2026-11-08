"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, gsapEase } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { MONKEY_HEAD_CENTER, MonkeyHead } from "./MonkeyHead";

/** 나뭇가지를 잡은 손의 위치 — 몸이 이 점을 축으로 흔들린다 */
const GRIP = "190 30";
/** 흔드는 팔의 어깨 위치 */
const SHOULDER = "92 198";

/** viewBox: x -20 ~ 280, y 0 ~ 290 */
const VIEW = { x: -20, w: 300, h: 290 } as const;

/**
 * Hero의 Curious Monkey — 나뭇가지에 매달려 방문자를 맞이한다.
 *
 * 움직임과 이유
 * - 등장: 위에서 내려와 가지를 잡는다 (인트로가 끝난 뒤 시선을 오른쪽 위로)
 * - 대기: 아주 천천히 흔들리고 가끔 눈을 깜빡인다 (살아 있는 캐릭터라는 신호)
 * - 커서: 눈이 커서를 따라본다 (방문자와 눈을 맞추는 유일한 장치)
 * - 호버/탭: 손을 흔들며 윙크하고 메롱 (인사)
 * reduced-motion에서는 정지 상태로 보여준다.
 */
export function HangingMonkey({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        // 등장 → 가지를 잡은 반동
        gsap
          .timeline({ delay: 0.9 })
          .from(".m-body", { y: -320, autoAlpha: 0, duration: duration.slow, ease: gsapEase.out })
          .fromTo(
            ".m-swing",
            { rotation: 7 },
            { rotation: 0, duration: duration.slow, ease: "elastic.out(1, 0.35)", svgOrigin: GRIP },
            "-=0.35",
          )
          .add(() => {
            // 대기 흔들림
            gsap.fromTo(
              ".m-swing",
              { rotation: -2.5 },
              { rotation: 2.5, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, svgOrigin: GRIP },
            );
          });

        // 깜빡임 (가끔 두 번 연속)
        gsap
          .timeline({ repeat: -1, repeatDelay: 3.4, delay: 3 })
          .to(".m-eye", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 })
          .to(".m-eye", { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 }, "+=2.2")
          .to(".m-eye", { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, "+=0.12");

        // 호버(터치는 탭) → 손 흔들기 + 윙크
        const wave = gsap
          .timeline({ paused: true })
          .to(".m-arm-wave", {
            rotation: 26,
            svgOrigin: SHOULDER,
            duration: 0.18,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 5,
          })
          .to(".m-eye-r", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.12 }, 0)
          .to(".m-tongue", { opacity: 1, duration: 0.12 }, 0)
          .to(".m-eye-r", { scaleY: 1, duration: 0.15 }, ">-0.1")
          .to(".m-tongue", { opacity: 0, duration: 0.15 }, "<");

        const onEnter = () => {
          if (!wave.isActive()) wave.restart();
        };
        root.addEventListener("pointerenter", onEnter);
        return () => root.removeEventListener("pointerenter", onEnter);
      });

      // 정밀 포인터에서만: 눈이 커서를 따라본다
      mm.add(`${MEDIA.motionOk} and ${MEDIA.finePointer}`, () => {
        const xTo = gsap.quickTo(".m-eyes", "x", { duration: duration.fast, ease: gsapEase.out });
        const yTo = gsap.quickTo(".m-eyes", "y", { duration: duration.fast, ease: gsapEase.out });
        const svg = root.querySelector("svg");

        const onMove = (e: PointerEvent) => {
          if (!svg) return;
          const r = svg.getBoundingClientRect();
          // 머리 중심의 화면 좌표
          const cx = r.left + (r.width * (MONKEY_HEAD_CENTER.x - VIEW.x)) / VIEW.w;
          const cy = r.top + (r.height * MONKEY_HEAD_CENTER.y) / VIEW.h;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const len = Math.hypot(dx, dy) || 1;
          const reach = Math.min(len / 240, 1) * 4;
          xTo((dx / len) * reach);
          yTo((dy / len) * reach);
        };

        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <div ref={rootRef} aria-hidden data-intro data-cursor="Hi!" className={cn("select-none", className)}>
      <svg viewBox={`${VIEW.x} 0 ${VIEW.w} ${VIEW.h}`} className="h-auto w-full overflow-visible">
        {/* 나뭇가지 */}
        <path
          d="M-20 28C60 18 170 32 280 22"
          fill="none"
          stroke="var(--color-branch)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="M232 22c6-14 22-16 28-10-6 10-18 14-28 10Z" fill="var(--color-accent)" />
        <path d="M30 24c-4-12-16-16-24-12 4 10 14 14 24 12Z" fill="var(--color-accent)" opacity="0.7" />

        <g className="m-body">
          <g className="m-swing">
            <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
              {/* 꼬리 */}
              <Limb d="M144 226c30 4 40-26 22-34-12-6-20 8-8 14" width={7} />
              {/* 가지를 잡은 팔 */}
              <Limb d="M146 196C180 186 198 120 190 32" width={13} />
              <circle cx="190" cy="30" r="11" fill="var(--color-fur)" />

              {/* 다리 */}
              <ellipse cx="104" cy="244" rx="11" ry="14" fill="var(--color-fur)" />
              <ellipse cx="132" cy="244" rx="11" ry="14" fill="var(--color-fur)" />

              {/* 몸 */}
              <ellipse cx="118" cy="212" rx="31" ry="32" fill="var(--color-fur)" />
              <ellipse cx="118" cy="220" rx="18" ry="16" fill="var(--color-face)" stroke="none" />

              {/* 흔드는 팔 */}
              <g className="m-arm-wave">
                <Limb d="M92 198C76 196 64 188 58 176" width={13} />
                <circle cx="56" cy="172" r="10" fill="var(--color-fur)" />
              </g>

              {/* 라임 스카프 */}
              <path d="M92 178q26 14 52 0l-26 22Z" fill="var(--color-accent)" />
            </g>

            <MonkeyHead />
          </g>
        </g>
      </svg>
    </div>
  );
}

/** 외곽선이 있는 팔·꼬리: 진한 선 위에 털 색 선을 겹쳐 그린다 */
function Limb({ d, width }: { d: string; width: number }) {
  return (
    <>
      <path d={d} fill="none" strokeWidth={width + 7} />
      <path d={d} fill="none" stroke="var(--color-fur)" strokeWidth={width} />
    </>
  );
}
