"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLocationDot,
  FaCarSide,
  FaBolt,
  FaRobot,
  FaBriefcase,
  FaCompass,
  FaPeopleGroup,
  FaChartLine,
  FaFlask,
  FaSeedling,
} from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const NODES = [
  {
    era: "Childhood",
    pin: "Childhood",
    icon: FaBolt,
    title: "Fan remotes",
    body: [
      "As a kid I pulled apart fan remotes just to see how the switches worked, then tried to figure out if I could get one remote to control a fan in a different room. It never fully worked. I kept doing it anyway, because something in the room was operating on rules I could actually go find.",
    ],
  },
  {
    era: "Middle School",
    pin: "Middle School",
    icon: FaRobot,
    title: "Robotics, and a bag of snow",
    body: [
      "By middle school the same habit had a name: robotics. I was team lead, which meant I helped decide how we'd design and build the robot, but I also spent plenty of time elbow deep in assembly, testing, and the slow process of debugging. What I loved was that a defect was never a mystery for long. You could see it, chase down why it was happening, change one thing, and test again.",
      "The moment I still think about happened at a state competition. Our battery and motors were overheating and we had no cooling spray on hand. So I took the robot outside into the winter cold and packed snow into bags around the hot parts, just to buy enough time to keep troubleshooting. It wasn't a real fix. It was what we had.",
    ],
  },
  {
    era: "High School",
    pin: "High School",
    icon: FaBriefcase,
    title: "DECA and the idea of strategy",
    body: [
      "High school pointed that same question somewhere new. Through DECA I started noticing that two ideas could take the same amount of effort and land in completely different places, and I wanted to know why one worked and the other didn't.",
    ],
  },
  {
    era: "College Decision",
    pin: "Choosing ME",
    icon: FaCompass,
    title: "Choosing mechanical engineering",
    body: [
      "I looked at finance seriously before college and picked mechanical engineering instead. Not because the curiosity about business went away, but because I figured it would follow me regardless of major, and I wanted four years that forced a different kind of discipline first. Betting on the harder unknown felt like the right trade.",
    ],
  },
  {
    era: "Ohio State",
    pin: "Phi Chi Theta",
    icon: FaPeopleGroup,
    title: "Phi Chi Theta",
    body: [
      "In college I joined Phi Chi Theta, a professional business fraternity, mostly because I wanted to be around people who took business as seriously as I did, which wasn't easy to find in a schedule full of engineering classes. What I actually got out of it wasn't a class or a workshop. It was people: upperclassmen a few interviews ahead of me, professionals willing to tell you what actually mattered instead of what sounded good in a meeting. Being in a room where you're not the only one asking a question turns out to speed up how fast you figure things out.",
      "That's part of why Recalc matters to me beyond the curriculum itself. A cohort full of people from genuinely different backgrounds who all happen to be sharp about breaking down a hard problem is the same thing that made Phi Chi Theta worth my time in the first place. I'd rather learn this next layer of finance surrounded by people like that than alone with a textbook.",
    ],
  },
  {
    era: "Ohio State",
    pin: "Learning Finance",
    icon: FaChartLine,
    title: "Learning finance on purpose",
    body: [
      "Alongside that, I started actually studying the finance side instead of admiring it from a distance. As a business analyst at Buckeye PEVC, Ohio State's private equity and venture capital group, I've been learning how LBOs work, how PE and VC investors approach a decision differently, and what separates a business that's fixable from one that simply isn't going to work.",
      "Through Scarlet Investment Group I found the version of finance that runs on math instead of instinct, which appealed to the engineer in me more than I expected. I haven't run a deal or managed a real portfolio. What I've done is get serious about understanding how the people who do make their decisions.",
    ],
  },
  {
    era: "Ongoing",
    pin: "Research & Robots",
    icon: FaFlask,
    title: "Northwestern research, and two robots",
    body: [
      "Separately, I worked on a simulation tool for metal additive manufacturing through a research position at Northwestern. I'd rather point at it briefly than dwell on it. What it actually taught me was how to sit with a problem I didn't understand yet and take it apart piece by piece without pretending I already knew the answer.",
      "The building never really stopped, either: a vision-guided tracking system, and now an autonomous drone that's still very much in progress. I'd rather say that plainly than describe it as something it isn't yet.",
    ],
  },
  {
    era: "Right Now",
    pin: "Where This Leads",
    icon: FaSeedling,
    title: "Tying it together",
    body: [
      "Put the fan remotes, the robots, the businesses, and the finance clubs next to each other and they stop looking like a scattered resume. They're the same instinct pointed at different material: take something apart, find what's actually driving it, and see if there's a better way to put it back together.",
      "Engineering gave me the discipline. The local businesses gave me the practice. PEVC and Scarlet gave me the vocabulary. What I don't have yet is the rigor to make that instinct hold up under real numbers, which is exactly the gap Recalc is built to close.",
    ],
  },
];

// Hand-placed points for a road running left to right through the scene, not
// a formula - this is meant to look like a drawn path. Once real photos
// exist per stop, each pin can carry a thumbnail instead of just an icon
// without touching this geometry.
const POINTS = [
  [60, 330],
  [214, 300],
  [369, 355],
  [523, 310],
  [677, 350],
  [831, 305],
  [986, 355],
  [1140, 320],
];
const ROAD_D =
  "M60,330 C85.7,325.0 162.5,295.8 214.0,300.0 C265.5,304.2 317.5,353.3 369.0,355.0 C420.5,356.7 471.7,310.8 523.0,310.0 C574.3,309.2 625.7,350.8 677.0,350.0 C728.3,349.2 779.5,304.2 831.0,305.0 C882.5,305.8 934.5,352.5 986.0,355.0 C1037.5,357.5 1114.3,325.8 1140.0,320.0";
// Exact cumulative arc-length of ROAD_D at each point, sampled from the real
// bezier curve rather than guessed - the highlighted "traveled" segment
// needs to end exactly at the active pin, not an approximation of it.
const CUM_LENGTHS = [0, 157.6, 323.3, 485.0, 645.2, 806.8, 970.8, 1129.5];
const VB_W = 1200;
const VB_H = 420;
const HILLS_D = "M0,250 Q120,200 300,235 T600,225 T900,240 T1200,215 L1200,420 L0,420 Z";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// The car doesn't jump between stops - it's driven along the real path with
// the browser's own getPointAtLength, animated over time, so clicking a
// distant stop (or holding an arrow key) visibly travels the road instead
// of teleporting.
function RoadMap({ active, onSelect }) {
  const pathRef = useRef(null);
  const rafRef = useRef(null);
  const progressRef = useRef(0);
  const [litLength, setLitLength] = useState(0);
  const [carPoint, setCarPoint] = useState({ x: POINTS[0][0], y: POINTS[0][1] });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const target = CUM_LENGTHS[active];
    const start = progressRef.current;
    const startTime = performance.now();
    const duration = 500;
    cancelAnimationFrame(rafRef.current);

    function frame(now) {
      const raw = Math.min(1, (now - startTime) / duration);
      const eased = easeInOutCubic(raw);
      const current = start + (target - start) * eased;
      progressRef.current = current;
      setLitLength(current);
      const pt = path.getPointAtLength(current);
      setCarPoint({ x: pt.x, y: pt.y });
      if (raw < 1) rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <div className="relative hidden aspect-[1200/420] w-full overflow-hidden rounded-xl border border-border md:block">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--sky-top)" />
            <stop offset="100%" stopColor="var(--sky-bottom)" />
          </linearGradient>
          <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a7a4e" />
            <stop offset="100%" stopColor="#2f5533" />
          </linearGradient>
        </defs>

        {/* sky */}
        <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#sky)" />

        {/* clouds */}
        <g fill="#f3eee8" opacity="0.15">
          <ellipse cx="220" cy="80" rx="55" ry="18" />
          <ellipse cx="270" cy="70" rx="40" ry="16" />
          <ellipse cx="640" cy="110" rx="45" ry="15" />
          <ellipse cx="680" cy="100" rx="32" ry="13" />
        </g>

        {/* sun */}
        <circle cx="1050" cy="90" r="42" fill="var(--brand)" opacity="0.9" />
        <circle cx="1050" cy="90" r="70" fill="var(--brand)" opacity="0.18" />

        {/* hills, sitting behind the grass band for a little depth */}
        <path d={HILLS_D} fill="#264227" opacity="0.85" />

        {/* grass */}
        <rect x="0" y="260" width={VB_W} height={VB_H - 260} fill="url(#grass)" />

        {/* the road itself */}
        <path d={ROAD_D} stroke="#8a8474" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path ref={pathRef} d={ROAD_D} stroke="#c9c3b0" strokeWidth="2" strokeDasharray="10 10" fill="none" strokeLinecap="round" />
        <path d={ROAD_D} stroke="var(--brand)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={`${litLength} 2000`} />
      </svg>

      {POINTS.map(([x, y], i) => {
        const leftPct = (x / VB_W) * 100;
        const topPct = (y / VB_H) * 100;
        const isActive = active === i;
        // Edge stops can't have their label centered on the pin without it
        // spilling past the card's overflow-hidden edge (verified - the last
        // one was visibly clipped). Anchor those away from the boundary
        // instead; the dot underneath stays exactly on the point either way.
        const isFirst = i === 0;
        const isLast = i === POINTS.length - 1;
        const labelClass = isFirst ? "left-0" : isLast ? "right-0" : "left-1/2 -translate-x-1/2";
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${NODES[i].era}: ${NODES[i].title}`}
            className="absolute"
            style={{ left: `${leftPct}%`, top: `${topPct}%` }}
          >
            <span
              className={`absolute bottom-[22px] ${labelClass} whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[0.65rem] font-bold tracking-[0.03em] backdrop-blur-sm transition-colors ${
                isActive
                  ? "border-brand bg-brand/20 text-brand"
                  : "border-white/10 bg-black/20 text-muted-foreground"
              }`}
            >
              {NODES[i].pin}
            </span>
            <FaLocationDot
              className={`absolute -translate-x-1/2 -translate-y-full h-4 w-4 shrink-0 ${isActive ? "text-brand" : "text-white/70"}`}
            />
          </button>
        );
      })}

      {/* the car itself, driven along the path by carPoint rather than snapped to a stop */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-[85%]"
        style={{ left: `${(carPoint.x / VB_W) * 100}%`, top: `${(carPoint.y / VB_H) * 100}%` }}
      >
        <FaCarSide className="h-7 w-7 text-brand" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }} />
      </div>
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
          {active === i ? <FaCarSide className="h-3 w-3" /> : <FaLocationDot className="h-3 w-3" />}
          {n.pin}
        </button>
      ))}
    </div>
  );
}

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, NODES.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="timeline" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">01.</span> How I Got Here
      </Reveal>
      <Reveal>
        <p className="mb-8 max-w-[620px] text-[0.95rem] text-muted-foreground">
          Click a stop on the road, or use the arrow keys to drive through it yourself. The short version:
          the same curiosity kept showing up wearing different clothes.
        </p>
      </Reveal>

      <div className="mb-6 md:hidden">
        <MobileStops active={active} onSelect={setActive} />
      </div>

      <Reveal>
        <RoadMap active={active} onSelect={setActive} />
      </Reveal>

      <div className="mt-10 min-h-[220px] max-w-[680px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
                <node.icon className="h-4 w-4" />
              </span>
              <span className="font-mono text-[0.72rem] font-bold tracking-[0.08em] text-brand uppercase">
                {node.era}
              </span>
            </div>
            <h3 className="mb-4 font-display text-[1.3rem] font-bold text-foreground">{node.title}</h3>
            <div className="flex flex-col gap-4 text-[0.98rem] leading-relaxed text-muted-foreground">
              {node.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
