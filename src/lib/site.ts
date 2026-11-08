import { profile } from "@/content/profile";

/** 배포 주소. Vercel 환경변수 NEXT_PUBLIC_SITE_URL로 덮어쓸 수 있다. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.headline} GIF, Signal 등 프로젝트로 보는 Front-End 개발자 ${profile.name}의 포트폴리오.`,
};

/** 상단 네비게이션 · 섹션 id */
export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "activities", label: "Activities" },
  { id: "contact", label: "Contact" },
] as const;
