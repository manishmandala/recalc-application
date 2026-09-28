"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBrain, FaArrowTrendUp, FaMountain, FaRocket } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const TOPICS = [
  {
    icon: FaBrain,
    label: "Psychology & habits",
    hook: "Why people do what they do, and how to change what I do.",
    body: "I've been reading about how habits actually form: what triggers them, why some stick and most don't. I've been using it on myself too, building healthier routines on purpose instead of hoping they happen. It's the same \"why does this work?\" question, turned inward.",
    recalc: "Every business decision is made by a person. Understanding people is half of understanding a company.",
  },
  {
    icon: FaArrowTrendUp,
    label: "Investing & the market",
    hook: "How the market works, and whether I can beat it.",
    body: "I love the stock market because it grades you honestly. I've been learning how it actually works, what moves prices, and what it takes to build an investment thesis: decide what you believe about a company, why, and what would prove you wrong. Trying to beat the market is humbling, and that's part of why I like it.",
    recalc: "A PE deal is an investment thesis with much more at stake. Recalc teaches the math that backs one up.",
  },
  {
    icon: FaMountain,
    label: "Discipline",
    hook: "In the market and in life, it's the same skill.",
    body: "The more I learn about investing, the more it looks like a discipline problem, not an intelligence problem. The hard part is sticking to your thesis when emotions say otherwise, and changing your mind when the evidence does. That's true of habits, training, and school too.",
    recalc: "Recalc is a structured, demanding program. Discipline is how I plan to get the most out of it.",
  },
  {
    icon: FaRocket,
    label: "How great companies started",
    hook: "Google started as a research project. That stuck with me.",
    body: "I've been learning how some of the biggest companies were built, like Google, which began as a research project at Stanford before it was a business. As an engineer who's done research, that hits close to home: technical ideas can become companies, if someone understands the business side too.",
    recalc: "I want to build a company someday. Recalc gives me the business and finance side that engineering doesn't.",
  },
];

export function LearningSection() {
  const [active, setActive] = useState(0);
  const t = TOPICS[active];

  return (
    <section id="learning" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">04.</span> What I&apos;ve Been Learning
      </Reveal>

      <Reveal>
        <p className="mb-10 max-w-[640px] text-[1rem] leading-relaxed text-muted-foreground">
          Outside of class, these are the four things I keep coming back to. Each one connects to why I want to be
          at Recalc. Click through them.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Reveal>
          <div className="flex flex-col gap-2">
            {TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              const on = active === i;
              return (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                    on
                      ? "border-brand bg-brand/10"
                      : "border-border bg-card hover:translate-x-1 hover:border-brand/50"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      on ? "bg-brand text-[#2a1608]" : "bg-brand/10 text-brand"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={`font-display text-[1rem] font-bold ${on ? "text-foreground" : "text-foreground/85"}`}>
                    {topic.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full min-h-[300px] flex-col rounded-xl border border-border bg-card p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col"
              >
                <p className="mb-1 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-brand uppercase">{t.label}</p>
                <p className="mb-4 font-display text-[1.3rem] font-bold leading-snug text-foreground">{t.hook}</p>
                <p className="mb-6 text-[0.97rem] leading-relaxed text-muted-foreground">{t.body}</p>
                <p className="mt-auto rounded-lg border-l-2 border-brand bg-brand/5 px-4 py-3 text-[0.92rem] leading-relaxed text-foreground/90">
                  <span className="font-semibold text-brand">Why it matters for Recalc: </span>
                  {t.recalc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
