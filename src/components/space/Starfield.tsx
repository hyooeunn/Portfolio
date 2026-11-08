"use client";

import { useEffect, useRef } from "react";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number; tint: string };

const TINTS = ["#ffffff", "#ffffff", "#dbe6ff", "#c9d8ff", "#eaffb8"];

/**
 * 사이트 전체 뒤에 깔리는 별 배경 (fixed canvas).
 * - 깊이가 다른 별들이 스크롤에 따라 다른 속도로 움직인다 → 스크롤할 때 "앞으로 나아가는" 느낌
 * - 별이 천천히 반짝인다
 * - 모바일은 별 수를 줄이고, reduced-motion이면 한 번만 그린다
 * Lenis와 같은 gsap.ticker에서 그려 스크롤과 프레임이 어긋나지 않는다.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(MEDIA.reducedMotion).matches;
    let stars: Star[] = [];
    let w = 0;
    let h = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / (w < 768 ? 9000 : 6500));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.3 + depth * 1.1,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.4,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      for (const s of stars) {
        // 가까운 별일수록 스크롤에 더 많이 움직인다 (화면 높이로 감아서 무한 반복)
        const y = (((s.y - scroll * (0.04 + s.depth * 0.22)) % h) + h) % h;
        const twinkle = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        ctx.globalAlpha = (0.25 + s.depth * 0.75) * twinkle;
        ctx.fillStyle = s.tint;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    build();
    draw(0);

    const onResize = () => {
      build();
      draw(gsap.ticker.time);
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      const onScroll = () => draw(0);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
      };
    }

    const tick = (time: number) => draw(time);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* 성운 */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_10%,rgb(80_110_220/0.22),transparent_70%),radial-gradient(45%_40%_at_5%_60%,rgb(90_80_200/0.12),transparent_70%),radial-gradient(40%_35%_at_60%_95%,rgb(198_244_50/0.05),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {/* 아주 옅은 HUD 그리드 */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_35%,#000,transparent)] bg-[linear-gradient(rgb(140_170_255/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(140_170_255/0.045)_1px,transparent_1px)] bg-[size:96px_96px]" />
    </div>
  );
}
