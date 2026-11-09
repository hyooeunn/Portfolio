import type { StaticImageData } from "next/image";

/**
 * 우주 에셋 (GPT로 만든 에셋 시트 2장에서 잘라낸 투명 WebP).
 * 정적 import라서 next/image가 크기를 자동으로 알고 최적화한다.
 */
import asteroid from "@/assets/space/asteroid.webp";
import bubble from "@/assets/space/bubble.webp";
import crystal from "@/assets/space/crystal.webp";
import cube from "@/assets/space/cube.webp";
import earth from "@/assets/space/earth.webp";
import folder from "@/assets/space/folder.webp";
import hudChart from "@/assets/space/hud-chart.webp";
import hudScope from "@/assets/space/hud-scope.webp";
import iconArduino from "@/assets/space/icon-arduino.webp";
import iconNextjs from "@/assets/space/icon-nextjs.webp";
import iconPython from "@/assets/space/icon-python.webp";
import iconRaspberrypi from "@/assets/space/icon-raspberrypi.webp";
import iconReact from "@/assets/space/icon-react.webp";
import iconTailwind from "@/assets/space/icon-tailwind.webp";
import iconTerminal from "@/assets/space/icon-terminal.webp";
import iconTypescript from "@/assets/space/icon-typescript.webp";
import monkeyBack from "@/assets/space/monkey-back.webp";
import monkeyFloat2 from "@/assets/space/monkey-float-2.webp";
import monkeyFloat from "@/assets/space/monkey-float.webp";
import monkeyPoint from "@/assets/space/monkey-point.webp";
import monkeySit from "@/assets/space/monkey-sit.webp";
import monkeyThumbsup from "@/assets/space/monkey-thumbsup.webp";
import orbitDisc from "@/assets/space/orbit-disc.webp";
import orbitEllipse from "@/assets/space/orbit-ellipse.webp";
import panelTab from "@/assets/space/panel-tab.webp";
import panelWide from "@/assets/space/panel-wide.webp";
import planetGlass2 from "@/assets/space/planet-glass-2.webp";
import planetGlass from "@/assets/space/planet-glass.webp";
import progressLime from "@/assets/space/progress-lime.webp";
import radar from "@/assets/space/radar.webp";
import ringSpark from "@/assets/space/ring-spark.webp";
import ringTorus from "@/assets/space/ring-torus.webp";
import sparkleLime2 from "@/assets/space/sparkle-lime-2.webp";
import sparkleLime from "@/assets/space/sparkle-lime.webp";
import starCompass from "@/assets/space/star-compass.webp";
import starCrystal from "@/assets/space/star-crystal.webp";
import starSilver from "@/assets/space/star-silver.webp";
import ufoRing from "@/assets/space/ufo-ring.webp";
import wireGlobe from "@/assets/space/wire-globe.webp";
import wirePlanet from "@/assets/space/wire-planet.webp";

export const space = {
  monkey: {
    float: monkeyFloat,
    float2: monkeyFloat2,
    sit: monkeySit,
    thumbsup: monkeyThumbsup,
    point: monkeyPoint,
    back: monkeyBack,
  },
  asteroid,
  bubble,
  crystal,
  cube,
  earth,
  folder,
  hudChart,
  hudScope,
  orbitDisc,
  orbitEllipse,
  panelTab,
  panelWide,
  planetGlass,
  planetGlass2,
  progressLime,
  radar,
  ringSpark,
  ringTorus,
  sparkleLime,
  sparkleLime2,
  starCompass,
  starCrystal,
  starSilver,
  ufoRing,
  wireGlobe,
  wirePlanet,
} as const;

/** 기술 스택 아이콘 (에셋 시트에 있는 것만). 없는 기술은 텍스트 타일로 보여준다 */
export const skillIcons = {
  React: iconReact,
  TypeScript: iconTypescript,
  "Next.js": iconNextjs,
  "Tailwind CSS": iconTailwind,
  Python: iconPython,
  "Raspberry Pi": iconRaspberrypi,
  Arduino: iconArduino,
} as const;

export const terminalIcon = iconTerminal;

/** 프로젝트 카드 장식 */
export const projectArt: Record<string, StaticImageData | undefined> = {
  gif: ringSpark,
  signal: hudScope,
  flooding: wirePlanet,
  "took-tak": wireGlobe,
  taekbae: folder,
};
