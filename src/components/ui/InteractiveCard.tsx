"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { easeOut } from "@/lib/motion";

/* Resting + active visuals driven by Framer Motion (transform / shadow / border).
   Hex values mirror the @theme tokens in globals.css so the card matches the
   rest of the design system. */
const LINE = "#d8d0c0"; // --color-line
const ACTIVE_BORDER = "rgba(139, 106, 61, 0.4)"; // bronze @ 40%
const GLOW = "0 26px 60px -24px rgba(139, 106, 61, 0.38)";
const NO_GLOW = "0 26px 60px -24px rgba(139, 106, 61, 0)";

/**
 * True when the device's primary input can hover (i.e. a desktop pointer).
 * Defaults to `true` for SSR so the rendered markup is stable; it's corrected
 * after mount, which only changes event behaviour (no visual change → no
 * hydration mismatch).
 */
function useHoverable() {
  const [hoverable, setHoverable] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverable(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return hoverable;
}

type InteractiveCardProps = {
  /** Render-prop so children can mirror the hover/tap state with their own styles. */
  children: (active: boolean) => ReactNode;
  className?: string;
  /** Lift distance in px (default -8). */
  lift?: number;
};

/**
 * A card that plays its hover animation on desktop hover AND on mobile tap.
 *
 * Uses Framer Motion's gesture + `animate` driving (pointer-based), which is
 * reliable on iOS Safari — unlike the `whileInView` viewport detection that
 * previously refused to animate there. Desktop is driven by hover; touch
 * devices toggle the active state on tap.
 */
export function InteractiveCard({ children, className, lift = -8 }: InteractiveCardProps) {
  const reduce = useReducedMotion();
  const hoverable = useHoverable();
  const [active, setActive] = useState(false);

  return (
    <motion.article
      className={className}
      initial={false}
      animate={
        reduce
          ? { borderColor: active ? ACTIVE_BORDER : LINE }
          : {
              y: active ? lift : 0,
              boxShadow: active ? GLOW : NO_GLOW,
              borderColor: active ? ACTIVE_BORDER : LINE,
            }
      }
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.4, ease: easeOut }}
      // Triggers use native DOM events (not FM gestures): rock-solid on iOS and
      // every browser. Desktop = hover; touch devices = tap to toggle. The two
      // are gated by `hoverable` so emulated mouse events on phones don't fight
      // the tap toggle.
      onMouseEnter={() => {
        if (hoverable) setActive(true);
      }}
      onMouseLeave={() => {
        if (hoverable) setActive(false);
      }}
      onClick={() => {
        if (!hoverable) setActive((a) => !a);
      }}
    >
      {children(active)}
    </motion.article>
  );
}
