import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sections } from "@/lib/site";

const pending = ["activities", "contact"];

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />

      {/* 5단계에서 실제 섹션으로 교체 */}
      {sections
        .filter((s) => pending.includes(s.id))
        .map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="container-page flex min-h-dvh flex-col justify-center border-t border-line"
          >
            <SectionLabel index={`0${i + 4}`} label={s.label} />
            <h2 id={`${s.id}-title`} className="mt-6 font-display text-headline font-bold">
              {s.label}
            </h2>
            <p className="mt-6 text-muted">다음 단계에서 구현됩니다.</p>
          </section>
        ))}
    </main>
  );
}
