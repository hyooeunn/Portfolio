"use client";

import { motion, useScroll } from "framer-motion";

/** 상단 스크롤 진행 바. Lenis는 네이티브 스크롤 위치를 움직이므로 useScroll로 그대로 읽힌다. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
