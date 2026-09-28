"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGears, FaShop, FaBrain, FaChartLine } from "react-icons/fa6";

// The whole site in four steps: the same "why does this work?" habit,
// pointed at bigger and bigger systems until it lands on PE. Each step
// jumps to the section that backs it up.
const STEPS = [
  { icon: FaGears, label: "Machines", note: "Robotics, research, building things", href: "#timeline" },
  { icon: FaShop, label: "Businesses", note: "DECA and three small businesses of my own", href: "#long-game" },
  { icon: FaBrain, label: "People", note: "Why anyone decides what they decide", href: "#why-things-work" },
  { icon: FaChartLine, label: "Private Equity", note: "Where all three meet", href: "#thesis", end: true },
];

// Holds its draw-in animation until the MM intro splash is gone, so a
// first-time visitor actually sees it instead of it playing underneath.
function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("mmIntroSeen") === "1";
    } catch {
      seen = true;
    }
    if (seen) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener("mm-intro-done", onDone);
    return () => window.removeEventListener("mm-intro-done", onDone);
  }, []);
  return done;
}

export function HeroPath() {
  const ready = useIntroDone();
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* the connecting line, drawn top to bottom */}
      <motion.span
        aria-hidden
        className="absolute top-7 bottom-7 left-[27px] w-[2px] origin-top bg-gradient-to-b from-brand/30 to-brand"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: ready ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <ol className="relative flex flex-col gap-5">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: 16 }}
              animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={s.href} className="group flex items-center gap-4">
                <span
                  className={`relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-transform group-hover:scale-105 ${
                    s.end
                      ? "border-brand bg-brand text-[#2a1608] shadow-[0_0_30px_rgba(245,167,66,0.35)]"
                      : "border-border bg-card text-brand group-hover:border-brand"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span
                    className={`block font-display text-[1.2rem] font-bold transition-colors ${
                      s.end ? "text-brand" : "text-foreground group-hover:text-brand"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="block text-[0.85rem] text-muted-foreground">{s.note}</span>
                </span>
              </a>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
