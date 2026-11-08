import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type SpaceAssetProps = {
  src: StaticImageData;
  /** 장식이면 비워 두고(alt=""), 의미가 있으면 설명을 넣는다 */
  alt?: string;
  className?: string;
  /** 무중력으로 떠다니기. 숫자는 한 주기(초) */
  float?: number;
  /** 떠다니는 주기를 엇갈리게 하는 지연(초) */
  delay?: number;
  /** 화면에 보이는 대략적인 최대 너비(px) — next/image sizes 계산용 */
  width?: number;
  priority?: boolean;
  style?: CSSProperties;
};

/**
 * 우주 에셋 이미지. next/image로 최적화하고, 필요하면 둥둥 떠다니게 한다.
 * 떠다니기는 CSS 애니메이션이라 reduced-motion에서 전역 규칙으로 멈춘다.
 */
export function SpaceAsset({
  src,
  alt = "",
  className,
  float,
  delay = 0,
  width = 240,
  priority,
  style,
}: SpaceAssetProps) {
  return (
    <Image
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      priority={priority}
      sizes={`${width}px`}
      draggable={false}
      className={cn("pointer-events-none h-auto select-none", float && "animate-float", className)}
      style={{
        ...(float ? { animationDuration: `${float}s`, animationDelay: `${-delay}s` } : {}),
        ...style,
      }}
    />
  );
}
