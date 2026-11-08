import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "LEE HYOEUN — Front-End Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * 링크 공유 미리보기 이미지.
 * 기본 폰트에 한글이 없어 영문으로만 구성하고, 마스코트 얼굴(icon.svg)을 함께 넣는다.
 */
export default async function OpengraphImage() {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"));
  const monkey = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#f2f1ec",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#9a9a9f" }}>PORTFOLIO</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={monkey} width={196} height={148} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>LEE HYOEUN</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 28, fontSize: 40 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#c6f432", marginRight: 18 }} />
            Front-End Developer
          </div>
        </div>
      </div>
    ),
    size,
  );
}
