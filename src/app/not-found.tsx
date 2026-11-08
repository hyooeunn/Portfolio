import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-dvh flex-col items-start justify-center gap-6 pt-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon.svg" alt="" width={120} height={90} />
      <p className="eyebrow">404</p>
      <h1 className="font-display text-headline font-bold">
        여기엔 바나나가
        <br />
        <span className="text-accent">없어요.</span>
      </h1>
      <p className="text-muted">찾는 페이지가 없거나 주소가 바뀌었어요.</p>
      <Link
        href="/"
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors duration-[var(--duration-fast)] hover:bg-fg"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
