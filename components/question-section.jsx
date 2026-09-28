"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBuilding, FaRocket, FaGraduationCap, FaChevronDown, FaArrowDown, FaArrowUp, FaFileInvoiceDollar, FaMagnifyingGlassChart, FaScaleBalanced } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const THESES = [
  {
    icon: FaBuilding,
    kicker: "Why PE",
    line: "It's manager mode with real stakes.",
    body: "You take a business that could be doing better, figure out what's working and what isn't, and back the changes with real capital and a real deadline. And because it puts you in front of a different company's problems every few weeks, it's the best training I can think of for the startup I eventually want to build.",
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

// What each part of the curriculum is, in plain terms, and why it matters to
// me. Deliberately no self-ratings: I'm not claiming to know these yet.
const CURRICULUM = [
  {
    icon: FaFileInvoiceDollar,
    name: "Accounting fundamentals",
    what: "The language every business reports in: the income statement, balance sheet, and cash flow statement, and how the three connect.",
    why: "Every question I ask about a business eventually runs through these numbers.",
  },
  {
    icon: FaMagnifyingGlassChart,
    name: "Business analysis",
    what: "Working out what actually drives a company: its market, its customers, how it makes money, and what could go wrong.",
    why: "It's the structured version of the \"why does this work?\" question I've been asking my whole life.",
  },
  {
    icon: FaScaleBalanced,
    name: "LBO modeling",
    what: "How a PE firm buys a company using a mix of its own money and debt, and models whether the business can pay that debt back and still earn a return.",
    why: "It's the core math of private equity, and so far I've only seen it from the outside.",
  },
];

function ThesisCard({ t, open, onToggle, index }) {
  const Icon = t.icon;
  return (
    <Reveal delay={index * 0.06}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`group flex h-full w-full cursor-pointer flex-col rounded-xl border p-6 text-left transition-all duration-200 ${
          open
            ? "border-brand bg-brand/5"
            : "border-border bg-card hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon className="h-4 w-4" />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.06em] text-muted-foreground uppercase">
            {open ? "Close" : "Click to open"}
          </span>
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
        <span className="mt-5 flex items-center gap-2 border-t border-border pt-3 font-mono text-[0.7rem] font-semibold tracking-[0.05em] text-brand uppercase transition-colors group-hover:text-brand-hover">
          {open ? "Show less" : "Read why"}
          <FaChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
        </span>
      </button>
    </Reveal>
  );
}

function Curriculum() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <p className="mb-1 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-brand uppercase">
        What Recalc teaches, and why I want each piece
      </p>
      <p className="mb-7 max-w-[640px] text-[0.92rem] text-muted-foreground">
        I&apos;m not coming in knowing these. Here&apos;s what each one is, in plain terms, and why it matters to me.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {CURRICULUM.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="flex h-full flex-col">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                <h4 className="mb-2 font-display text-[1.05rem] font-bold text-foreground">{c.name}</h4>
                <p className="mb-3 text-[0.9rem] leading-relaxed text-muted-foreground">{c.what}</p>
                <p className="mt-auto border-t border-border pt-3 text-[0.88rem] leading-relaxed text-foreground/90">
                  <span className="font-semibold text-brand">Why I want it: </span>
                  {c.why}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function QuestionSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="thesis" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-8 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">04.</span> The Thesis
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
        <Curriculum />
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
