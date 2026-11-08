import { Fragment } from "react";

/** 문장 안의 특정 단어들을 포인트 컬러로 강조한다. */
export function Highlight({ text, words, className = "text-accent" }: { text: string; words: string[]; className?: string }) {
  if (!words.length) return <>{text}</>;
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        words.includes(part) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
