"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShirt, FaCar, FaChalkboardUser, FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const VENTURES = [
  {
    icon: FaShirt,
    name: "Clothing brand",
    question: "Why do people buy one thing and scroll right past another?",
    body: "A clothing brand lives or dies on taste, timing, and whether a stranger trusts you enough to hit buy. It was my first real look at how much of a business is psychology.",
  },
  {
    icon: FaCar,
    name: "Car detailing",
    question: "What makes someone pay for a service, and then come back?",
    body: "Detailing is simple to explain and hard to make worth it. Pricing, time per job, and whether a customer calls you a second time all matter more than how shiny the car gets.",
  },
  {
    icon: FaChalkboardUser,
    name: "Tutoring",
    question: "How do you explain something so it actually sticks?",
    body: "Tutoring is a business where the product is someone else's understanding. It taught me to figure out how another person thinks before trying to change what they know.",
  },
];

export function LongGameSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="long-game" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> The Long Game
      </Reveal>

      <Reveal>
        <p className="mb-10 max-w-[640px] text-[1rem] leading-relaxed text-muted-foreground">
          I don&apos;t just want to study businesses. I want to build one. I&apos;ve already started three small
          ones, and each left me with a question I&apos;m still chasing. Click one to see what it taught me.
        </p>
      </Reveal>

      <div className="grid items-start gap-4 md:grid-cols-3">
        {VENTURES.map((v, i) => {
          const Icon = v.icon;
          const on = open === i;
          return (
            <Reveal key={v.name} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className={`group flex w-full cursor-pointer flex-col rounded-xl border p-6 text-left transition-all duration-200 ${
                  on
                    ? "border-brand bg-brand/5"
                    : "border-border bg-card hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                }`}
              >
                <span className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                      on ? "bg-brand text-[#2a1608]" : "bg-brand/10 text-brand"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[1.1rem] font-bold text-foreground">{v.name}</span>
                </span>
                <span className="font-mono text-[0.65rem] font-bold tracking-[0.08em] text-brand uppercase">
                  The question it left me with
                </span>
                <span className="mt-1 text-[0.95rem] leading-snug text-foreground/90">{v.question}</span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block pt-3 text-[0.9rem] leading-relaxed text-muted-foreground">{v.body}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="mt-5 flex items-center gap-2 border-t border-border pt-3 font-mono text-[0.7rem] font-semibold tracking-[0.05em] text-brand uppercase">
                  {on ? "Show less" : "What it taught me"}
                  <FaChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${on ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* The sample-size argument: the core of why PE comes before the startup. */}
      <Reveal>
        <div className="mt-12 grid items-center gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-[auto_auto_auto_1fr] md:gap-8 md:p-8">
          <div className="text-center">
            <p className="font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase">My own businesses</p>
            <p className="font-display text-[2.6rem] font-extrabold text-foreground">n = 3</p>
          </div>
          <FaArrowRight className="mx-auto h-5 w-5 rotate-90 text-brand md:rotate-0" />
          <div className="text-center">
            <p className="font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase">Through PE</p>
            <p className="font-display text-[2.6rem] font-extrabold text-brand">n = 100s</p>
          </div>
          <p className="text-[0.97rem] leading-relaxed text-foreground/90">
            Three businesses taught me a handful of problems. That&apos;s a small sample to bet a startup on. PE puts
            you inside a different company&apos;s problems every few weeks, so by the time I build my own, I want to
            have already seen hundreds of ways a business can win or go sideways, not just the few I&apos;ve hit
            myself.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
