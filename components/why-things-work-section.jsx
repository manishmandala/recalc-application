"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGears, FaShop, FaBrain, FaArrowRight } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const LENSES = [
  {
    icon: FaGears,
    label: "Machines",
    title: "Why machines behave",
    hook: "Nothing breaks for no reason.",
    body: "Engineering is where I first ran into it. A motor overheating or a sensor giving bad readings is never random. There's a cause, and if you're patient enough you can find it. That taught me to treat a surprise as information instead of bad luck.",
  },
  {
    icon: FaShop,
    label: "Businesses",
    title: "Why businesses behave",
    hook: "Same effort, very different outcomes.",
    body: "In DECA I noticed that two ideas could take the same effort and land in completely different places, and the difference was rarely the idea itself. It was how people reacted to it. This summer I spent time with the owners, staff, and customers of two local businesses, and the most useful thing I did was listen for why people kept coming back, or didn't.",
  },
  {
    icon: FaBrain,
    label: "People",
    title: "Why people behave",
    hook: "The layer that explains the other two.",
    body: "Underneath both is the part I find most interesting: the brain itself. Why people trust some things and not others, why habits stick, why a smart person makes a call that looks irrational from the outside. It's the layer that explains the other two, and it's the one I keep coming back to on my own.",
  },
];

export function WhyThingsWorkSection() {
  const [active, setActive] = useState(0);
  const lens = LENSES[active];

  return (
    <section id="why-things-work" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">02.</span> Why Things Work
      </Reveal>

      <Reveal>
        <p className="mb-10 max-w-[620px] text-[1rem] leading-relaxed text-muted-foreground">
          The habit is always the same: find out <span className="text-foreground">why</span> something, or
          someone, behaves the way it does. Only the subject has changed. Pick one.
        </p>
      </Reveal>

      <Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {LENSES.map((l, i) => {
            const Icon = l.icon;
            const on = active === i;
            return (
              <button
                key={l.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`group relative flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
                  on
                    ? "border-brand bg-brand/10 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                    : "border-border bg-card hover:-translate-y-0.5 hover:border-brand/50"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
                    on ? "bg-brand text-[#2a1608]" : "bg-brand/10 text-brand"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[0.65rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                    0{i + 1} &middot; Why do
                  </span>
                  <span className="block font-display text-[1.2rem] font-bold text-foreground">{l.label} work?</span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-6 min-h-[190px] rounded-xl border border-border bg-card p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-1 font-mono text-[0.7rem] font-bold tracking-[0.08em] text-brand uppercase">{lens.title}</p>
            <p className="mb-3 font-display text-[1.35rem] font-bold text-foreground">{lens.hook}</p>
            <p className="max-w-[760px] text-[0.97rem] leading-relaxed text-muted-foreground">{lens.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col gap-4 rounded-xl border-l-2 border-brand bg-brand/5 p-6 md:flex-row md:items-center">
          <p className="flex-1 text-[1rem] leading-relaxed text-foreground/90">
            <span className="font-semibold text-foreground">Why this points to PE:</span> on paper it&apos;s a
            numbers business, but much of what makes a company worth more or less is human: whether management
            makes good calls under pressure, why customers stay, which incentives actually change behavior.
            It&apos;s the first place I&apos;ve found where asking why is the whole job.
          </p>
          <a
            href="#thesis"
            className="flex shrink-0 items-center gap-2 font-mono text-[0.75rem] font-semibold tracking-[0.04em] text-brand uppercase hover:text-brand-hover"
          >
            The thesis <FaArrowRight className="h-3 w-3" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
