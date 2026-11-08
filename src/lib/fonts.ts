import { Archivo, IBM_Plex_Sans_KR, JetBrains_Mono } from "next/font/google";

/** 영문 디스플레이 — 큰 타이포그래피용. 기울임 + 넓은 폭(wdth)으로 "CURIOUS EXPLORER"를 만든다 */
export const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

/** 한글 본문 — Google Fonts의 한글 서브셋은 subsets 옵션에 없어 preload를 끈다 */
export const plexKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-kr",
  display: "swap",
  preload: false,
});

/** 라벨 · 날짜 · 메타 정보 */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = [archivo.variable, plexKr.variable, jetbrains.variable].join(" ");
