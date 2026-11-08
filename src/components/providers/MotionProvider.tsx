"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { transition } from "@/lib/motion";

/**
 * Framer Motion 전역 설정.
 * - 기본 transition을 motion 토큰으로 통일
 * - reducedMotion="user": OS의 "동작 줄이기"가 켜지면 이동·크기 변화는 생략하고 투명도만 바꾼다
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig transition={transition.base} reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
