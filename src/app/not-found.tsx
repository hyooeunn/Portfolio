import Link from "next/link";
import { SpaceAsset } from "@/components/space/SpaceAsset";
import { space } from "@/content/assets";

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-dvh flex-col items-start justify-center gap-6 pt-16">
      <SpaceAsset src={space.monkey.float2} width={240} float={6} priority className="w-44 md:w-60" />
      <p className="eyebrow">404</p>
      <h1 className="font-wide text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">
        Lost in <span className="text-glow">space.</span>
      </h1>
      <p className="text-muted">찾는 페이지가 없거나 주소가 바뀌었어요.</p>
      <Link
        href="/"
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink shadow-[0_0_24px_rgb(198_244_50/0.35)] transition-colors duration-[var(--duration-fast)] hover:bg-fg"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
