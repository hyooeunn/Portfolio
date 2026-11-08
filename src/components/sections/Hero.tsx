"use client";

import { useRef } from "react";
import { HangingMonkey } from "@/components/mascot/HangingMonkey";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { ArrowDown, Download, GitHub, Mail } from "@/components/ui/icons";
import { activities } from "@/content/activities";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, stagger } from "@/lib/motion";

/** 채용 담당자가 첫 화면에서 바로 읽을 수 있는 핵심 정보 4개 */
const facts = [
  { label: "Education", value: "광주SW마이스터고", sub: profile.education.major },
  {
    label: "Featured",
    value: projects
      .filter((p) => p.featured)
      .map((p) => p.title)
      .join(" · "),
    sub: "Front-End 설계 · 개발",
  },
  {
    label: "Awards",
    value: `수상 ${activities.filter((a) => a.award).length}회`,
    sub: "DevFest 우수상 외",
  },
  { label: "In Production", value: "130+명", sub: "GIF · GSM 재학생 대상 운영" },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      // 1) 인트로: 이름이 아래에서 한 글자씩 올라오고, 나머지 정보가 뒤따른다
      mm.add(MEDIA.motionOk, () => {
        gsap
          .timeline()
          .set("[data-intro], [data-intro-fade]", { autoAlpha: 1 })
          .from(".hero-letter", { yPercent: 110, duration: duration.slow, stagger: stagger.tight })
          .from(
            "[data-intro-fade]",
            { y: 24, autoAlpha: 0, duration: duration.base, stagger: stagger.base },
            "-=0.8",
          );
      });

      // 2) 스크롤 아웃(데스크톱): 다음 섹션으로 넘어가며 첫 화면이 뒤로 물러난다
      mm.add(`${MEDIA.motionOk} and ${MEDIA.desktop}`, () => {
        gsap.to("[data-hero-inner]", {
          yPercent: -14,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    [],
    rootRef,
  );

  const letters = Array.from(profile.nameEn);

  return (
    <section ref={rootRef} id="top" aria-label="소개" className="relative flex min-h-dvh flex-col pt-16">
      {/* 마스코트: 오른쪽 위 빈 공간에 매달려 방문자를 맞이한다 */}
      <HangingMonkey className="absolute top-16 right-4 z-10 w-28 sm:w-36 md:right-[7%] md:w-48 lg:w-56" />

      {/* 모바일에서는 마스코트 아래부터 내용이 시작되도록 위 여백을 확보 */}
      <div
        data-hero-inner
        className="container-page flex flex-1 flex-col justify-end pt-36 pb-10 sm:pt-44 md:pt-24 md:pb-14"
      >
        <div data-intro-fade className="eyebrow flex items-center justify-between">
          <span>Portfolio · {profile.name}</span>
          <span>{profile.role}</span>
        </div>

        <h1
          data-intro
          className="mt-6 font-display text-display font-bold [font-stretch:112%]"
        >
          <span className="sr-only">
            {profile.name} — {profile.role}
          </span>
          <span aria-hidden className="flex flex-wrap overflow-hidden pb-[0.06em]">
            {letters.map((ch, i) =>
              ch === " " ? (
                <span key={i} className="inline-block w-[0.28em]" />
              ) : (
                <span key={i} className="hero-letter inline-block will-change-transform">
                  {ch}
                </span>
              ),
            )}
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-10 md:grid-cols-12">
          <p data-intro-fade className="text-title font-semibold md:col-span-7">
            <Highlight text={profile.headline} words={["구조"]} />
          </p>

          <div data-intro-fade className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Magnetic>
              <ButtonLink href={profile.resume} download variant="primary" icon={<Download />}>
                이력서 다운로드
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={profile.contact.github} external icon={<GitHub />} aria-label="GitHub (새 창)">
                GitHub
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={`mailto:${profile.contact.email}`} icon={<Mail />} aria-label={`이메일 보내기: ${profile.contact.email}`}>
                Email
              </ButtonLink>
            </Magnetic>
          </div>
        </div>

        <dl data-intro-fade className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:mt-16 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-2 text-lg font-semibold md:text-xl">{f.value}</dd>
              <dd className="mt-0.5 text-sm text-muted">{f.sub}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div data-intro-fade>
        <Marquee
          items={profile.marquee}
          className="border-y border-line py-4 font-display text-2xl font-semibold text-muted md:py-6 md:text-5xl"
        />
      </div>

      <div className="container-page flex justify-center py-6">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#about", { offset: -72 });
          }}
          className="eyebrow flex items-center gap-2 transition-colors duration-[var(--duration-fast)] hover:text-fg"
          data-cursor="Scroll"
        >
          Scroll
          <ArrowDown className="animate-[scroll-cue_1.6s_var(--ease-in-out)_infinite]" />
        </a>
      </div>
    </section>
  );
}
