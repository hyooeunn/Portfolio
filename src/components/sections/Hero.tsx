"use client";

import { useRef } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { SpaceAsset } from "@/components/space/SpaceAsset";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { ArrowDown, Download, GitHub, Mail } from "@/components/ui/icons";
import { activities } from "@/content/activities";
import { space } from "@/content/assets";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, gsapEase, stagger } from "@/lib/motion";

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
  { label: "In Production", value: "130+명", sub: "GIF · GSM 재학생 대상 운영", accent: true },
];

/**
 * Hero
 * - 인트로: 큰 타이틀이 글자별로 올라오고, 우주복 원숭이가 오른쪽 아래에서 떠오른다
 * - 원숭이 · 궤도 · 행성이 커서 위치에 따라 깊이별로 다르게 움직여 공간감을 준다 (정밀 포인터)
 * - 데스크톱에서 스크롤하면 첫 화면이 뒤로 물러난다
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        gsap
          .timeline()
          .set("[data-intro], [data-intro-fade]", { autoAlpha: 1 })
          .from(".hero-letter", { yPercent: 110, duration: duration.slow, stagger: stagger.tight })
          .from(
            "[data-intro-fade]",
            { y: 24, autoAlpha: 0, duration: duration.base, stagger: stagger.base },
            "-=0.9",
          )
          .from(
            ".hero-monkey",
            { x: 160, y: 140, rotation: 18, autoAlpha: 0, duration: duration.slow * 1.4, ease: gsapEase.out },
            0.3,
          )
          .from(".hero-deco", { scale: 0.6, autoAlpha: 0, duration: duration.slow, stagger: stagger.base }, 0.6);
      });

      // 커서 깊이 패럴랙스: data-depth가 클수록 많이 움직인다
      mm.add(`${MEDIA.motionOk} and ${MEDIA.finePointer}`, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => {
          const d = Number(el.dataset.depth);
          return {
            d,
            x: gsap.quickTo(el, "x", { duration: duration.slow, ease: gsapEase.out }),
            y: gsap.quickTo(el, "y", { duration: duration.slow, ease: gsapEase.out }),
          };
        });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.d * 60);
            l.y(ny * l.d * 40);
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      mm.add(`${MEDIA.motionOk} and ${MEDIA.desktop}`, () => {
        gsap.to("[data-hero-inner]", {
          yPercent: -12,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-planet", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <section ref={rootRef} id="top" aria-label="소개" className="relative flex min-h-dvh flex-col overflow-x-clip pt-16">
      {/* 행성 지평선 */}
      <div aria-hidden className="hero-planet pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] overflow-hidden md:h-[46vh]">
        <div className="planet top-[22%]" />
      </div>

      {/* 오른쪽 우주 장면 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-depth="0.3" className="hero-deco absolute top-[12%] right-[4%] w-20 md:w-28">
          <SpaceAsset src={space.planetGlass} float={9} width={112} />
        </div>
        <div data-depth="0.8" className="hero-deco absolute top-[22%] right-[38%] hidden w-8 md:block">
          <SpaceAsset src={space.sparkleLime} float={5} width={32} />
        </div>
        <div data-depth="0.5" className="hero-deco absolute top-[58%] right-[6%] w-6 md:w-8">
          <SpaceAsset src={space.starSilver} float={6} delay={2} width={32} />
        </div>
        <div data-depth="1" className="hero-deco absolute top-[50%] right-[44%] hidden w-10 md:block">
          <SpaceAsset src={space.bubble} float={7} delay={1} width={40} />
        </div>

        {/* 원숭이 + 궤도 */}
        <div
          data-depth="0.6"
          className="absolute top-[6%] right-[-6%] w-[min(78vw,380px)] sm:right-[2%] md:top-[9%] md:right-[6%] md:w-[min(44vw,560px)]"
        >
          <div data-intro className="hero-monkey relative">
            <SpaceAsset
              src={space.orbitEllipse}
              className="absolute top-[38%] left-[-14%] w-[128%] max-w-none rotate-[-8deg] opacity-80"
              width={720}
            />
            <SpaceAsset
              src={space.monkey.float}
              alt="우주복을 입고 떠다니는 원숭이 마스코트"
              float={7}
              width={560}
              priority
              className="relative w-full drop-shadow-[0_30px_60px_rgb(70_120_255/0.35)]"
            />
          </div>
        </div>
      </div>

      <div
        data-hero-inner
        className="container-page relative flex flex-1 flex-col justify-end pt-[min(70vw,300px)] pb-8 md:pt-24 md:pb-10"
      >
        <p data-intro-fade className="eyebrow flex items-center gap-3">
          <span aria-hidden className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          {profile.name} · {profile.role}
        </p>

        <h1 data-intro className="mt-5 font-wide text-[clamp(3rem,10vw,9.5rem)] leading-[0.88] tracking-[-0.02em]">
          <span className="sr-only">
            {profile.name} — {profile.role}. {profile.headline}
          </span>
          {profile.tagline.map((line, li) => (
            <span key={line} aria-hidden className="block overflow-hidden pr-[0.1em] pb-[0.04em]">
              <span className={li === 1 ? "text-glow inline-block" : "inline-block"}>
                {Array.from(line).map((ch, i) => (
                  <span key={i} className="hero-letter inline-block will-change-transform">
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p data-intro-fade className="text-title font-bold">
              <Highlight text={profile.headline} words={["구조"]} className="text-glow" />
            </p>
            <div data-intro-fade className="mt-8 flex flex-wrap gap-3">
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
                <ButtonLink
                  href={`mailto:${profile.contact.email}`}
                  icon={<Mail />}
                  aria-label={`이메일 보내기: ${profile.contact.email}`}
                >
                  Email
                </ButtonLink>
              </Magnetic>
            </div>
          </div>

          {/* HUD 신분증 카드 */}
          <div data-intro-fade className="hidden md:col-span-5 md:flex md:justify-end">
            <div className="glass hud relative w-64 rounded-2xl p-5">
              <p className="font-display font-semibold tracking-[0.12em]">{profile.nameEn}</p>
              <p className="mt-1 text-sm text-muted">{profile.role}</p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wider text-subtle uppercase">
                Gwangju Software
                <br />
                Meister High School
              </p>
            </div>
          </div>
        </div>

        <dl
          data-intro-fade
          className="glass mt-10 grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl px-6 py-5 md:mt-12 md:grid-cols-4 md:px-8"
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className={f.accent ? "text-glow mt-2 text-lg font-bold md:text-xl" : "mt-2 text-lg font-bold md:text-xl"}>
                {f.value}
              </dd>
              <dd className="mt-0.5 text-sm text-muted">{f.sub}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div data-intro-fade className="relative">
        <Marquee
          items={profile.marquee}
          className="border-y border-line bg-bg/30 py-4 font-wide text-2xl text-subtle backdrop-blur-sm md:py-5 md:text-4xl"
        />
      </div>

      <div className="container-page relative flex justify-center py-5">
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
