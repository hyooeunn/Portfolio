import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sections } from "@/lib/site";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />

      {/* 3~5단계에서 실제 섹션으로 교체 */}
      {sections
        .filter((s) => s.id !== "about")
        .map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="container-page flex min-h-dvh flex-col justify-center border-t border-line"
          >
            <SectionLabel index={`0${i + 2}`} label={s.label} />
            <h2 id={`${s.id}-title`} className="mt-6 font-display text-headline font-bold">
              {s.label}
            </h2>
            <p className="mt-6 text-muted">다음 단계에서 구현됩니다.</p>
          </section>
        ))}
    </main>
  );
}
