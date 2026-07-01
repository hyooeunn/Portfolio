"use client";

import { motion, type Variants } from "framer-motion";
import { profile } from "@/data/portfolio";
import { EASE } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,theme(colors.amber.200),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,theme(colors.amber.900/0.35),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-amber-200/60 blur-3xl dark:bg-amber-500/10"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="text-xs font-semibold tracking-[0.35em] text-amber-600 dark:text-amber-400"
        >
          FRONTEND DEVELOPER
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-4 font-serif text-6xl italic tracking-tight text-zinc-900 sm:text-7xl dark:text-zinc-50"
        >
          Portfolio
        </motion.h1>

        <motion.span variants={item} className="mt-6 text-4xl">
          💛
        </motion.span>

        <motion.h2
          variants={item}
          className="mt-6 text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-50"
        >
          {profile.name} <span className="text-zinc-400">|</span>{" "}
          {profile.role}
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-8 flex items-center gap-2 rounded-2xl bg-amber-50 px-6 py-4 text-base text-zinc-700 ring-1 ring-amber-100 sm:text-lg dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800"
        >
          <span aria-hidden>⭐</span>
          {profile.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-gradient-to-b from-amber-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
