"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The hero pitch, written the way a PE reader already scans: a one-page
// teaser. Each row links to the section that backs it up.
const ROWS = [
  { label: "Asset", value: "Manish Mandala", href: "#home" },
  { label: "Sector", value: "Mechanical Engineering, Ohio State", href: "#timeline" },
  {
    label: "Thesis",
    value: "An engineer's discipline plus a lifelong habit of asking why machines, businesses, and people work",
    href: "#why-things-work",
  },
  {
    label: "Track record",
    value: "Robotics team lead · Buckeye PEVC analyst · Scarlet Investment Group · Northwestern research",
    href: "#timeline",
  },
  { label: "The ask", value: "A seat in the Fall 2026 cohort", href: "#thesis" },
];

export function DealSnapshot() {
  const [showMitigant, setShowMitigant] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl border border-border bg-card p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-[0.7rem] font-bold tracking-[0.1em] text-brand uppercase">
          Candidate Teaser
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.06em] text-muted-foreground uppercase">
          1 page
        </span>
      </div>

      <dl className="flex flex-col">
        {ROWS.map((row, i) => (
          <motion.a
            key={row.label}
            href={row.href}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
            className="group grid grid-cols-[96px_1fr] gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-brand/5"
          >
            <dt className="pt-0.5 font-mono text-[0.66rem] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
              {row.label}
            </dt>
            <dd className="text-[0.9rem] leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
              {row.value}
            </dd>
          </motion.a>
        ))}

        <motion.button
          type="button"
          onClick={() => setShowMitigant((v) => !v)}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 + ROWS.length * 0.08 }}
          className="mt-2 grid grid-cols-[96px_1fr] gap-3 rounded-md border border-dashed border-brand/40 px-2 py-2.5 text-left transition-colors hover:bg-brand/5"
          aria-expanded={showMitigant}
        >
          <span className="pt-0.5 font-mono text-[0.66rem] font-semibold tracking-[0.06em] text-brand uppercase">
            Key risk
          </span>
          <span className="text-[0.9rem] leading-snug text-foreground/90">
            Hasn&apos;t built an LBO model yet.{" "}
            <span className="font-mono text-[0.7rem] text-brand">{showMitigant ? "▲" : "see mitigant ▼"}</span>
            <AnimatePresence>
              {showMitigant && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="block overflow-hidden"
                >
                  <span className="block pt-2 text-muted-foreground">
                    That&apos;s exactly what Recalc teaches: accounting, business analysis, and LBO modeling.
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </dl>
    </motion.div>
  );
}
