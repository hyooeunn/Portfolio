"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { transition } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 아래에서 올라오는 거리(px) */
  y?: number;
  as?: "div" | "li" | "article" | "p";
};

/**
 * 화면에 들어올 때 한 번 아래→위로 나타나는 기본 등장 효과.
 * 정보 블록이 "지금 읽을 차례"라는 것을 알려주는 용도로만 쓴다.
 */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ ...transition.base, delay }}
    >
      {children}
    </Comp>
  );
}
