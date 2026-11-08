import { Limb } from "./MonkeyHead";

/**
 * 앉은 자세 공통 몸통 · 다리 · 꼬리 · 스카프.
 * 머리(MonkeyHead)와 같은 좌표계(머리 중심 120, 88)를 쓴다. 부모 g의 stroke를 상속한다.
 */
export function SitBody() {
  return (
    <>
      <Limb d="M150 160c24 2 34 30 18 40-10 6-18-4-10-12" width={7} />
      <path d="M90 172C84 148 92 120 120 118C148 120 156 148 150 172Z" fill="var(--color-fur)" />
      <ellipse cx="120" cy="152" rx="17" ry="14" fill="var(--color-face)" stroke="none" />
      <g className="m-leg-l">
        <Limb d="M108 166L106 182" width={14} />
        <ellipse cx="105" cy="188" rx="11.5" ry="9" fill="var(--color-fur)" />
      </g>
      <g className="m-leg-r">
        <Limb d="M132 166L134 182" width={14} />
        <ellipse cx="135" cy="188" rx="11.5" ry="9" fill="var(--color-fur)" />
      </g>
    </>
  );
}

export function Scarf() {
  return <path d="M98 132q22 12 44 0l-22 18Z" fill="var(--color-accent)" />;
}

/** 위로 든 오른팔 (머리보다 앞에 그린다) */
export function RaisedArm({ children }: { children?: React.ReactNode }) {
  return (
    <g className="m-arm-wave">
      {children}
      <Limb d="M144 136C164 128 176 108 182 86" width={11} />
      <circle cx="184" cy="80" r="8.5" fill="var(--color-fur)" />
    </g>
  );
}

export const STROKE = {
  stroke: "var(--color-ink)",
  strokeWidth: 4,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
