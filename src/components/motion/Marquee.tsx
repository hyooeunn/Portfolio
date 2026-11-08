"use client";

import { Fragment, useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { duration, loop } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** true면 오른쪽으로 흐른다 */
  reverse?: boolean;
};

/**
 * 무한 마퀴. 기본 속도로 흐르다가, 스크롤하면 스크롤 방향을 따라가고 속도가 잠깐 빨라진다.
 * 페이지가 "움직이고 있다"는 감각을 스크롤과 연결하기 위한 효과.
 * reduced-motion에서는 멈춘 상태로 보여준다.
 */
export function Marquee({ items, className, reverse = false }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        const base = reverse ? -1 : 1;
        // 트랙에는 같은 목록이 두 번 들어 있어서 -50%까지 가면 처음과 같은 모습이 된다
        const tween = gsap.fromTo(
          track,
          { xPercent: 0 },
          { xPercent: -50, duration: loop.marquee, ease: "none", repeat: -1 },
        );
        // 역방향 재생이 0에서 멈추지 않도록 재생 위치를 충분히 뒤로 보낸다
        tween.totalTime(tween.duration() * 100);
        tween.timeScale(base);

        let direction = 1;
        const trigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4);
            gsap.to(tween, {
              timeScale: base * direction * boost,
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(tween, { timeScale: base * direction, duration: duration.slow });
              },
            });
          },
        });

        return () => {
          trigger.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    [reverse],
    rootRef,
  );

  const list = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="px-6 whitespace-nowrap md:px-10">{item}</span>
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent md:size-3" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
