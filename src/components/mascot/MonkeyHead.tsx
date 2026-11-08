/**
 * Curious Monkey 머리 (2등신 치비 스타일).
 * 모든 포즈(매달리기·작업·배지·모험)가 이 머리를 공유한다.
 * 좌표계: 머리 중심 (118, 118), 반지름 62. 부모 <svg> 안에 <g>로 들어간다.
 *
 * 애니메이션 훅용 클래스
 * - .m-eyes : 시선(커서 따라보기) 이동
 * - .m-eye, .m-eye-l, .m-eye-r : 깜빡임 · 윙크
 * - .m-tongue : 메롱 (기본 숨김)
 */
export const MONKEY_HEAD_CENTER = { x: 118, y: 118 } as const;

export function MonkeyHead() {
  return (
    <g className="m-head">
      <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        {/* 귀 */}
        <circle cx="52" cy="124" r="22" fill="var(--color-fur)" />
        <circle cx="52" cy="124" r="12" fill="var(--color-ear)" stroke="none" />
        <circle cx="184" cy="124" r="22" fill="var(--color-fur)" />
        <circle cx="184" cy="124" r="12" fill="var(--color-ear)" stroke="none" />

        {/* 앞머리 */}
        <path d="M104 64c0-12 6-20 12-22-2 6 0 11 4 13 2-8 8-12 14-12-4 6-4 14-2 21Z" fill="var(--color-fur)" />

        {/* 머리 + 하트 모양 얼굴 */}
        <circle cx="118" cy="118" r="62" fill="var(--color-fur)" />
        <path
          d="M118 92C106 76 72 76 68 108C64 136 84 170 118 172C152 170 172 136 168 108C164 76 130 76 118 92Z"
          fill="var(--color-face)"
          strokeWidth="3"
        />
      </g>

      {/* 볼터치 */}
      <ellipse cx="80" cy="142" rx="9" ry="5" fill="var(--color-blush)" opacity="0.85" />
      <ellipse cx="156" cy="142" rx="9" ry="5" fill="var(--color-blush)" opacity="0.85" />

      {/* 눈 — 큰 하이라이트 + 작은 하이라이트 */}
      <g className="m-eyes">
        <g className="m-eye m-eye-l">
          <circle cx="96" cy="120" r="12.5" fill="var(--color-ink)" />
          <circle cx="100.5" cy="114.5" r="4.8" fill="#fff" />
          <circle cx="92" cy="125.5" r="2.3" fill="#fff" />
        </g>
        <g className="m-eye m-eye-r">
          <circle cx="140" cy="120" r="12.5" fill="var(--color-ink)" />
          <circle cx="144.5" cy="114.5" r="4.8" fill="#fff" />
          <circle cx="136" cy="125.5" r="2.3" fill="#fff" />
        </g>
      </g>

      {/* 입(ω) + 메롱 */}
      <path
        className="m-tongue"
        d="M113 147q5 13 10 0Z"
        fill="var(--color-blush)"
        stroke="var(--color-ink)"
        strokeWidth="2.4"
        strokeLinejoin="round"
        opacity="0"
      />
      <path
        d="M106 144q6 7 12 0q6 7 12 0"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}
