"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";

const NODES = [
  {
    era: "Childhood",
    title: "Fan remotes",
    body: [
      "As a kid I pulled apart fan remotes just to see how the switches worked, then tried to figure out if I could get one remote to control a fan in a different room. It never fully worked. I kept doing it anyway, because something in the room was operating on rules I could actually go find.",
    ],
  },
  {
    era: "Middle School",
    title: "Robotics, and a bag of snow",
    body: [
      "By middle school the same habit had a name: robotics. I was team lead, which meant I helped decide how we'd design and build the robot, but I also spent plenty of time elbow deep in assembly, testing, and the slow process of debugging. What I loved was that a defect was never a mystery for long. You could see it, chase down why it was happening, change one thing, and test again.",
      "The moment I still think about happened at a state competition. Our battery and motors were overheating and we had no cooling spray on hand. So I took the robot outside into the winter cold and packed snow into bags around the hot parts, just to buy enough time to keep troubleshooting. It wasn't a real fix. It was what we had.",
    ],
  },
  {
    era: "High School",
    title: "DECA and the idea of strategy",
    body: [
      "High school pointed that same question somewhere new. Through DECA I started noticing that two ideas could take the same amount of effort and land in completely different places, and I wanted to know why one worked and the other didn't.",
    ],
  },
  {
    era: "College Decision",
    title: "Choosing mechanical engineering",
    body: [
      "I looked at finance seriously before college and picked mechanical engineering instead. Not because the curiosity about business went away, but because I figured it would follow me regardless of major, and I wanted four years that forced a different kind of discipline first. Betting on the harder unknown felt like the right trade.",
    ],
  },
  {
    era: "Ohio State",
    title: "Phi Chi Theta",
    body: [
      "In college I joined Phi Chi Theta, a professional business fraternity, and ended up on the recruitment team. That put me in the room for a question I hadn't expected to care about this much: how do you actually evaluate a candidate fairly? I pushed on how we judge people, especially freshmen, and argued to the board that one interview format rewards one kind of strength and quietly overlooks others.",
      "Some of that made it to a chapter vote. Not all of it passed. But I'd rather argue for a better process and lose some rounds than stay quiet about one I think is flawed.",
    ],
  },
  {
    era: "Ohio State",
    title: "Learning finance on purpose",
    body: [
      "Alongside that, I started actually studying the finance side instead of admiring it from a distance. As a business analyst at Buckeye PEVC, Ohio State's private equity and venture capital group, I've been learning how LBOs work, how PE and VC investors approach a decision differently, and what separates a business that's fixable from one that simply isn't going to work.",
      "Through Scarlet Investment Group I found the version of finance that runs on math instead of instinct, which appealed to the engineer in me more than I expected. I haven't run a deal or managed a real portfolio. What I've done is get serious about understanding how the people who do make their decisions.",
    ],
  },
  {
    era: "Ongoing",
    title: "Northwestern research, and two robots",
    body: [
      "Separately, I worked on a simulation tool for metal additive manufacturing through a research position at Northwestern. I'd rather point at it briefly than dwell on it. What it actually taught me was how to sit with a problem I didn't understand yet and take it apart piece by piece without pretending I already knew the answer.",
      "The building never really stopped, either: a vision-guided tracking system, and now an autonomous drone that's still very much in progress. I'd rather say that plainly than describe it as something it isn't yet.",
    ],
  },
];

function TimelineNode({ node, index, isOpen, onToggle }) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="relative pl-10">
        <div className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center">
          <span
            className={`h-3 w-3 rounded-full border-2 transition-colors ${
              isOpen ? "border-brand bg-brand" : "border-border bg-background"
            }`}
          />
        </div>
        {index < NODES.length - 1 && (
          <div className="absolute left-[9px] top-7 h-[calc(100%+1.25rem)] w-px bg-border" />
        )}

        <button
          type="button"
          onClick={onToggle}
          className="group flex w-full flex-col items-start gap-0.5 text-left"
        >
          <span className="font-mono text-[0.72rem] font-bold tracking-[0.08em] text-brand uppercase">
            {node.era}
          </span>
          <span className="font-display text-[1.1rem] font-bold text-foreground transition-colors group-hover:text-brand">
            {node.title}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-3 pb-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                {node.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function TimelineSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="timeline" className="container mx-auto max-w-[760px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">01.</span> How I Got Here
      </Reveal>
      <Reveal>
        <p className="mb-12 max-w-[560px] text-[0.95rem] text-muted-foreground">
          Click any point below to read more. The short version: the same curiosity kept showing up wearing
          different clothes.
        </p>
      </Reveal>

      <div className="flex flex-col gap-8">
        {NODES.map((node, i) => (
          <TimelineNode
            key={node.title}
            node={node}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
