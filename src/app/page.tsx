import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { Mail } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { sections } from "@/lib/site";

/**
 * 1단계 확인용 뼈대.
 * 각 섹션은 2~5단계에서 실제 컴포넌트로 교체된다.
 */
export default function Home() {
  return (
    <main id="main">
      <section className="container-page flex min-h-dvh flex-col justify-center gap-8 pt-16">
        <p className="eyebrow">{profile.role}</p>
        <h1 className="font-display text-display font-bold">{profile.nameEn}</h1>
        <p className="max-w-2xl text-title text-muted">{profile.headline}</p>
        <div>
          <Magnetic>
            <ButtonLink href={`mailto:${profile.contact.email}`} icon={<Mail />} data-cursor="Mail">
              {profile.contact.email}
            </ButtonLink>
          </Magnetic>
        </div>
      </section>

      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="container-page flex min-h-dvh flex-col justify-center border-t border-line"
        >
          <p className="eyebrow">0{i + 1}</p>
          <h2 id={`${s.id}-title`} className="mt-4 font-display text-headline font-bold">
            {s.label}
          </h2>
          <p className="mt-6 text-muted">이 섹션은 다음 단계에서 구현됩니다.</p>
        </section>
      ))}
    </main>
  );
}
