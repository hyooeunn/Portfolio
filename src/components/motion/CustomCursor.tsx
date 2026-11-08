"use client";

import { useEffect, useRef } from "react";
import { useRichPointer } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, gsapEase, loop } from "@/lib/motion";

/**
 * 커스텀 커서: 정확히 따라오는 점(dot) + 약간 늦게 따라오는 링(ring).
 * - 링크·버튼 위에서는 링이 커져 "누를 수 있다"는 것을 알려준다.
 * - data-cursor="보기" 같은 속성이 있으면 링 안에 라벨을 띄운다.
 * - 터치 기기, prefers-reduced-motion에서는 렌더하지 않는다.
 */
export function CustomCursor() {
  const enabled = useRichPointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const ctx = gsap.context(() => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
      const ringX = gsap.quickTo(ring, "x", { duration: loop.cursorFollow, ease: gsapEase.out });
      const ringY = gsap.quickTo(ring, "y", { duration: loop.cursorFollow, ease: gsapEase.out });

      let visible = false;
      const onMove = (e: PointerEvent) => {
        if (!visible) {
          visible = true;
          gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
          gsap.to([dot, ring], { autoAlpha: 1, duration: duration.fast });
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      const onLeave = () => {
        visible = false;
        gsap.to([dot, ring], { autoAlpha: 0, duration: duration.fast });
      };

      const onOver = (e: PointerEvent) => {
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
          "a, button, [role='button'], [data-cursor]",
        );
        const text = target?.dataset.cursor ?? "";
        label.textContent = text;
        gsap.to(ring, {
          scale: target ? (text ? 2.6 : 1.8) : 1,
          duration: duration.fast,
        });
        gsap.to(dot, { scale: target ? 0 : 1, duration: duration.fast });
        gsap.to(label, { autoAlpha: text ? 1 : 0, duration: duration.fast });
      };

      const html = document.documentElement;
      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerover", onOver);
      html.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        html.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      ctx.revert();
      root.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 grid size-10 place-items-center rounded-full border border-accent/70 mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="font-mono text-[5px] font-medium tracking-wider text-accent uppercase opacity-0"
        />
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 size-1.5 rounded-full bg-accent" />
    </div>
  );
}
