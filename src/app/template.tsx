"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import { duration, ease } from "@/lib/motion";

/** 첫 방문에는 Hero 인트로가 있으니 커튼을 생략하고, 페이지 이동부터 보여준다 */
let hasNavigated = false;

/**
 * 페이지 전환: 라임 커튼이 위로 걷히며 새 페이지가 나타난다.
 * - template.tsx는 라우트가 바뀔 때마다 다시 마운트되므로 진입 연출만 담당한다.
 * - 내용 래퍼에는 transform을 쓰지 않는다(조상에 transform이 있으면 GSAP pin과 sticky가 깨진다).
 */
export default function Template({ children }: { children: ReactNode }) {
  const [skip] = useState(() => !hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {skip ? null : (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] origin-top bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: duration.base, ease: ease.inOut }}
        />
      )}
      <motion.div
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.base, ease: ease.out, delay: skip ? 0 : 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
