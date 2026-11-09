import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium " +
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink shadow-[0_0_24px_rgb(198_244_50/0.35)] hover:bg-fg hover:shadow-[0_0_24px_rgb(238_242_255/0.3)]",
  ghost: "glass text-fg hover:border-line-strong",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/** 링크 버튼. 외부 링크와 파일 다운로드는 <a>, 내부 이동은 next/link. */
export function ButtonLink({
  href,
  variant = "ghost",
  icon,
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden
          className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  const isFile = rest.download !== undefined;
  if (external || isFile || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
