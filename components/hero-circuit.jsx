"use client";

import { useEffect, useRef } from "react";

// Faint circuit-trace line art with a traveling "electricity" pulse, ported
// from the portfolio's hero-circuit.jsx. Simplified for this site: every pad
// glows the single brand gold instead of eight category colors, since there's
// no skill-category system here.
const PADS = [
  { x: 240, y: 20 },
  { x: 90, y: 60 },
  { x: 380, y: 110 },
  { x: 560, y: 10 },
  { x: 60, y: 80 },
  { x: 140, y: 610 },
  { x: 420, y: 555 },
  { x: 580, y: 570 },
  { x: 20, y: 560 },
];

const TRACES = [
  { d: "M0,60 L90,60 L90,20 L240,20", points: [[0, 60], [90, 60], [90, 20], [240, 20]], speedFactor: 1 },
  { d: "M560,10 L560,75 L470,75 L470,110 L380,110", points: [[560, 10], [560, 75], [470, 75], [470, 110], [380, 110]], speedFactor: 1.7 },
  { d: "M150,110 L150,80 L60,80", points: [[150, 110], [150, 80], [60, 80]], speedFactor: 0.6 },
  { d: "M20,560 L20,610 L140,610", points: [[20, 560], [20, 610], [140, 610]], speedFactor: 1.3 },
  { d: "M300,640 L300,590 L420,590 L420,555", points: [[300, 640], [300, 590], [420, 590], [420, 555]], speedFactor: 0.8 },
  { d: "M480,610 L580,610 L580,570", points: [[480, 610], [580, 610], [580, 570]], speedFactor: 1.5 },
];

function polylineLength(points) {
  let len = 0;
  for (let i = 0; i < points.length - 1; i++) {
    len += Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
  }
  return len;
}
const BASE_TRACE_MS = 2200;
const PAUSE_MS = 450;
const FADE_MS = 220;
TRACES.forEach((trace) => {
  trace.length = polylineLength(trace.points);
  trace.duration = BASE_TRACE_MS * trace.speedFactor;
  trace.slot = trace.duration + PAUSE_MS;
});
const TOTAL_CYCLE_MS = TRACES.reduce((sum, t) => sum + t.slot, 0);
const PULSE_PAD_RADIUS = 26;

const JOINTS = [];
TRACES.forEach((trace) => {
  trace.points.forEach(([x, y]) => {
    if (!JOINTS.some((j) => j.x === x && j.y === y)) JOINTS.push({ x, y });
  });
});

function pointAtDistance(points, dist) {
  let remaining = dist;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const segLen = Math.hypot(x2 - x1, y2 - y1);
    if (remaining <= segLen || i === points.length - 2) {
      const t = segLen === 0 ? 0 : Math.max(0, Math.min(1, remaining / segLen));
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
    }
    remaining -= segLen;
  }
  return points[points.length - 1];
}

const GLOW_RADIUS_PX = 140;
const TRAIL_LENGTH = 90;
const TRAIL_SAMPLES = 16;

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function distToPolyline(px, py, points) {
  let min = Infinity;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    min = Math.min(min, distToSegment(px, py, x1, y1, x2, y2));
  }
  return min;
}

export function HeroCircuit() {
  const svgRef = useRef(null);
  const padRefs = useRef([]);
  const jointRefs = useRef([]);
  const traceRefs = useRef([]);
  const pulsePathRef = useRef(null);
  const pulseGradientRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function handleMove(e) {
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scaleX = rect.width / 640;
      const scaleY = rect.height / 640;

      PADS.forEach((pad, i) => {
        const el = padRefs.current[i];
        if (!el) return;
        const padScreenX = rect.left + pad.x * scaleX;
        const padScreenY = rect.top + pad.y * scaleY;
        const dist = Math.hypot(e.clientX - padScreenX, e.clientY - padScreenY);
        const intensity = Math.max(0, 1 - dist / GLOW_RADIUS_PX);
        el.style.setProperty("--glow", intensity.toFixed(3));
      });

      const vx = (e.clientX - rect.left) / scaleX;
      const vy = (e.clientY - rect.top) / scaleY;
      TRACES.forEach((trace, i) => {
        const el = traceRefs.current[i];
        if (!el) return;
        const dist = distToPolyline(vx, vy, trace.points) * Math.min(scaleX, scaleY);
        const intensity = Math.max(0, 1 - dist / GLOW_RADIUS_PX);
        el.style.setProperty("--glow", intensity.toFixed(3));
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId = null;

    function frame(t) {
      const elapsed = t % TOTAL_CYCLE_MS;
      let acc = 0;
      let trace = TRACES[TRACES.length - 1];
      let localElapsed = trace.slot;
      for (const tr of TRACES) {
        if (elapsed < acc + tr.slot) {
          trace = tr;
          localElapsed = elapsed - acc;
          break;
        }
        acc += tr.slot;
      }

      let x, y, opacity, currentDist;
      if (localElapsed < trace.duration) {
        const localT = localElapsed / trace.duration;
        currentDist = localT * trace.length;
        [x, y] = pointAtDistance(trace.points, currentDist);
        const fadeOutStart = trace.duration - FADE_MS;
        if (localElapsed > fadeOutStart) {
          opacity = Math.max(0, 1 - (localElapsed - fadeOutStart) / FADE_MS);
        } else if (localElapsed < FADE_MS) {
          opacity = localElapsed / FADE_MS;
        } else {
          opacity = 1;
        }
      } else {
        currentDist = trace.length;
        [x, y] = trace.points[trace.points.length - 1];
        opacity = 0;
      }

      const trailPoints = [[x, y]];
      for (let i = 1; i <= TRAIL_SAMPLES; i++) {
        const d = Math.max(0, currentDist - (i / TRAIL_SAMPLES) * TRAIL_LENGTH);
        trailPoints.push(pointAtDistance(trace.points, d));
      }

      if (pulsePathRef.current) {
        const dAttr = trailPoints.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px},${py}`).join(" ");
        pulsePathRef.current.setAttribute("d", dAttr);
        pulsePathRef.current.style.opacity = opacity;
      }
      if (pulseGradientRef.current) {
        const [tailX, tailY] = trailPoints[trailPoints.length - 1];
        pulseGradientRef.current.setAttribute("x1", tailX);
        pulseGradientRef.current.setAttribute("y1", tailY);
        pulseGradientRef.current.setAttribute("x2", x);
        pulseGradientRef.current.setAttribute("y2", y);
      }

      PADS.forEach((pad, i) => {
        const el = padRefs.current[i];
        if (!el) return;
        const dist = Math.hypot(pad.x - x, pad.y - y);
        const intensity = opacity * Math.max(0, 1 - dist / PULSE_PAD_RADIUS);
        el.style.setProperty("--pulse-glow", intensity.toFixed(3));
      });

      JOINTS.forEach((joint, i) => {
        const el = jointRefs.current[i];
        if (!el) return;
        const dist = Math.hypot(joint.x - x, joint.y - y);
        const intensity = opacity * Math.max(0, 1 - dist / PULSE_PAD_RADIUS);
        el.style.opacity = intensity.toFixed(3);
      });

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute top-0 left-0 hidden h-full w-[min(640px,58%)] fill-none opacity-70 md:block"
      viewBox="0 0 640 640"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((trace, i) => (
          <path
            key={i}
            ref={(el) => (traceRefs.current[i] = el)}
            d={trace.d}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
            style={{
              "--glow": 0,
              stroke: "color-mix(in srgb, white calc(20% + var(--glow) * 80%), transparent)",
              filter: "drop-shadow(0 0 calc(var(--glow) * 5px) white)",
            }}
          />
        ))}
      </g>
      <defs>
        <linearGradient ref={pulseGradientRef} id="pulseGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        ref={pulsePathRef}
        fill="none"
        stroke="url(#pulseGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 3px white)" }}
      />
      <g>
        {JOINTS.map((joint, i) => (
          <circle
            key={i}
            ref={(el) => (jointRefs.current[i] = el)}
            cx={joint.x}
            cy={joint.y}
            r="3.5"
            fill="white"
            opacity="0"
            style={{ filter: "drop-shadow(0 0 8px white)" }}
          />
        ))}
      </g>
      <g>
        {PADS.map((pad, i) => (
          <circle
            key={i}
            ref={(el) => (padRefs.current[i] = el)}
            cx={pad.x}
            cy={pad.y}
            r="5"
            style={{
              "--glow": 0,
              "--pulse-glow": 0,
              fill: "color-mix(in srgb, var(--brand) calc(var(--glow) * 100%), var(--border))",
              filter: "drop-shadow(0 0 calc(var(--glow) * 7px) var(--brand)) drop-shadow(0 0 calc(var(--pulse-glow) * 9px) white)",
            }}
          />
        ))}
      </g>
    </svg>
  );
}
