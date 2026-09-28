"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Fade + rise into view as the reader scrolls to it. `delay` lets callers
// stagger a group of siblings (e.g. 0, 0.06, 0.12 ...).
//
// Driven by a real IntersectionObserver + explicit state rather than
// Framer Motion's whileInView, which behaved unreliably here with a
// conditional `initial` (elements resolved to visible immediately).
export function Reveal({ children, delay = 0, className, as = "div", ...props }) {
  const [entered, setEntered] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      ref={elRef}
      initial={false}
      animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
