"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { projects, type Project } from "@/data/portfolio";

const accentStyles: Record<
  Project["accent"],
  {
    dot: string;
    badge: string;
    title: string;
    cardHover: string;
    linkHover: string;
  }
> = {
  yellow: {
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    title: "text-amber-600 dark:text-amber-400",
    cardHover:
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100 hover:ring-amber-200 dark:hover:shadow-amber-500/10 dark:hover:ring-amber-500/40",
    linkHover: "hover:text-amber-600 hover:decoration-amber-400",
  },
  purple: {
    dot: "bg-indigo-400",
    badge:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    title: "text-indigo-600 dark:text-indigo-400",
    cardHover:
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100 hover:ring-indigo-200 dark:hover:shadow-indigo-500/10 dark:hover:ring-indigo-500/40",
    linkHover: "hover:text-indigo-600 hover:decoration-indigo-400",
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = accentStyles[project.accent];

  return (
    <Reveal delay={index * 0.08} className="relative pl-14 sm:pl-20">
      <span
        className={`absolute left-[1.15rem] top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-white sm:left-[2.15rem] dark:ring-zinc-950 ${accent.dot}`}
      />

      <div
        className={`rounded-3xl bg-white p-6 shadow-sm shadow-zinc-100 ring-1 ring-zinc-100 transition-all duration-300 sm:p-8 dark:bg-zinc-900 dark:shadow-none dark:ring-zinc-800 ${accent.cardHover}`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {project.title}
          </h3>
          <span className="text-zinc-300 dark:text-zinc-600">—</span>
          <span className="text-lg text-zinc-600 dark:text-zinc-400">
            {project.subtitle}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-md px-2 py-1 font-mono ${accent.badge}`}>
            {project.org}
          </span>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-colors dark:text-zinc-400 dark:decoration-zinc-600 ${accent.linkHover}`}
          >
            GitHub
          </a>
        </div>

        <p className="mt-5 leading-relaxed text-zinc-700 dark:text-zinc-300">
          {project.description}
        </p>

        {project.team && (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
            개발 인원: {project.team}
          </p>
        )}

        <div className="mt-6 space-y-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          {project.roles.map((role) => (
            <div key={role.label}>
              <h4
                className={`text-sm font-semibold ${accent.title}`}
              >
                {role.label}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {role.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.3,
  });

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-amber-600 dark:text-amber-400">
            WORK
          </span>
          <h2 className="mt-3 font-serif text-4xl italic text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Projects
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-14 space-y-10">
          <div className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-zinc-100 sm:left-[2.15rem] dark:bg-zinc-800" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[1.15rem] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-amber-400 via-amber-300 to-indigo-300 sm:left-[2.15rem]"
          />

          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
