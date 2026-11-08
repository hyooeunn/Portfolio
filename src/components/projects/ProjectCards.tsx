import Link from "next/link";
import type { Project } from "@/content/projects";
import { teamSize } from "@/content/projects";
import { SpaceAsset } from "@/components/space/SpaceAsset";
import { ArrowUpRight } from "@/components/ui/icons";
import { projectArt } from "@/content/assets";
import { cn } from "@/lib/cn";

export function teamLabel(p: Project) {
  return p.team.map((m) => `${m.role} ${m.count}`).join(" · ");
}

function Badge({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] tracking-wider uppercase",
        accent ? "bg-accent text-accent-ink shadow-[0_0_16px_rgb(198_244_50/0.35)]" : "border border-line bg-white/[0.03] text-muted",
      )}
    >
      {children}
    </span>
  );
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>{project.period}</Badge>
      {project.ongoing ? <Badge>진행 중</Badge> : null}
      {project.award ? <Badge accent>{project.award}</Badge> : null}
    </div>
  );
}

/** 대표 프로젝트 카드 — 요약(문제 · 내 역할 · 성과)을 먼저, 트러블슈팅은 미리보기로 */
export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const contributions = project.contributions.flatMap((c) => c.items).slice(0, 3);

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="View"
      className="group/card hud relative block overflow-hidden rounded-3xl border border-line bg-[linear-gradient(160deg,#141d36,#0a1020)] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_30px_80px_-30px_rgb(0_0_0/0.8)] transition-colors duration-[var(--duration-fast)] hover:border-line-strong md:p-10"
    >
      {/* 프로젝트 장식 에셋 */}
      <div aria-hidden className="pointer-events-none absolute -top-6 right-6 hidden w-44 opacity-90 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover/card:-translate-y-2 group-hover/card:rotate-3 lg:block xl:w-52">
        {projectArt[project.slug] ? <SpaceAsset src={projectArt[project.slug]} width={208} float={9} /> : null}
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-4 lg:pr-56">
        <span className="font-wide text-2xl text-accent">{String(index + 1).padStart(2, "0")}</span>
        <ProjectMeta project={project} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="font-wide text-[clamp(2.5rem,6vw,5rem)] leading-none">{project.title}</h3>
          <p className="mt-3 text-lg text-muted">{project.subtitle}</p>
          <p className="mt-6 text-xl font-semibold md:text-2xl">{project.oneLiner}</p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-accent">My Role</dt>
              <dd className="mt-2 font-medium">{project.myRole}</dd>
            </div>
            <div>
              <dt className="eyebrow">Team · {teamSize(project.team)}명</dt>
              <dd className="mt-2 text-muted">
                {project.teamName ? `${project.teamName} · ` : ""}
                {teamLabel(project)}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <p className="eyebrow">내가 한 일</p>
            <ul className="mt-3 flex flex-col gap-2">
              {contributions.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed md:text-base">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {project.stack.length ? (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="사용 기술">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {project.impact?.length ? (
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-5">
              <p className="eyebrow text-accent">Impact</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {project.impact.map((i) => (
                  <li key={i} className="font-semibold">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.troubleshooting ? (
            <div className="flex flex-1 flex-col rounded-2xl border border-line bg-bg/40 p-5 md:p-6">
              <p className="eyebrow">Troubleshooting</p>
              <p className="mt-4 text-lg font-semibold">{project.troubleshooting.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.troubleshooting.summary}</p>
              <p className="mt-4 rounded-xl border border-line p-4 text-sm leading-relaxed">
                <span className="text-accent">배운 점 · </span>
                {project.troubleshooting.learned}
              </p>
            </div>
          ) : null}

          <span className="mt-auto inline-flex items-center gap-2 self-start font-medium text-fg">
            자세히 보기
            <ArrowUpRight className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** 기타 프로젝트 카드 — 한 줄 요약 + 내 역할 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="View"
      className="group/card glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-[var(--duration-fast)] hover:border-line-strong"
    >
      <div aria-hidden className="pointer-events-none absolute -top-4 -right-4 w-28 opacity-80 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover/card:-translate-y-1 group-hover/card:rotate-6">
        {projectArt[project.slug] ? <SpaceAsset src={projectArt[project.slug]} width={112} /> : null}
      </div>
      <div className="relative pr-20">
        <ProjectMeta project={project} />
      </div>
      <h3 className="mt-6 font-wide text-3xl">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      <p className="mt-5 leading-relaxed">{project.oneLiner}</p>

      <dl className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-sm">
        <div>
          <dt className="eyebrow text-accent">My Role</dt>
          <dd className="mt-1 font-medium">{project.myRole}</dd>
        </div>
        <div>
          <dt className="eyebrow">Team · {teamSize(project.team)}명</dt>
          <dd className="mt-1 text-muted">{teamLabel(project)}</dd>
        </div>
      </dl>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
        자세히 보기
        <ArrowUpRight className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
      </span>
    </Link>
  );
}
