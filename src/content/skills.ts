/** 기술 스택. 출처: PDF '기술 스택' + 프로젝트별 STACK */

export type SkillCategory = {
  id: string;
  title: string;
  caption: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    caption: "주로 TypeScript로 개발하고, 하드웨어 제어에는 Python을 씁니다.",
    items: ["TypeScript", "Python", "C", "HTML", "CSS"],
  },
  {
    id: "web",
    title: "Web",
    caption: "Next.js 기반으로 화면과 상태 흐름을 설계합니다.",
    items: ["React", "Next.js", "Tailwind CSS", "Zustand"],
  },
  {
    id: "libraries",
    title: "In Projects",
    caption: "GIF와 Signal에서 서버 상태와 모노레포를 다뤘습니다.",
    items: ["TanStack Query", "Axios", "Turborepo"],
  },
  {
    id: "tools",
    title: "Tools & Environment",
    caption: "협업 도구부터 라즈베리파이·아두이노 하드웨어까지 다룹니다.",
    items: ["Git", "GitHub", "VSCode", "Figma", "Notion", "Claude", "Raspberry Pi", "Arduino"],
  },
];
