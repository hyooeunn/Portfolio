import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMeta, teamLabel } from "@/components/projects/ProjectCards";
import { ArrowUpRight } from "@/components/ui/icons";
import { getProject, projects, teamSize } from "@/content/projects";
import { profile } from "@/content/profile";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.subtitle} — ${project.oneLiner}. ${profile.name}: ${project.myRole}`;
  return {
    title: project.title,
    description,
    openGraph: { title: `${project.title} — ${profile.name}`, description, url: `/projects/${slug}` },
  };
}

/** 상세 페이지의 한 블록: 왼쪽 라벨 + 오른쪽 내용 */
function Block({ label, title, children }: { label: string; title?: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
      <h2 className="eyebrow md:col-span-3">{label}</h2>
      <div className="md:col-span-9">
        {title ? <p className="mb-6 text-title font-semibold">{title}</p> : null}
        {children}
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const ts = project.troubleshooting;
  // 트러블슈팅의 '배운 점'과 같은 문장은 한 번만 보여준다
  const learned = (project.learned ?? []).filter((l) => l !== ts?.learned);

  const info = [
    { label: "기간", value: project.ongoing ? `${project.period} 진행 중` : project.period },
    {
      label: `팀 구성 · ${teamSize(project.team)}명`,
      value: `${project.teamName ? `${project.teamName} · ` : ""}${teamLabel(project)}`,
    },
    { label: "내 역할", value: project.myRole, accent: true },
    ...(project.stack.length ? [{ label: "사용 기술", value: project.stack.join(", ") }] : []),
  ];

  return (
    <main id="main" className="container-page pt-28 pb-24 md:pt-36">
      <Link
        href="/#projects"
        className="eyebrow inline-flex items-center gap-2 transition-colors duration-[var(--duration-fast)] hover:text-fg"
      >
        ← 프로젝트 목록
      </Link>

      {/* 요약 */}
      <header className="mt-10">
        <ProjectMeta project={project} />
        <h1 className="mt-6 font-display text-display font-bold">{project.title}</h1>
        <p className="mt-4 text-title text-muted">{project.subtitle}</p>
        <p className="mt-8 max-w-3xl text-xl font-semibold md:text-2xl">{project.oneLiner}</p>

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {info.map((item) => (
            <div key={item.label}>
              <dt className={item.accent ? "eyebrow text-accent" : "eyebrow"}>{item.label}</dt>
              <dd className="mt-2 leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </dl>

        {project.links.length ? (
          <ul className="mt-8 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-fg"
                >
                  {l.label}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-24 flex flex-col gap-20 md:mt-32 md:gap-28">
        {/* 문제 정의 → 무엇을 만들었나 */}
        <Block label="Overview">
          <div className="grid gap-8 md:grid-cols-2">
            {project.problem ? (
              <div>
                <p className="eyebrow">문제 정의</p>
                <p className="mt-3 text-lg leading-relaxed">{project.problem}</p>
              </div>
            ) : null}
            <div>
              <p className="eyebrow">{project.problem ? "그래서 만든 것" : "개요"}</p>
              <p className="mt-3 text-lg leading-relaxed">{project.overview}</p>
            </div>
          </div>
          {project.impact?.length ? (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.impact.map((i) => (
                <li key={i} className="rounded-2xl border border-line p-5 text-lg font-semibold">
                  {i}
                </li>
              ))}
            </ul>
          ) : null}
        </Block>

        {/* 내가 한 일 — 팀 작업과 구분 */}
        <Block label="My Work" title="팀에서 제가 직접 맡은 부분이에요.">
          <div className="grid gap-4 md:grid-cols-2">
            {project.contributions.map((c, i) => (
              <div key={c.area} className="rounded-2xl border border-line bg-surface p-6">
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold">{c.area}</span>
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-fg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        {/* 화면 */}
        {project.screens?.length ? (
          <Block label="Screens">
            <ul className="grid gap-4 md:grid-cols-2">
              {project.screens.map((s) => (
                <li key={s.title} className="rounded-2xl border border-line p-6">
                  {/* TODO: 스크린샷 이미지가 생기면 next/image로 표시 */}
                  <p className="text-lg font-semibold">{s.title}</p>
                  <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {/* 트러블슈팅 */}
        {ts ? (
          <Block label="Troubleshooting" title={ts.title}>
            <p className="eyebrow">{ts.area}</p>
            <p className="mt-3 text-lg text-muted">{ts.summary}</p>

            <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
              {[
                { label: "문제", text: ts.problem },
                { label: "원인", text: ts.cause },
                { label: "해결", text: ts.solution },
                { label: "결과", text: ts.result },
              ].map((step, i) => (
                <li key={step.label} className="bg-bg p-6">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{step.label}</span>
                  </p>
                  <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {ts.steps.map((s, i) => (
                <div key={s.title} className="rounded-2xl bg-surface p-6">
                  <p className="font-mono text-xs text-subtle">
                    {String(i + 1).padStart(2, "0")} · {s.title}
                  </p>
                  <p className="mt-3 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>

            {ts.codeCaption ? (
              <p className="mt-6 font-mono text-xs text-subtle">
                {/* TODO: 코드 캡처 이미지 */}
                {ts.codeCaption}
              </p>
            ) : null}

            <p className="mt-10 rounded-2xl border border-accent/40 p-6 text-lg leading-relaxed">
              <span className="eyebrow mb-2 block text-accent">Learned</span>
              {ts.learned}
            </p>
          </Block>
        ) : null}

        {/* 결과 · 배운 점 */}
        {project.results?.length || learned.length ? (
          <Block label="Result">
            <div className="grid gap-8 md:grid-cols-2">
              {project.results?.length ? (
                <div>
                  <p className="eyebrow">결과</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {project.results.map((r) => (
                      <li key={r} className="text-lg font-semibold">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {learned.length ? (
                <div>
                  <p className="eyebrow">배운 점</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {learned.map((l) => (
                      <li key={l} className="text-lg leading-relaxed">
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Block>
        ) : null}
      </div>

      {/* 다음 프로젝트 */}
      <nav aria-label="다음 프로젝트" className="mt-32 border-t border-line pt-10">
        <Link href={`/projects/${next.slug}`} data-cursor="Next" className="group/next block">
          <p className="eyebrow">Next Project</p>
          <p className="mt-4 flex items-center gap-4 font-display text-headline font-bold transition-colors duration-[var(--duration-fast)] group-hover/next:text-accent">
            {next.title}
            <ArrowUpRight className="size-[0.6em] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/next:translate-x-2 group-hover/next:-translate-y-2" />
          </p>
          <p className="mt-2 text-muted">{next.subtitle}</p>
        </Link>
      </nav>
    </main>
  );
}
