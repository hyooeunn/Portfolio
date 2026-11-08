"use client";

import { useScrollTo } from "@/components/providers/SmoothScroll";
import { profile } from "@/content/profile";

export function Footer() {
  const scrollTo = useScrollTo();
  return (
    <footer className="container-page flex flex-col gap-4 py-10 text-sm text-subtle md:flex-row md:items-center md:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name} ({profile.nameEn}). Built with Next.js, GSAP & Framer Motion.
      </p>
      <button
        type="button"
        onClick={() => scrollTo(0)}
        className="self-start font-mono text-xs tracking-[0.16em] uppercase transition-colors duration-[var(--duration-fast)] hover:text-fg md:self-auto"
      >
        Back to top ↑
      </button>
    </footer>
  );
}
