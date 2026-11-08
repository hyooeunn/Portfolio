"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ease, gsapEase } from "./motion";

let registered = false;

/** 플러그인과 브랜드 ease를 한 번만 등록한다. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create(gsapEase.out, ease.out.join(","));
  CustomEase.create(gsapEase.inOut, ease.inOut.join(","));
  gsap.defaults({ ease: gsapEase.out });

  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger };
