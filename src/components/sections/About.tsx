"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/space/Parallax";
import { SpaceAsset } from "@/components/space/SpaceAsset";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { space } from "@/content/assets";
import { profile } from "@/content/profile";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";

/** 키워드 카드 아이콘: 구조 → 큐브, 근거 → 레이더, 기준 → 크리스털 별 */
const KEYWORD_ART = [space.cube, space.radar, space.starCrystal];

/** 소개글에서 포인트 컬러로 채워질 단어 */
const ACCENT_WORDS = ["구조", "근거", "기준"];

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGsap(
    () => {
      const mm = gsap.matchMedia();

      // 스크롤한 만큼 단어가 차례로 채워진다 → 읽는 속도와 스크롤이 맞물린다
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(
          ".about-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    [],
    rootRef,
  );

  return (
    <section
      ref={rootRef}
      id="about"
      aria-labelledby="about-title"
      className="container-page relative py-28 md:py-44"
    >
      <Parallax speed={0.5} className="pointer-events-none absolute top-24 right-0 hidden w-36 opacity-70 lg:block">
        <SpaceAsset src={space.asteroid} float={11} width={144} />
      </Parallax>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-28">
            <SectionLabel index="01" label="About" />
            {/* 소개글을 가리키는 원숭이 */}
            <SpaceAsset
              src={space.monkey.point}
              alt=""
              float={6}
              width={180}
              className="mt-10 hidden w-36 md:block lg:w-44"
            />
          </div>
        </div>

        <div className="md:col-span-9">
          <p className="font-wide text-[clamp(2rem,4.5vw,3.75rem)] leading-none">
            Structure before <span className="text-glow">code.</span>
          </p>
          <h2 id="about-title" className="mt-5 text-title font-semibold">
            추측 대신 <span className="text-glow">근거</span>로, 코드보다 <span className="text-glow">구조</span>를 먼저.
          </h2>

          <p
            ref={textRef}
            className="mt-12 text-[clamp(1.375rem,2.9vw,2.5rem)] leading-[1.45] font-medium tracking-[-0.02em] md:mt-16"
          >
            {profile.intro.map((sentence, si) => (
              <span key={si}>
                {sentence.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className={
                      "about-word inline " + (ACCENT_WORDS.some((w) => word.includes(w)) ? "text-glow" : "")
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <ol className="relative mt-20 grid gap-5 md:mt-28 md:grid-cols-3">
            {/* 카드를 잇는 회로선 */}
            <span aria-hidden className="absolute top-1/2 right-8 left-8 hidden h-px bg-linear-to-r from-accent/0 via-accent/50 to-accent/0 md:block" />
            {profile.keywords.map((k, i) => (
              <Reveal key={k.title} as="li" delay={i * 0.08} className="glass hud relative rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <span className="font-wide text-3xl text-accent">0{i + 1}</span>
                  <SpaceAsset src={KEYWORD_ART[i]} width={72} className="-mt-2 -mr-2 w-16" />
                </div>
                <p className="eyebrow mt-6">{k.en}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{k.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{k.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="glass mt-8 grid gap-2 rounded-2xl px-6 py-5 md:grid-cols-12 md:items-baseline">
            <p className="eyebrow md:col-span-3">Education</p>
            <p className="text-lg font-semibold md:col-span-6">
              {profile.education.school}
              <span className="ml-2 font-normal text-muted">{profile.education.major}</span>
            </p>
            <p className="font-mono text-sm text-muted md:col-span-3 md:text-right">{profile.education.period}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
