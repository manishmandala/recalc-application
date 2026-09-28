"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBuilding, FaRocket, FaGraduationCap, FaPlus, FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const THESES = [
  {
    icon: FaBuilding,
    kicker: "Why PE",
    line: "It's manager mode with real stakes.",
    body: "You take a business that could be doing better, figure out what's working and what isn't, and back the changes with real capital and a real deadline. It also puts you in front of a different business's problems every few weeks instead of just one. I've tried building small businesses of my own and I intend to again, and I'd rather go into that next attempt having already seen a few hundred ways a business can go sideways.",
  },
  {
    icon: FaRocket,
    kicker: "Why VC",
    line: "The same game, played earlier.",
    body: "Instead of fixing something that already exists, you're betting on something before it's proven, which means judging people and markets as much as numbers. That's where the psychology side pulls at me most: why a founder makes the calls they make, and why customers will or won't show up for something new.",
  },
  {
    icon: FaGraduationCap,
    kicker: "Why Recalc",
    line: "I've begun learning the qualitative half. I want the other half too.",
    body: "What I don't have yet are the tools to test whether a business is actually worth what someone says it's worth. Recalc's Finance Accelerator teaches accounting fundamentals, business analysis, and LBO modeling: the mechanics I've been circling at Buckeye PEVC and Scarlet without ever fully picking up.",
  },
];

// Rough self-assessment, not a score. The point is the shape: strong on the
// qualitative side, thin on the technical side Recalc actually teaches.
const SKILLS = [
  { name: "Systems thinking", now: 75, after: 85 },
  { name: "Listening to customers & staff", now: 70, after: 80 },
  { name: "Business strategy", now: 55, after: 75 },
  { name: "Accounting fundamentals", now: 25, after: 70, recalc: true },
  { name: "Business analysis", now: 35, after: 75, recalc: true },
  { name: "LBO modeling", now: 15, after: 70, recalc: true },
];

function ThesisCard({ t, open, onToggle, index }) {
  const Icon = t.icon;
  return (
    <Reveal delay={index * 0.06}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex h-full w-full flex-col rounded-xl border p-6 text-left transition-all duration-200 ${
          open ? "border-brand bg-brand/5" : "border-border bg-card hover:-translate-y-0.5 hover:border-brand/50"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon className="h-4 w-4" />
          </span>
          <FaPlus className={`h-3 w-3 text-brand transition-transform duration-200 ${open ? "rotate-45" : ""}`} />
        </div>
        <span className="mb-1 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-brand uppercase">{t.kicker}</span>
        <span className="font-display text-[1.15rem] font-bold leading-snug text-foreground">{t.line}</span>
        <AnimatePresence initial={false}>
          {open && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span className="block pt-3 text-[0.92rem] leading-relaxed text-muted-foreground">{t.body}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

function SkillGap() {
  const [after, setAfter] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] font-bold tracking-[0.08em] text-brand uppercase">The gap Recalc closes</p>
          <p className="text-[0.85rem] text-muted-foreground">A rough self-assessment. Flip the switch.</p>
        </div>
        <div className="flex rounded-lg border border-border p-1">
          {["Today", "After Recalc"].map((label, i) => {
            const on = after === (i === 1);
            return (
              <button
                key={label}
                type="button"
                onClick={() => setAfter(i === 1)}
                aria-pressed={on}
                className={`rounded-md px-4 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                  on ? "bg-brand text-[#2a1608]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        {SKILLS.map((s) => (
          <li key={s.name}>
            <div className="mb-1.5 flex items-center justify-between text-[0.88rem]">
              <span className="text-foreground/90">
                {s.name}
                {s.recalc && (
                  <span className="ml-2 rounded-full bg-brand/15 px-2 py-0.5 font-mono text-[0.6rem] font-bold tracking-[0.04em] text-brand uppercase">
                    Recalc
                  </span>
                )}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-border">
              <motion.div
                className={`h-full rounded-full ${s.recalc ? "bg-brand" : "bg-[#7fa889]"}`}
                initial={false}
                animate={{ width: `${after ? s.after : s.now}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuestionSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="thesis" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-8 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> The Thesis
      </Reveal>

      <Reveal>
        <blockquote className="mb-4 max-w-[720px] border-l-2 border-brand pl-5 font-display text-[clamp(1.4rem,3.4vw,1.9rem)] font-bold leading-tight text-foreground">
          What actually makes a business work?
        </blockquote>
        <p className="mb-12 max-w-[680px] text-[1rem] leading-relaxed text-muted-foreground">
          The mindset I bring to that question started in FIFA manager mode, deciding where a limited budget
          would do the most good. I took it onto the soccer field, into DECA, engineering, and how people make
          decisions. The subject kept changing. The habit didn&apos;t: look at the whole system, find what&apos;s
          really driving it, and put resources where they matter most.
        </p>
      </Reveal>

      <div className="mb-12 grid items-start gap-4 md:grid-cols-3">
        {THESES.map((t, i) => (
          <ThesisCard key={t.kicker} t={t} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>

      <Reveal>
        <SkillGap />
      </Reveal>

      <Reveal>
        <h3 className="mt-16 mb-2 font-display text-[1.3rem] font-bold text-foreground">The community</h3>
        <p className="mb-6 max-w-[680px] text-[0.97rem] leading-relaxed text-muted-foreground">
          Recalc brings together students who are drawn to the same questions but come from completely different
          disciplines. Phi Chi Theta taught me I grow fastest in a room like that.
        </p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-border bg-card p-6">
            <p className="mb-3 flex items-center gap-2 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-brand uppercase">
              <FaArrowDown className="h-3 w-3" /> What I&apos;d get
            </p>
            <ul className="flex flex-col gap-2.5 text-[0.93rem] leading-relaxed text-foreground/90">
              <li>People who take a problem apart differently than I do, and expose the blind spots in how I think.</li>
              <li>Peers who ask hard questions out loud, which is how I learn fastest.</li>
              <li>The technical tools to back up my instincts with real numbers.</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="h-full rounded-xl border border-brand/40 bg-brand/5 p-6">
            <p className="mb-3 flex items-center gap-2 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-brand uppercase">
              <FaArrowUp className="h-3 w-3" /> What I&apos;d bring
            </p>
            <ul className="flex flex-col gap-2.5 text-[0.93rem] leading-relaxed text-foreground/90">
              <li>A mechanical engineer&apos;s habit of breaking systems into parts and testing one assumption at a time.</li>
              <li>The instinct to ask why a model says what it says, not just what it says.</li>
              <li>A different angle in a room full of people trained to see the same problem another way.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
