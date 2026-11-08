"use client";

import { type DependencyList, type RefObject, useEffect, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * GSAP 애니메이션을 gsap.context 안에서 생성하고,
 * 언마운트·의존성 변경 시 ctx.revert()로 트윈·ScrollTrigger·인라인 스타일을 모두 정리한다.
 *
 * setup 안에서 만든 모든 트윈/타임라인/ScrollTrigger는 자동으로 수집된다.
 * scope를 넘기면 선택자(".foo")가 그 요소 안에서만 검색된다.
 * setup이 함수를 반환하면 revert 시점에 함께 호출된다(이벤트 리스너 해제 등).
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void | (() => void),
  deps: DependencyList,
  scope?: RefObject<HTMLElement | null>,
) {
  useIsoLayoutEffect(() => {
    const ctx = gsap.context((self) => setup(self), scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
