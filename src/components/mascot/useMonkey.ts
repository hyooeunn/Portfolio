"use client";

import type { RefObject } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, gsapEase } from "@/lib/motion";
import { MONKEY_HEAD } from "./MonkeyHead";

type View = { x: number; y: number; w: number; h: number };

/** 오른팔 어깨 — 모든 포즈에서 같은 위치 */
export const SHOULDER_R = "144 136";

/**
 * 모든 원숭이 포즈가 공유하는 공통 반응.
 * - 깜빡임
 * - 눈이 커서를 따라보기 (정밀 포인터)
 * - 호버/탭: 메롱 → 웃는 눈으로 바뀌며 오른손 흔들기 (.m-arm-wave가 있는 포즈만)
 */
type WaveOptions = {
  /** 눈이 커서를 따라볼지 */
  follow?: boolean;
  /** 인사할 때 메롱 → 웃는 눈으로 바꿀지 (기본 표정이 웃는 눈이면 false) */
  swapFace?: boolean;
  /** 팔이 이미 들려 있는 포즈면 들어올리지 않고 좌우로만 흔든다 */
  raisedArm?: boolean;
};

export function useWave(rootRef: RefObject<HTMLElement | null>, view: View, options: WaveOptions = {}) {
  const follow = options.follow ?? true;
  const swapFace = options.swapFace ?? true;
  const raisedArm = options.raisedArm ?? false;

  useGsap(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        // 깜빡임 (가끔 두 번 연속)
        gsap
          .timeline({ repeat: -1, repeatDelay: 3.4, delay: 2.5 })
          .to(".m-eye", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 })
          .to(".m-eye", { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 }, "+=2.2")
          .to(".m-eye", { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1 }, "+=0.12");

        // 인사: 표정 전환 + 손 흔들기
        const hasArm = root.querySelector(".m-arm-wave");
        const wave = gsap.timeline({ paused: true });
        if (swapFace) {
          wave.to(".m-face-tongue", { opacity: 0, duration: 0.12 }, 0).to(".m-face-happy", { opacity: 1, duration: 0.12 }, 0);
        }

        if (hasArm && raisedArm) {
          wave
            .to(".m-arm-wave", { rotation: -14, svgOrigin: SHOULDER_R, duration: 0.16, ease: "sine.inOut" }, 0)
            .to(".m-arm-wave", {
              rotation: 14,
              svgOrigin: SHOULDER_R,
              duration: 0.18,
              ease: "sine.inOut",
              yoyo: true,
              repeat: 5,
            })
            .to(".m-arm-wave", { rotation: 0, svgOrigin: SHOULDER_R, duration: duration.fast, ease: gsapEase.out });
        } else if (hasArm) {
          wave
            .to(".m-arm-wave", { rotation: -150, svgOrigin: SHOULDER_R, duration: 0.25, ease: gsapEase.out }, 0)
            .to(".m-arm-wave", {
              rotation: -120,
              svgOrigin: SHOULDER_R,
              duration: 0.16,
              ease: "sine.inOut",
              yoyo: true,
              repeat: 5,
            })
            .to(".m-arm-wave", { rotation: 0, svgOrigin: SHOULDER_R, duration: duration.fast, ease: gsapEase.out });
        } else {
          wave.to({}, { duration: 1.2 });
        }

        if (swapFace) {
          wave
            .to(".m-face-happy", { opacity: 0, duration: 0.15 }, ">-0.1")
            .to(".m-face-tongue", { opacity: 1, duration: 0.15 }, "<");
        }

        const onEnter = () => {
          if (!wave.isActive()) wave.restart();
        };
        root.addEventListener("pointerenter", onEnter);
        return () => root.removeEventListener("pointerenter", onEnter);
      });

      if (follow) {
        mm.add(`${MEDIA.motionOk} and ${MEDIA.finePointer}`, () => {
          const xTo = gsap.quickTo(".m-eyes", "x", { duration: duration.fast, ease: gsapEase.out });
          const yTo = gsap.quickTo(".m-eyes", "y", { duration: duration.fast, ease: gsapEase.out });
          const svg = root.querySelector("svg");

          const onMove = (e: PointerEvent) => {
            if (!svg) return;
            const r = svg.getBoundingClientRect();
            const cx = r.left + (r.width * (MONKEY_HEAD.x - view.x)) / view.w;
            const cy = r.top + (r.height * (MONKEY_HEAD.y - view.y)) / view.h;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const len = Math.hypot(dx, dy) || 1;
            const reach = Math.min(len / 240, 1) * 3.5;
            xTo((dx / len) * reach);
            yTo((dy / len) * reach);
          };

          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        });
      }

      return () => mm.revert();
    },
    [follow, swapFace, raisedArm],
    rootRef,
  );
}
