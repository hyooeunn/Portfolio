"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { BadgeMonkey } from "@/components/mascot/BadgeMonkey";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { type ActivityKind, activities, activityKindLabel } from "@/content/activities";
import { useGsap } from "@/hooks/useGsap";
import { MEDIA } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { transition } from "@/lib/motion";

type Filter = "all" | "award" | "hackathon" | "event" | "credential";

const FILTERS: { id: Filter; label: string; kinds: ActivityKind[] }[] = [
  { id: "all", label: "전체", kinds: ["award", "hackathon", "event", "certificate", "education"] },
  { id: "award", label: "수상", kinds: ["award"] },
  { id: "hackathon", label: "해커톤", kinds: ["hackathon"] },
  { id: "event", label: "행사 · 교류", kinds: ["event"] },
  { id: "credential", label: "자격증 · 학력", kinds: ["certificate", "education"] },
];

const awardCount = activities.filter((a) => a.award).length;
const hackathonCount = activities.filter((a) => a.title.includes("해커톤")).length;
const SUMMARY = `수상 ${awardCount}회 · 해커톤 ${hackathonCount}회 참가, 그리고 밖에서 배운 것들.`;

/**
 * Activities — 수상 · 해커톤 · 행사 · 자격증 · 학력 타임라인
 * - 스크롤로 항목을 지날 때마다 점이 켜지고, 원숭이가 배지를 하나씩 모은다 (진행 상황 표시)
 * - 필터로 종류별로 좁혀 볼 수 있다
 */
export function Activities() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [count, setCount] = useState(0);

  const list = useMemo(() => {
    const kinds = FILTERS.find((f) => f.id === filter)!.kinds;
    return activities.filter((a) => kinds.includes(a.kind));
  }, [filter]);

  useGsap(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".tl-item");
      const triggers: ScrollTrigger[] = [];
      const recount = () => setCount(triggers.filter((t) => t.isActive).length);
      items.forEach((item) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: item,
            start: "top 65%",
            end: "max",
            toggleClass: "is-on",
            onToggle: recount,
          }),
        );
      });
      const raf = requestAnimationFrame(recount);

      // 타임라인 선이 스크롤만큼 채워진다
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(
          ".tl-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".tl-list", start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );
      });

      return () => {
        cancelAnimationFrame(raf);
        mm.revert();
      };
    },
    [filter],
    rootRef,
  );

  return (
    <section ref={rootRef} id="activities" aria-labelledby="activities-title" className="container-page py-28 md:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* 왼쪽: 요약 · 원숭이 · 필터 (데스크톱에서 고정) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="04" label="Activities" />
            <h2 id="activities-title" className="mt-6 text-title font-semibold">
              {SUMMARY}
            </h2>

            <div className="mt-8 flex items-end gap-5">
              <BadgeMonkey count={count} className="w-32 shrink-0 md:w-40" />
              <p className="pb-3" aria-live="polite">
                <span className="eyebrow block">모은 경험 배지</span>
                <span className="font-display text-5xl font-bold tabular-nums">
                  <span className="text-accent">{count}</span>
                  <span className="text-subtle">/{list.length}</span>
                </span>
              </p>
            </div>

            <div role="tablist" aria-label="활동 종류" className="mt-8 -mx-1 flex flex-wrap gap-2 px-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  aria-controls="activities-list"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-[var(--duration-fast)]",
                    filter === f.id ? "bg-accent text-accent-ink" : "border border-line text-muted hover:text-fg",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 타임라인 */}
        <div className="lg:col-span-8">
          <motion.ol
            key={filter}
            id="activities-list"
            role="tabpanel"
            className="tl-list relative flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition.fast}
          >
            {/* 세로선 */}
            <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
            <span aria-hidden className="tl-fill absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent" />

            {list.map((a) => (
              <li key={a.id} className="tl-item group/item relative pb-12 pl-10 last:pb-0">
                <span
                  aria-hidden
                  className="tl-dot absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-line bg-bg transition-colors duration-[var(--duration-fast)]"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <time className="font-mono text-sm text-muted" dateTime={a.date?.replace(".", "-")}>
                    {a.date ?? "—"}
                  </time>
                  <span className="eyebrow">{activityKindLabel[a.kind]}</span>
                  {a.award ? (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] tracking-wider text-accent-ink">
                      {a.award}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{a.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{a.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                  {a.project ? (
                    <Link
                      href={`/projects/${a.project}`}
                      className="ml-1 text-sm font-medium text-fg underline-offset-4 hover:underline"
                    >
                      프로젝트 보기 →
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
