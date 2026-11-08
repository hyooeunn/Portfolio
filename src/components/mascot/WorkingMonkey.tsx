"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Limb, MONKEY_HEAD, MonkeyHead } from "./MonkeyHead";
import { useWave } from "./useMonkey";

const VIEW = { x: 0, y: 0, w: 240, h: 220 } as const;

/**
 * Projects의 Curious Monkey — 노트북으로 작업 중.
 * - 화면에 보일 때만 타자를 치고 코드 기호가 떠오른다 (스크롤로 들어오면 "작업 시작")
 * - 호버/탭: 고개를 들어 웃는 눈으로 바뀐다
 */
export function WorkingMonkey({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useWave(rootRef, VIEW, { follow: false });

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        gsap.set(".m-eyes", { y: 4 }); // 화면을 내려다본다

        const tl = gsap.timeline({ paused: true, repeat: -1 });
        tl.to(".m-paw-l", { y: -5, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" })
          .to(".m-paw-r", { y: -5, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" })
          .to(".m-paw-l", { y: -5, duration: 0.1, yoyo: true, repeat: 1, ease: "sine.inOut" })
          .to(".m-paw-r", { y: -5, duration: 0.1, yoyo: true, repeat: 1, ease: "sine.inOut" }, "+=0.05")
          .to({}, { duration: 0.4 });

        const glyphs = gsap.utils.toArray<SVGElement>(".m-glyph");
        gsap.set(glyphs, { autoAlpha: 0 });
        const floats = glyphs.map((g, i) =>
          gsap.to(g, {
            keyframes: { y: [10, -2, -16, -28], autoAlpha: [0, 1, 1, 0] },
            duration: 1.8,
            ease: "none",
            repeat: -1,
            repeatDelay: 0.6,
            delay: i * 0.9,
            paused: true,
          }),
        );

        const head = gsap.to(".m-head", {
          rotation: 2,
          svgOrigin: MONKEY_HEAD.neck,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        });

        // 화면에 보일 때만 재생
        const io = new IntersectionObserver(([entry]) => {
          const all = [tl, head, ...floats];
          all.forEach((t) => (entry.isIntersecting ? t.play() : t.pause()));
        });
        if (rootRef.current) io.observe(rootRef.current);
        return () => io.disconnect();
      });

      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <div ref={rootRef} aria-hidden data-cursor="Hi!" className={cn("select-none", className)}>
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="h-auto w-full overflow-visible">
        <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          {/* 꼬리 + 몸 */}
          <Limb d="M150 176c26 0 36-26 22-36-10-6-18 4-10 10" width={7} />
          <path d="M86 184C80 150 92 120 120 118C148 120 160 150 154 184Z" fill="var(--color-fur)" />
          <path d="M98 132q22 12 44 0l-22 18Z" fill="var(--color-accent)" />
        </g>

        <MonkeyHead />

        {/* 노트북 (뒷면) */}
        <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round">
          <rect x="72" y="138" width="96" height="54" rx="6" fill="#cfccc4" />
          <path d="M60 192h120l-8 10H68Z" fill="#a9a69e" />
        </g>
        <circle cx="120" cy="164" r="7" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.5" />

        {/* 팔 */}
        <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <g className="m-paw-l">
            <Limb d="M90 150C78 164 74 178 78 190" width={11} />
            <circle cx="80" cy="192" r="8" fill="var(--color-fur)" />
          </g>
          <g className="m-paw-r">
            <Limb d="M150 150C162 164 166 178 162 190" width={11} />
            <circle cx="160" cy="192" r="8" fill="var(--color-fur)" />
          </g>
        </g>

        {/* 떠오르는 코드 기호 */}
        <g fontFamily="var(--font-mono), monospace" fontWeight="700" fill="var(--color-accent)">
          <text className="m-glyph" x="178" y="128" fontSize="16">
            {"</>"}
          </text>
          <text className="m-glyph" x="30" y="140" fontSize="14">
            {"{ }"}
          </text>
          <text className="m-glyph" x="190" y="96" fontSize="12">
            {"( )"}
          </text>
        </g>
      </svg>
    </div>
  );
}
