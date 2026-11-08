/**
 * Curious Monkey 머리 (2등신 치비 · 메롱 표정).
 * 모든 포즈(앉기 · 작업 · 배지 · 모험)가 이 머리를 공유한다.
 * 좌표계: 머리 중심 (120, 88), 가로 반지름 60 · 세로 반지름 52. 부모 <svg> 안에 <g>로 들어간다.
 *
 * 애니메이션 훅용 클래스
 * - .m-head  : 고개 기울이기
 * - .m-eyes  : 시선 이동
 * - .m-eye, .m-eye-l, .m-eye-r : 깜빡임 · 윙크
 * - .m-tongue : 메롱 (흔들기)
 * - .m-face-tongue / .m-face-happy : 두 표정. 인사할 때 메롱 → 웃는 눈으로 바꾼다
 */
export const MONKEY_HEAD = { x: 120, y: 88, neck: "120 132" } as const;

export type MonkeyExpression = "tongue" | "happy";

export function MonkeyHead({ expression = "tongue" }: { expression?: MonkeyExpression }) {
  return (
    <g className="m-head">
      <g stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        {/* 귀 */}
        <circle cx="62" cy="94" r="18" fill="var(--color-fur)" />
        <circle cx="62" cy="94" r="10" fill="var(--color-ear)" stroke="none" />
        <circle cx="178" cy="94" r="18" fill="var(--color-fur)" />
        <circle cx="178" cy="94" r="10" fill="var(--color-ear)" stroke="none" />

        {/* 앞머리 */}
        <path d="M112 42c0-10 6-14 10-14-2 4 0 8 4 9 2-6 6-8 10-8-2 4-3 10-2 14Z" fill="var(--color-fur)" />

        {/* 머리 + 얼굴 */}
        <ellipse cx="120" cy="88" rx="60" ry="52" fill="var(--color-fur)" />
        <path
          d="M120 74C108 60 78 62 74 88C70 112 92 130 120 130C148 130 170 112 166 88C162 62 132 60 120 74Z"
          fill="var(--color-face)"
          strokeWidth="3"
        />
      </g>

      {/* 볼터치 */}
      <ellipse cx="86" cy="110" rx="8" ry="5" fill="var(--color-blush)" opacity="0.85" />
      <ellipse cx="154" cy="110" rx="8" ry="5" fill="var(--color-blush)" opacity="0.85" />

      {/* 표정 B — 점 눈 + 메롱 */}
      <g className="m-face-tongue" opacity={expression === "tongue" ? 1 : 0}>
        <g className="m-eyes">
          <g className="m-eye m-eye-l">
            <circle cx="101" cy="96" r="6.5" fill="var(--color-ink)" />
            <circle cx="103" cy="94" r="2" fill="#fff" />
          </g>
          <g className="m-eye m-eye-r">
            <circle cx="139" cy="96" r="6.5" fill="var(--color-ink)" />
            <circle cx="141" cy="94" r="2" fill="#fff" />
          </g>
        </g>
        <path
          className="m-tongue"
          d="M115 113q5 12 10 0Z"
          fill="var(--color-blush)"
          stroke="var(--color-ink)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path d="M106 110q14 9 28 0" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* 표정 C — 웃는 눈 + 활짝 웃는 입 */}
      <g className="m-face-happy" opacity={expression === "happy" ? 1 : 0}>
        <path
          d="M92 98q8-10 16 0M132 98q8-10 16 0"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M108 107q12 16 24 0Z"
          fill="var(--color-mouth)"
          stroke="var(--color-ink)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path d="M114 113q6 4 12 0q-6 5-12 0Z" fill="var(--color-blush)" />
      </g>
    </g>
  );
}

/** 외곽선이 있는 팔 · 다리 · 꼬리: 진한 선 위에 털 색 선을 겹쳐 그린다. 부모 g의 stroke를 상속한다. */
export function Limb({ d, width }: { d: string; width: number }) {
  return (
    <>
      <path d={d} fill="none" strokeWidth={width + 7} />
      <path d={d} fill="none" stroke="var(--color-fur)" strokeWidth={width} />
    </>
  );
}
