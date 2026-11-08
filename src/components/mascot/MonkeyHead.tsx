/**
 * Curious Monkey 머리. 모든 포즈(매달리기·작업·배지·모험)가 이 머리를 공유한다.
 * 좌표계: 머리 중심 (100, 118), 반지름 50. 부모 <svg> 안에 <g>로 들어간다.
 *
 * 애니메이션 훅용 클래스
 * - .m-eyes : 시선(커서 따라보기) 이동
 * - .m-eye, .m-eye-l, .m-eye-r : 깜빡임 · 윙크
 */
export function MonkeyHead() {
  return (
    <g className="m-head">
      {/* 귀 */}
      <circle cx="50" cy="122" r="17" fill="var(--color-fur)" />
      <circle cx="50" cy="122" r="9" fill="var(--color-fur-shade)" />
      <circle cx="150" cy="122" r="17" fill="var(--color-fur)" />
      <circle cx="150" cy="122" r="9" fill="var(--color-fur-shade)" />

      {/* 머리 + 앞머리 */}
      <circle cx="100" cy="118" r="50" fill="var(--color-fur)" />
      <path d="M84 76c1-18 24-24 32-6-7-6-15-6-19 2-4-4-9-3-13 4Z" fill="var(--color-bark)" />

      {/* 얼굴 마스크 */}
      <g fill="var(--color-fur-light)">
        <circle cx="84" cy="114" r="22" />
        <circle cx="116" cy="114" r="22" />
        <ellipse cx="100" cy="140" rx="32" ry="22" />
      </g>

      {/* 볼터치(라임) */}
      <circle cx="72" cy="134" r="6" fill="var(--color-accent)" opacity="0.45" />
      <circle cx="128" cy="134" r="6" fill="var(--color-accent)" opacity="0.45" />

      {/* 눈 */}
      <g className="m-eyes">
        <g className="m-eye m-eye-l">
          <ellipse cx="86" cy="114" rx="6.5" ry="8" fill="var(--color-bark)" />
          <circle cx="88.2" cy="111" r="2.2" fill="var(--color-fur-light)" />
        </g>
        <g className="m-eye m-eye-r">
          <ellipse cx="114" cy="114" rx="6.5" ry="8" fill="var(--color-bark)" />
          <circle cx="116.2" cy="111" r="2.2" fill="var(--color-fur-light)" />
        </g>
      </g>

      {/* 코 · 입 */}
      <circle cx="96" cy="134" r="1.9" fill="var(--color-bark)" />
      <circle cx="104" cy="134" r="1.9" fill="var(--color-bark)" />
      <path
        d="M90 143q10 9 20 0"
        fill="none"
        stroke="var(--color-bark)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}
