"use client";

import { useRef, useState } from "react";
import { AdventureMonkey } from "@/components/mascot/AdventureMonkey";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight, Download, GitHub, Mail } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { duration, stagger } from "@/lib/motion";

const HEADLINE = ["다음 프로젝트에서", "함께 구조를 그려요."];

/**
 * Contact — 마지막 CTA
 * - 큰 문장이 한 줄씩 아래에서 올라온다 (사이트의 마지막 장면)
 * - 이메일은 크게, 누르면 메일 앱 · 옆 버튼으로 복사
 * - Hero 마퀴를 반대 방향으로 한 번 더 보여주며 끝맺는다
 */
export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { contact } = profile;

  useGsap(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.from(".cta-line", {
          yPercent: 110,
          duration: duration.slow,
          stagger: stagger.base * 2,
          scrollTrigger: { trigger: ".cta-headline", start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    [],
    rootRef,
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const methods = [
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replaceAll("-", "")}` },
    { label: "GitHub", value: contact.github.replace("https://", ""), href: contact.github, external: true },
    ...(contact.linkedin
      ? [{ label: "LinkedIn", value: "LinkedIn", href: contact.linkedin, external: true }]
      : []),
  ];

  return (
    <section ref={rootRef} id="contact" aria-labelledby="contact-title" className="overflow-x-clip pt-28 md:pt-40">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="05" label="Contact" />
            <h2 id="contact-title" className="cta-headline mt-8 font-display text-headline font-bold">
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span className={i === 1 ? "cta-line block text-accent" : "cta-line block"}>{line}</span>
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">
              신입 Front-End 개발자로 함께할 팀을 찾고 있어요. 편하게 연락 주세요.
            </p>
          </div>
          <div className="flex justify-end lg:col-span-4">
            <AdventureMonkey className="w-40 md:w-52" />
          </div>
        </div>

        {/* 이메일 */}
        <div className="mt-16 flex flex-col gap-4 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
          <a
            href={`mailto:${contact.email}`}
            data-cursor="Mail"
            className="group/mail inline-flex items-center gap-4 text-[clamp(1.75rem,5vw,4rem)] font-semibold tracking-tight break-all"
          >
            {contact.email}
            <ArrowUpRight className="size-[0.6em] shrink-0 text-accent transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1" />
          </a>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors duration-[var(--duration-fast)] hover:bg-fg"
              >
                <Mail />
                <span aria-live="polite">{copied ? "복사했어요!" : "이메일 복사"}</span>
              </button>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={profile.resume} download icon={<Download />}>
                이력서
              </ButtonLink>
            </Magnetic>
          </div>
        </div>

        {/* 그 밖의 연락 방법 */}
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <li key={m.label} className="bg-bg">
              <a
                href={m.href}
                {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group/link flex items-center justify-between gap-4 p-6 transition-colors duration-[var(--duration-fast)] hover:bg-surface"
              >
                <span>
                  <span className="eyebrow block">{m.label}</span>
                  <span className="mt-2 block text-lg font-medium">{m.value}</span>
                </span>
                {m.label === "GitHub" ? <GitHub className="size-5 text-muted" /> : <ArrowUpRight className="text-muted" />}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Marquee
        reverse
        items={["Thanks for visiting", profile.name, profile.role, "Let's build together", profile.contact.email]}
        className="mt-24 border-y border-line py-5 font-display text-2xl font-semibold text-subtle md:mt-32 md:text-4xl"
      />
    </section>
  );
}
