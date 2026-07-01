"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/portfolio";

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
