import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,theme(colors.amber.100),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,theme(colors.amber.900/0.25),transparent)]"
      />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-amber-600 dark:text-amber-400">
            CONTACT
          </span>
          <h2 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            {profile.englishName}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-md space-y-3 border-l-2 border-amber-400 pl-6 text-left dark:border-amber-500/60">
            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Email
              </span>
              {": "}
              <a
                href={`mailto:${profile.contact.email}`}
                className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                {profile.contact.email}
              </a>
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Phone
              </span>
              {": "}
              {profile.contact.phone}
            </p>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-amber-600 hover:decoration-amber-400 dark:text-zinc-300 dark:decoration-zinc-600"
            >
              {profile.contact.github.replace("https://", "")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-16 text-xs text-zinc-400 dark:text-zinc-600">
            {profile.name} | {profile.role}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
