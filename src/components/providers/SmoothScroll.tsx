"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef } from "react";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { duration } from "@/lib/motion";

type ScrollTarget = string | number | HTMLElement;
type ScrollToFn = (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => void;

const ScrollContext = createContext<ScrollToFn>(() => {});

/** 앵커 이동 등 스크롤 이동은 이 함수로. Lenis가 꺼져 있으면 네이티브 스크롤을 쓴다. */
export function useScrollTo() {
  return useContext(ScrollContext);
}

/** motion 토큰의 ease.out(0.16, 1, 0.3, 1)과 같은 계열인 expo-out 곡선 */
const lenisEasing = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia(MEDIA.reducedMotion);

    const start = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        duration: duration.slow,
        easing: lenisEasing,
        smoothWheel: true,
        // 터치 기기는 네이티브 관성 스크롤이 더 자연스럽다
        syncTouch: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      lenisRef.current = lenis;
    };

    const stop = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    // GSAP ticker 하나로 Lenis와 ScrollTrigger를 같은 프레임에 갱신
    const tick = (time: number) => lenisRef.current?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const apply = () => (reduced.matches ? stop() : start());
    apply();
    reduced.addEventListener("change", apply);

    return () => {
      reduced.removeEventListener("change", apply);
      gsap.ticker.remove(tick);
      stop();
    };
  }, []);

  // 라우트가 바뀌면 맨 위에서 시작하고 트리거 위치를 다시 계산
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const scrollTo = useCallback<ScrollToFn>((target, options) => {
    const offset = options?.offset ?? 0;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, immediate: options?.immediate });
      return;
    }
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (typeof el === "number") {
      window.scrollTo({ top: el + offset });
    } else if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
    }
  }, []);

  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>;
}
