/**
 * Motion tokens — 사이트의 모든 움직임은 이 파일의 값만 사용한다.
 * GSAP(CustomEase), Framer Motion(cubic-bezier 배열), CSS(var) 세 곳에서
 * 같은 곡선·같은 속도가 나오도록 한 곳에서 정의한다.
 */

/** cubic-bezier 좌표. CSS의 --ease-* 변수와 값이 같아야 한다. */
export const ease = {
  /** 등장·이동의 기본. 빠르게 출발해서 길게 감속 */
  out: [0.16, 1, 0.3, 1],
  /** 장면 전환처럼 시작과 끝이 모두 있는 움직임 */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** 초(s) 단위. Framer Motion과 GSAP 모두 초를 사용한다. */
export const duration = {
  /** 호버, 커서, 마그네틱 등 즉각 반응 */
  fast: 0.35,
  /** 요소 등장 */
  base: 0.8,
  /** 섹션·페이지 전환 */
  slow: 1.2,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
} as const;

/** GSAP에서 쓰는 ease 이름. lib/gsap.ts에서 CustomEase로 등록된다. */
export const gsapEase = {
  out: "brand.out",
  inOut: "brand.inOut",
} as const;

/** Framer Motion 공통 transition */
export const transition = {
  base: { duration: duration.base, ease: ease.out },
  fast: { duration: duration.fast, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.inOut },
} as const;

/** 마퀴, 커서 추적처럼 연속적인 움직임의 속도 */
export const loop = {
  /** 마퀴 한 바퀴(초) */
  marquee: 28,
  /** 커서 링이 따라오는 시간(초) */
  cursorFollow: 0.45,
} as const;
