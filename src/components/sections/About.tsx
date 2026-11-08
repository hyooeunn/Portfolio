"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/content/profile";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";

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
      className="container-page py-28 md:py-44"
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="01" label="About" className="md:sticky md:top-28" />
        </div>

        <div className="md:col-span-9">
          <h2 id="about-title" className="text-title font-semibold">
            추측 대신 <span className="text-accent">근거</span>로,
            <br />
            코드보다 <span className="text-accent">구조</span>를 먼저.
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
                      "about-word inline " + (ACCENT_WORDS.some((w) => word.includes(w)) ? "text-accent" : "")
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <ol className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
            {profile.keywords.map((k, i) => (
              <Reveal key={k.title} as="li" delay={i * 0.08} className="border-t border-line pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <span className="eyebrow">{k.en}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{k.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{k.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-20 grid gap-2 border-y border-line py-6 md:grid-cols-12 md:items-baseline">
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
