import { cn } from "@/lib/cn";

/** 4각 반짝이 별. tone: lime(포인트) · ice(보조) */
export function Sparkle({ className, tone = "lime" }: { className?: string; tone?: "lime" | "ice" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn(
        "pointer-events-none",
        tone === "lime"
          ? "text-accent drop-shadow-[0_0_8px_rgb(198_244_50/0.8)]"
          : "text-[#e6eeff] drop-shadow-[0_0_6px_rgb(143_180_255/0.9)]",
        className,
      )}
    >
      <path d="M12 0c.8 6.4 4.6 10.6 12 12-7.4 1.4-11.2 5.6-12 12-.8-6.4-4.6-10.6-12-12 7.4-1.4 11.2-5.6 12-12Z" fill="currentColor" />
    </svg>
  );
}
