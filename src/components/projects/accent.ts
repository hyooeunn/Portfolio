import type { Project } from "@/data/portfolio";

export const accentStyles: Record<
  Project["accent"],
  {
    dot: string;
    badge: string;
    title: string;
    cardHover: string;
    linkHover: string;
  }
> = {
  yellow: {
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    title: "text-amber-600 dark:text-amber-400",
    cardHover:
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100 hover:ring-amber-200 dark:hover:shadow-amber-500/10 dark:hover:ring-amber-500/40",
    linkHover: "hover:text-amber-600 hover:decoration-amber-400",
  },
  purple: {
    dot: "bg-indigo-400",
    badge:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    title: "text-indigo-600 dark:text-indigo-400",
    cardHover:
      "hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100 hover:ring-indigo-200 dark:hover:shadow-indigo-500/10 dark:hover:ring-indigo-500/40",
    linkHover: "hover:text-indigo-600 hover:decoration-indigo-400",
  },
};
