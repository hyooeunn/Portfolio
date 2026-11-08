import { cn } from "@/lib/cn";

/** 섹션 번호 + 이름. 모든 섹션 상단에서 같은 모양으로 위치를 알려준다. */
export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span className="text-accent">{index}</span>
      <span aria-hidden className="h-px w-8 bg-line" />
      <span>{label}</span>
    </p>
  );
}
