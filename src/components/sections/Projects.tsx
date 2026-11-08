"use client";

import { useRef } from "react";
import { WorkingMonkey } from "@/components/mascot/WorkingMonkey";
import { Reveal } from "@/components/motion/Reveal";
import { FeaturedProjectCard, ProjectCard } from "@/components/projects/ProjectCards";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/content/projects";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

/** 카드가 쌓일 때 위쪽에 남는 간격(px) */
const STACK_TOP = 96;
const STACK_GAP = 28;

/**
 * Projects
 * - 대표 프로젝트: sticky 카드 쌓기. 다음 카드가 올라오면 이전 카드가 살짝 작아지고 어두워져
 *   "지금 읽는 카드"에 시선이 가도록 한다. (데스크톱 · reduced-motion 아닐 때)
 * - 기타 프로젝트: 3열 카드
 */
export function Projects() {
  const rootRef = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MEDIA.motionOk} and ${MEDIA.desktop}`, () => {
        const items = gsap.utils.toArray<HTMLElement>(".stack-item");
        items.forEach((item, i) => {
          const next = items[i + 1];
          if (!next) return;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: `top ${STACK_TOP + (i + 1) * STACK_GAP}px`,
                scrub: true,
              },
            })
            .to(item.querySelector(".stack-card"), { scale: 0.94, ease: "none" }, 0)
            .to(item.querySelector(".stack-dim"), { opacity: 0.6, ease: "none" }, 0);
        });
      });
      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <section ref={rootRef} id="projects" aria-labelledby="projects-title" className="container-page py-28 md:py-40">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index="03" label="Projects" />
          <h2 id="projects-title" className="mt-6 text-title font-semibold">
            직접 맡은 기능과
            <br />
            문제를 해결한 과정으로 보는 프로젝트
          </h2>
          <p className="mt-4 text-muted">
            대표 프로젝트 {featured.length}개 · 그 밖의 프로젝트 {others.length}개. 카드를 누르면 상세 내용을 볼 수 있어요.
          </p>
        </div>
        <div className="flex justify-end md:col-span-4">
          <WorkingMonkey className="w-36 md:w-48" />
        </div>
      </div>

      <ol className="mt-16 flex flex-col gap-8 md:mt-20">
        {featured.map((p, i) => (
          <li
            key={p.slug}
            className="stack-item lg:sticky"
            style={{ top: STACK_TOP + i * STACK_GAP }}
          >
            <div className="stack-card relative origin-top">
              <FeaturedProjectCard project={p} index={i} />
              <div aria-hidden className="stack-dim pointer-events-none absolute inset-0 rounded-3xl bg-bg opacity-0" />
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-24 md:mt-32">
        <p className="eyebrow">More Projects</p>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} as="li" delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
