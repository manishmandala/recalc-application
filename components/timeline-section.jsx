"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLocationDot,
  FaCarSide,
  FaBolt,
  FaFutbol,
  FaRobot,
  FaBriefcase,
  FaCompass,
  FaPeopleGroup,
  FaChartLine,
  FaFlask,
  FaSeedling,
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const NODES = [
  {
    era: "Childhood",
    pin: "Childhood",
    icon: FaBolt,
    title: "Fan remotes",
    tldr: "Took apart fan remotes to find the rules hiding inside them.",
    skill: "Curiosity",
    body: [
      "As a kid I pulled apart fan remotes just to see how the switches worked, then tried to figure out if I could get one remote to control a fan in a different room. It never fully worked. I kept doing it anyway, because something in the room was operating on rules I could actually go find.",
    ],
  },
  {
    era: "Growing Up",
    pin: "Soccer & FIFA",
    icon: FaFutbol,
    title: "Manager mode",
    tldr: "Spent hours rebuilding FIFA teams on a fixed budget. My first lesson in allocating capital.",
    skill: "Strategy",
    body: [
      "The first place I really thought about strategy was soccer, and specifically FIFA's manager mode. I'd spend hours taking over a team that wasn't working and trying to rebuild it: how to spend a limited transfer budget, who was worth buying, who to sell, and which tactics actually fit the players I had instead of the ones I wished I had. Every season told me whether my calls were right.",
      "Eventually I started bringing that same thinking onto the actual field, paying attention to why one formation or matchup worked and another fell apart. Looking back, that was the first version of a mindset that has stuck with me through everything since: look at the whole system, figure out what's really driving results, and decide where limited resources will do the most good.",
    ],
  },
  {
    era: "Middle School",
    pin: "Middle School",
    icon: FaRobot,
    title: "Robotics, and a bag of snow",
    tldr: "Led a robotics team, and once packed snow around an overheating robot at states to keep it running.",
    skill: "Debugging under pressure",
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
    tldr: "Noticed that equal effort lands in very different places, and wanted to know why.",
    skill: "Business sense",
    body: [
      "High school pointed that same question somewhere new. Through DECA I started noticing that two ideas could take the same amount of effort and land in completely different places, and I wanted to know why one worked and the other didn't.",
    ],
  },
  {
    era: "College Decision",
    pin: "Choosing ME",
    icon: FaCompass,
    title: "Choosing mechanical engineering",
    tldr: "Picked the harder discipline first, for the person it would make me, not just the job.",
    skill: "Grit",
    body: [
      "I looked at finance seriously before college and picked mechanical engineering instead. Not because the curiosity about business went away, but because I figured it would follow me regardless of major, and I wanted four years that forced a different kind of discipline first. Betting on the harder unknown felt like the right trade.",
      "It wasn't only a career decision, either. I wanted to grow into a certain kind of person: someone who stays patient with a problem that won't give, who can be stuck or wrong for a while without getting rattled, and who keeps going when the first answer fails. Engineering builds that whether you want it to or not. Those habits show up well outside of class too, in how I handle setbacks, how I work with people when a plan falls apart, and how I approach anything I'm new at.",
    ],
  },
  {
    era: "Ohio State",
    pin: "Phi Chi Theta",
    icon: FaPeopleGroup,
    title: "Phi Chi Theta",
    tldr: "The community that pushes me to be better, and showed me why different perspectives matter.",
    skill: "Community",
    body: [
      "In college I joined Phi Chi Theta, a professional business fraternity, because I wanted to be around people who took business as seriously as I did, which wasn't easy to find in a schedule full of engineering classes. It has become the community that shapes me most. The people there are ambitious and similar-minded, and being around them raises my own standard without anyone having to say a word.",
      "What surprised me was how much the differences matter. People come in with different backgrounds, majors, and ways of thinking, and the best conversations happen when someone sees a problem in a way I never would have. Upperclassmen a few interviews ahead of me and professionals willing to say what actually matters have shown me that you grow fastest when you surround yourself with people who push you and think differently than you do.",
      "That's exactly what I'm looking for in Recalc: a cohort of people who care about the same things but come from different places, and who make each other better.",
    ],
  },
  {
    era: "Ohio State",
    pin: "Learning Finance",
    icon: FaChartLine,
    title: "Learning finance on purpose",
    tldr: "Researching startups at Buckeye PEVC, and trying to beat the market through Scarlet Investment Group.",
    skill: "Finance fundamentals",
    body: [
      "Alongside that, I started actually studying the finance side instead of admiring it from a distance. As a business analyst at Buckeye PEVC, Ohio State's private equity and venture capital group, I've been learning how LBOs work, how PE and VC investors approach a decision differently, and what separates a business that's fixable from one that simply isn't going to work.",
      "My interest in finance really comes from two places. The first is startups: researching them, figuring out which ones have something real, and eventually building my own. The second is the stock market. I love investing and the challenge of trying to beat the market, and especially the strategy behind an investment thesis: deciding what you believe about a company, why, and what would prove you wrong.",
      "Scarlet Investment Group is where I get to practice that second part, and it's the version of finance that runs on math and discipline instead of instinct, which appeals to the engineer in me. I haven't run a deal or managed a real portfolio. What I've done is get serious about understanding how the people who do make their decisions.",
    ],
  },
  {
    era: "Ongoing",
    pin: "Research & Robots",
    icon: FaFlask,
    title: "Northwestern research, and two robots",
    tldr: "Northwestern simulation research, a vision-guided tracker, and an autonomous drone.",
    skill: "Patience with the unknown",
    body: [
      "Separately, I worked on a simulation tool for metal additive manufacturing through a research position at Northwestern. I'd rather point at it briefly than dwell on it. What it actually taught me was how to sit with a problem I didn't understand yet and take it apart piece by piece without pretending I already knew the answer.",
      "The building never really stopped, either: a vision-guided tracking system, and now an autonomous drone.",
    ],
  },
  {
    era: "Right Now",
    pin: "Right Now",
    icon: FaSeedling,
    title: "Tying it together",
    tldr: "Same instinct, different material. Now I need the numbers to back it up.",
    skill: "Next up: Recalc",
    body: [
      "Put the fan remotes, the manager mode saves, the robots, the businesses, and the finance clubs next to each other and they stop looking like a scattered resume. They're the same instinct pointed at different material: take something apart, find what's actually driving it, and see if there's a better way to put it back together.",
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
  [195, 300],
  [330, 352],
  [465, 310],
  [600, 350],
  [735, 305],
  [870, 355],
  [1005, 305],
  [1140, 358],
];
const ROAD_D =
  "M60,330 C82.5,325.0 150.0,296.3 195.0,300.0 C240.0,303.7 285.0,350.3 330.0,352.0 C375.0,353.7 420.0,310.3 465.0,310.0 C510.0,309.7 555.0,350.8 600.0,350.0 C645.0,349.2 690.0,304.2 735.0,305.0 C780.0,305.8 825.0,355.0 870.0,355.0 C915.0,355.0 960.0,304.5 1005.0,305.0 C1050.0,305.5 1117.5,349.2 1140.0,358.0";
// Exact cumulative arc-length of ROAD_D at each point, sampled from the real
// bezier curve rather than guessed - the highlighted "traveled" segment
// needs to end exactly at the active pin, not an approximation of it.
const CUM_LENGTHS = [0.0, 139.1, 284.9, 427.6, 569.6, 713.2, 858.6, 1004.2, 1150.3];
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
  const [expanded, setExpanded] = useState(false);
  const [driving, setDriving] = useState(false);
  const node = NODES[active];
  const last = NODES.length - 1;

  // Only left/right: up/down belong to page scrolling, and hijacking them
  // made the rest of the page hard to read with a keyboard.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight") {
        setDriving(false);
        setActive((a) => Math.min(a + 1, last));
      } else if (e.key === "ArrowLeft") {
        setDriving(false);
        setActive((a) => Math.max(a - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [last]);

  // Auto-drive: a hands-off tour for a reader who just wants the highlights.
  useEffect(() => {
    if (!driving) return;
    if (active >= last) {
      setDriving(false);
      return;
    }
    const id = setTimeout(() => setActive((a) => a + 1), 4200);
    return () => clearTimeout(id);
  }, [driving, active, last]);

  function toggleDrive() {
    if (!driving && active >= last) setActive(0);
    setExpanded(false);
    setDriving((d) => !d);
  }

  function select(i) {
    setDriving(false);
    setActive(Math.max(0, Math.min(last, i)));
  }

  return (
    <section id="timeline" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-4 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">01.</span> How I Got Here
      </Reveal>
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[560px] text-[0.95rem] text-muted-foreground">
            Nine stops, one habit that kept showing up. Hit auto-drive for the highlights, or click any stop.
          </p>
          <button
            type="button"
            onClick={toggleDrive}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-[0.85rem] font-semibold text-[#2a1608] transition-colors hover:bg-brand-hover"
          >
            {driving ? <FaPause className="h-3 w-3" /> : <FaPlay className="h-3 w-3" />}
            {driving ? "Pause" : active >= last ? "Drive it again" : "Auto-drive"}
          </button>
        </div>
      </Reveal>

      <div className="mb-6 md:hidden">
        <MobileStops active={active} onSelect={select} />
      </div>

      <Reveal>
        <RoadMap active={active} onSelect={select} />
      </Reveal>

      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full bg-brand"
          initial={false}
          animate={{ width: `${(active / last) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto]">
        <div className="min-h-[200px] max-w-[680px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
                  <node.icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[0.72rem] font-bold tracking-[0.08em] text-brand uppercase">
                  {node.era}
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.65rem] tracking-[0.04em] text-muted-foreground uppercase">
                  Built: {node.skill}
                </span>
              </div>
              <h3 className="mb-2 font-display text-[1.35rem] font-bold text-foreground">{node.title}</h3>
              <p className="mb-4 font-display text-[1.1rem] leading-snug text-foreground/90">{node.tldr}</p>

              <button
                type="button"
                onClick={() => {
                  setDriving(false);
                  setExpanded((v) => !v);
                }}
                aria-expanded={expanded}
                className="flex items-center gap-1.5 font-mono text-[0.72rem] font-semibold tracking-[0.04em] text-brand uppercase hover:text-brand-hover"
              >
                {expanded ? "Hide the full story" : "Read the full story"}
                <FaChevronDown className={`h-2.5 w-2.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4 pt-4 text-[0.97rem] leading-relaxed text-muted-foreground">
                      {node.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-start gap-2 md:flex-col md:items-end">
          <span className="font-mono text-[0.72rem] tracking-[0.06em] text-muted-foreground uppercase md:mb-1">
            Stop {active + 1} / {NODES.length}
          </span>
          <div className="ml-auto flex gap-2 md:ml-0">
            <button
              type="button"
              onClick={() => select(active - 1)}
              disabled={active === 0}
              aria-label="Previous stop"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-30"
            >
              <FaChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => select(active + 1)}
              disabled={active === last}
              aria-label="Next stop"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-30"
            >
              <FaChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
