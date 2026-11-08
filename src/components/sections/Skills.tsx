"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skills } from "@/content/skills";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA, useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { ScrollTrigger } from "@/lib/gsap";
import { gsapEase, stagger, transition } from "@/lib/motion";

const SUMMARY = "TypeScript · Next.js 중심의 Front-End, 라즈베리파이 · 아두이노 하드웨어까지.";

/**
 * Skills
 * - 데스크톱: 섹션이 화면에 고정(pin)되고, 스크롤할 때마다 카테고리가 한 장면씩 바뀐다.
 *   카테고리가 4개뿐이라 한 번에 나열하는 것보다 "하나씩 읽게" 만드는 편이 기억에 남는다.
 * - 모바일 · reduced-motion: 고정 없이 카테고리를 차례로 나열한다.
 */
export function Skills() {
  const desktop = useMediaQuery(MEDIA.desktop);
  const reduced = usePrefersReducedMotion();
  return desktop && !reduced ? <SkillsScene /> : <SkillsList />;
}

function SkillsHeader() {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-3">
        <SectionLabel index="02" label="Skills" />
      </div>
      <h2 id="skills-title" className="text-title font-semibold md:col-span-9">
        {SUMMARY}
      </h2>
    </div>
  );
}

function SkillsScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const scrollTo = useScrollTo();
  const n = skills.length;

  useGsap(
    () => {
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${(n - 1) * 85}%`,
        pin: true,
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.2, max: 0.6 },
          ease: gsapEase.inOut,
          delay: 0.05,
        },
        onUpdate: (self) => {
          setActive(Math.round(self.progress * (n - 1)));
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      stRef.current = st;
      // 고정(pin)이 늦게 생기면 아래 섹션 트리거 위치가 어긋나므로 순서 정렬 후 다시 계산
      const raf = requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      return () => {
        cancelAnimationFrame(raf);
        stRef.current = null;
      };
    },
    [n],
    rootRef,
  );

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    scrollTo(st.start + ((st.end - st.start) * i) / (n - 1));
  };

  const current = skills[active];

  return (
    <section ref={rootRef} id="skills" aria-labelledby="skills-title">
      <div ref={pinRef} className="container-page flex h-dvh flex-col pt-28 pb-14">
        <SkillsHeader />

        <div className="mt-14 grid flex-1 grid-cols-12 gap-8">
          {/* 카테고리 목록 — 현재 위치 + 바로가기 */}
          <nav aria-label="기술 카테고리" className="col-span-4 flex flex-col">
            <ol className="flex flex-col">
              {skills.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "flex w-full items-baseline gap-4 border-t border-line py-4 text-left transition-colors duration-[var(--duration-fast)]",
                      i === active ? "text-fg" : "text-subtle hover:text-muted",
                    )}
                  >
                    <span className={cn("font-mono text-xs", i === active && "text-accent")}>0{i + 1}</span>
                    <span className="text-lg font-semibold">{c.title}</span>
                    <span className="ml-auto font-mono text-xs">{c.items.length}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-auto h-px w-full bg-line">
              <div ref={barRef} className="h-px origin-left scale-x-0 bg-accent" />
            </div>
          </nav>

          {/* 현재 카테고리 */}
          <div className="col-span-8 col-start-5 flex flex-col" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={transition.fast}
              >
                <p className="eyebrow">
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-headline font-bold">{current.title}</h3>
                <p className="mt-4 max-w-xl text-lg text-muted">{current.caption}</p>

                <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-1 xl:grid-cols-3">
                  {current.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...transition.fast, delay: 0.1 + i * stagger.base }}
                      className="flex items-baseline gap-3 border-b border-line py-3"
                    >
                      <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-2xl font-semibold tracking-tight">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsList() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="container-page py-28">
      <SkillsHeader />
      <div className="mt-14 flex flex-col gap-12">
        {skills.map((c, i) => (
          <Reveal key={c.id} className="border-t border-line pt-6">
            <p className="eyebrow">
              <span className="text-accent">0{i + 1}</span> · {c.items.length}
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold">{c.title}</h3>
            <p className="mt-2 text-muted">{c.caption}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.items.map((item) => (
                <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
