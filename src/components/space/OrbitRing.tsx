"use client";

import { useId, useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const RX = 240;
const RY = 64;

/**
 * 기울어진 유리 궤도 링 + 그 위를 도는 작은 위성.
 * 링의 뒤쪽 절반은 대상(원숭이) 뒤에, 앞쪽 절반은 앞에 그려야 하므로 layer로 나눠 두 번 렌더한다.
 * 위성은 sin 값으로 앞/뒤 레이어를 오가며 대상 뒤로 숨었다 나온다.
 */
export function OrbitRing({
  layer,
  className,
  duration = 14,
}: {
  layer: "back" | "front";
  className?: string;
  duration?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useGsap(
    () => {
      const sat = ref.current?.querySelector<SVGCircleElement>(".orbit-sat");
      if (!sat) return;
      const mm = gsap.matchMedia();
      const place = (t: number) => {
        const a = t * Math.PI * 2;
        sat.setAttribute("cx", String(Math.cos(a) * RX));
        sat.setAttribute("cy", String(Math.sin(a) * RY));
        // 앞쪽(아래 반원)은 front 레이어에서만, 뒤쪽은 back 레이어에서만 보인다
        const inFront = Math.sin(a) > 0;
        sat.style.opacity = (layer === "front") === inFront ? "1" : "0";
      };
      mm.add(MEDIA.motionOk, () => {
        const state = { t: 0.15 };
        gsap.to(state, { t: 1.15, duration, ease: "none", repeat: -1, onUpdate: () => place(state.t % 1) });
      });
      mm.add(MEDIA.reducedMotion, () => place(0.15));
      return () => mm.revert();
    },
    [layer, duration],
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={`${-RX - 12} ${-RY - 12} ${(RX + 12) * 2} ${(RY + 12) * 2}`}
      className={cn("pointer-events-none overflow-visible", className)}
    >
      <defs>
        <linearGradient id={`ring-${gid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#dbe7ff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#dbe7ff" stopOpacity="0.7" />
          <stop offset="0.8" stopColor="#c6f432" stopOpacity="0.8" />
          <stop offset="1" stopColor="#dbe7ff" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id={`half-${gid}`}>
          {layer === "front" ? (
            <rect x={-RX - 20} y="0" width={(RX + 20) * 2} height={RY + 20} />
          ) : (
            <rect x={-RX - 20} y={-RY - 20} width={(RX + 20) * 2} height={RY + 20} />
          )}
        </clipPath>
      </defs>
      <g clipPath={`url(#half-${gid})`}>
        <ellipse rx={RX} ry={RY} fill="none" stroke="#8fb4ff" strokeOpacity="0.18" strokeWidth="10" />
        <ellipse rx={RX} ry={RY} fill="none" stroke={`url(#ring-${gid})`} strokeWidth="2.5" />
      </g>
      <circle className="orbit-sat" r="7" fill="#e6eeff" style={{ filter: "drop-shadow(0 0 6px #8fb4ff)" }} />
    </svg>
  );
}
