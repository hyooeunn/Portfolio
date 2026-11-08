"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { ButtonLink } from "@/components/ui/Button";
import { Download, GitHub } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { transition } from "@/lib/motion";
import { sections } from "@/lib/site";

/**
 * 상단 고정 네비게이션.
 * 이력서 · GitHub는 어느 화면에서든 한 번에 누를 수 있도록 항상 노출한다.
 */
export function Header() {
  const pathname = usePathname();
  const scrollTo = useScrollTo();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 메뉴가 열려 있을 때 Esc로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false);
    if (!isHome) return; // 상세 페이지에서는 "/#id"로 이동
    e.preventDefault();
    scrollTo(`#${id}`, { offset: -72 });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)]",
        scrolled || open ? "bg-bg/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        본문으로 건너뛰기
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-sm font-semibold tracking-[0.18em]" aria-label="홈으로">
          {profile.nameEn}
        </Link>

        <nav aria-label="섹션" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={isHome ? `#${s.id}` : `/#${s.id}`}
                  onClick={(e) => onSectionClick(e, s.id)}
                  className="text-sm text-muted transition-colors duration-[var(--duration-fast)] hover:text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <ButtonLink href={profile.contact.github} external icon={<GitHub />} aria-label="GitHub (새 창)">
              GitHub
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href={profile.resume} download variant="primary" icon={<Download />}>
              이력서
            </ButtonLink>
          </Magnetic>
          <button
            type="button"
            className="ml-1 grid size-10 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-fg transition-transform duration-[var(--duration-fast)]",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-fg transition-transform duration-[var(--duration-fast)]",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="섹션"
            className="container-page border-t border-line pb-8 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={transition.fast}
          >
            <ul className="flex flex-col pt-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={isHome ? `#${s.id}` : `/#${s.id}`}
                    onClick={(e) => onSectionClick(e, s.id)}
                    className="block py-3 font-display text-3xl font-semibold tracking-tight"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 sm:hidden">
                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="text-muted">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
