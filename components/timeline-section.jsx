"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const NODES = [
  {
    era: "Childhood",
    pin: "Childhood",
    title: "Fan remotes",
    body: [
      "As a kid I pulled apart fan remotes just to see how the switches worked, then tried to figure out if I could get one remote to control a fan in a different room. It never fully worked. I kept doing it anyway, because something in the room was operating on rules I could actually go find.",
    ],
  },
  {
    era: "Middle School",
    pin: "Middle School",
    title: "Robotics, and a bag of snow",
    body: [
      "By middle school the same habit had a name: robotics. I was team lead, which meant I helped decide how we'd design and build the robot, but I also spent plenty of time elbow deep in assembly, testing, and the slow process of debugging. What I loved was that a defect was never a mystery for long. You could see it, chase down why it was happening, change one thing, and test again.",
      "The moment I still think about happened at a state competition. Our battery and motors were overheating and we had no cooling spray on hand. So I took the robot outside into the winter cold and packed snow into bags around the hot parts, just to buy enough time to keep troubleshooting. It wasn't a real fix. It was what we had.",
    ],
  },
  {
    era: "High School",
    pin: "High School",
    title: "DECA and the idea of strategy",
    body: [
      "High school pointed that same question somewhere new. Through DECA I started noticing that two ideas could take the same amount of effort and land in completely different places, and I wanted to know why one worked and the other didn't.",
    ],
  },
  {
    era: "College Decision",
    pin: "Choosing ME",
    title: "Choosing mechanical engineering",
    body: [
      "I looked at finance seriously before college and picked mechanical engineering instead. Not because the curiosity about business went away, but because I figured it would follow me regardless of major, and I wanted four years that forced a different kind of discipline first. Betting on the harder unknown felt like the right trade.",
    ],
  },
  {
    era: "Ohio State",
    pin: "Phi Chi Theta",
    title: "Phi Chi Theta",
    body: [
      "In college I joined Phi Chi Theta, a professional business fraternity, and ended up on the recruitment team. That put me in the room for a question I hadn't expected to care about this much: how do you actually evaluate a candidate fairly? I pushed on how we judge people, especially freshmen, and argued to the board that one interview format rewards one kind of strength and quietly overlooks others.",
      "Some of that made it to a chapter vote. Not all of it passed. But I'd rather argue for a better process and lose some rounds than stay quiet about one I think is flawed.",
    ],
  },
  {
    era: "Ohio State",
    pin: "Learning Finance",
    title: "Learning finance on purpose",
    body: [
      "Alongside that, I started actually studying the finance side instead of admiring it from a distance. As a business analyst at Buckeye PEVC, Ohio State's private equity and venture capital group, I've been learning how LBOs work, how PE and VC investors approach a decision differently, and what separates a business that's fixable from one that simply isn't going to work.",
      "Through Scarlet Investment Group I found the version of finance that runs on math instead of instinct, which appealed to the engineer in me more than I expected. I haven't run a deal or managed a real portfolio. What I've done is get serious about understanding how the people who do make their decisions.",
    ],
  },
  {
    era: "Ongoing",
    pin: "Research & Robots",
    title: "Northwestern research, and two robots",
    body: [
      "Separately, I worked on a simulation tool for metal additive manufacturing through a research position at Northwestern. I'd rather point at it briefly than dwell on it. What it actually taught me was how to sit with a problem I didn't understand yet and take it apart piece by piece without pretending I already knew the answer.",
      "The building never really stopped, either: a vision-guided tracking system, and now an autonomous drone that's still very much in progress. I'd rather say that plainly than describe it as something it isn't yet.",
    ],
  },
];

// Hand-placed points for a winding road through the viewBox, not a formula -
// this is meant to look like a drawn path, not a plotted function.
const POINTS = [
  [100, 60],
  [150, 190],
  [70, 320],
  [140, 450],
  [60, 580],
  [130, 710],
  [90, 840],
];
const ROAD_D =
  "M100,60 C108.3,81.7 155.0,146.7 150.0,190.0 C145.0,233.3 71.7,276.7 70.0,320.0 C68.3,363.3 141.7,406.7 140.0,450.0 C138.3,493.3 61.7,536.7 60.0,580.0 C58.3,623.3 125.0,666.7 130.0,710.0 C135.0,753.3 96.7,818.3 90.0,840.0";
const VB_W = 200;
const VB_H = 900;

function RoadMap({ active, onSelect }) {
  return (
    <div className="relative hidden aspect-[200/900] w-full md:block">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible">
        <path d={ROAD_D} stroke="var(--border)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path
          d={ROAD_D}
          stroke="var(--brand)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(active / (POINTS.length - 1)) * 1400} 2000`}
          style={{ transition: "stroke-dasharray 0.4s ease" }}
        />
      </svg>

      {POINTS.map(([x, y], i) => {
        const leftPct = (x / VB_W) * 100;
        const topPct = (y / VB_H) * 100;
        const labelOnLeft = x >= 100;
        const isActive = active === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${NODES[i].era}: ${NODES[i].title}`}
            className="absolute flex -translate-x-1/2 -translate-y-full items-center gap-1.5"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              flexDirection: labelOnLeft ? "row-reverse" : "row",
            }}
          >
            <FaLocationDot
              className={`h-6 w-6 shrink-0 transition-all ${isActive ? "text-brand" : "text-muted-foreground"}`}
              style={{ filter: isActive ? "drop-shadow(0 0 6px var(--brand))" : "none" }}
            />
            <span
              className={`whitespace-nowrap font-mono text-[0.68rem] font-bold tracking-[0.04em] transition-colors ${
                isActive ? "text-brand" : "text-muted-foreground"
              } ${labelOnLeft ? "text-right" : "text-left"}`}
            >
              {NODES[i].pin}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MobileStops({ active, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
      {NODES.map((n, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.72rem] font-semibold whitespace-nowrap transition-colors ${
            active === i
              ? "border-brand bg-brand/10 text-brand"
              : "border-border text-muted-foreground"
          }`}
        >
          <FaLocationDot className="h-3 w-3" />
          {n.pin}
        </button>
      ))}
    </div>
  );
}

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  return (
    <section id="timeline" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">01.</span> How I Got Here
      </Reveal>
      <Reveal>
        <p className="mb-10 max-w-[560px] text-[0.95rem] text-muted-foreground">
          Click a stop on the map to read more. The short version: the same curiosity kept showing up
          wearing different clothes.
        </p>
      </Reveal>

      <div className="mb-6 md:hidden">
        <MobileStops active={active} onSelect={setActive} />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_240px] md:gap-8">
        <div className="min-h-[280px] md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-1 block font-mono text-[0.72rem] font-bold tracking-[0.08em] text-brand uppercase">
                {node.era}
              </span>
              <h3 className="mb-4 font-display text-[1.3rem] font-bold text-foreground">{node.title}</h3>
              <div className="flex flex-col gap-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                {node.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:order-2">
          <RoadMap active={active} onSelect={setActive} />
        </div>
      </div>
    </section>
  );
}
