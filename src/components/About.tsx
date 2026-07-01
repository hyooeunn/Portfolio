import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-amber-600 dark:text-amber-400">
            ABOUT
          </span>
          <h2 className="mt-3 font-serif text-4xl italic text-zinc-900 sm:text-5xl dark:text-zinc-50">
            About Me
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr] md:items-start">
          <Reveal delay={0.1}>
            <div className="mx-auto h-44 w-44 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-white ring-8 ring-amber-50 md:mx-0 dark:from-amber-500/30 dark:via-zinc-900 dark:to-zinc-900 dark:ring-zinc-900">
              <Image
                src="/profile.png"
                alt={profile.name}
                width={176}
                height={176}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.15}>
              <div className="space-y-4 text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
                {profile.about.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h3 className="font-serif text-xl italic text-amber-600 dark:text-amber-400">
                  Skills
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800 transition-transform hover:-translate-y-0.5 hover:bg-amber-200 dark:bg-zinc-800 dark:text-amber-300 dark:hover:bg-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
