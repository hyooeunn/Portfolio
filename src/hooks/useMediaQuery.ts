"use client";

import { useSyncExternalStore } from "react";

/**
 * CSS 미디어쿼리 구독. 서버에서는 serverFallback을 반환하고,
 * 클라이언트에서는 변경을 실시간으로 반영한다.
 */
export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export const MEDIA = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  /** 애니메이션을 켜도 되는 환경 (gsap.matchMedia 조건용) */
  motionOk: "(prefers-reduced-motion: no-preference)",
  /** 마우스처럼 정밀한 포인터가 있는 기기 */
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 1024px)",
} as const;

export function usePrefersReducedMotion() {
  return useMediaQuery(MEDIA.reducedMotion);
}

/** 커서·마그네틱 같은 포인터 효과를 켜도 되는지 */
export function useRichPointer() {
  const fine = useMediaQuery(MEDIA.finePointer);
  const reduced = usePrefersReducedMotion();
  return fine && !reduced;
}
