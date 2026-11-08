"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useRichPointer } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, gsapEase } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MagneticProps = {
  children: ReactNode;
  /** 0~1. 포인터 쪽으로 끌려가는 비율 */
  strength?: number;
  className?: string;
};

/**
 * 마그네틱 래퍼: 포인터가 위에 있으면 요소가 포인터 쪽으로 살짝 끌려온다.
 * 중요한 행동(이력서, GitHub, 연락)에만 써서 "여기를 누르라"는 신호로 쓴다.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useRichPointer();

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, "x", { duration: duration.fast, ease: gsapEase.out });
      const yTo = gsap.quickTo(el, "y", { duration: duration.fast, ease: gsapEase.out });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: duration.base, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }, el);

    return () => ctx.revert();
  }, [enabled, strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
