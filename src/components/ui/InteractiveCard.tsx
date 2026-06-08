"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { easeOut } from "@/lib/motion";
import { useTapActivate } from "@/components/ui/useTapActivate";

/* Resting + active visuals driven by Framer Motion (transform / shadow / border).
   Hex values mirror the @theme tokens in globals.css. */
const LINE = "#d8d0c0"; // --color-line
const ACTIVE_BORDER = "rgba(139, 106, 61, 0.4)"; // bronze @ 40%
const GLOW = "0 26px 60px -24px rgba(139, 106, 61, 0.38)";
const NO_GLOW = "0 26px 60px -24px rgba(139, 106, 61, 0)";

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
 * Framer Motion's `animate` + `whileTap` drive the motion (reliable on iOS
 * Safari, unlike the `whileInView` viewport detection used before). The trigger
 * (hover vs tap, single-active coordination) comes from {@link useTapActivate}.
 */
export function InteractiveCard({ children, className, lift = -8 }: InteractiveCardProps) {
  const reduce = useReducedMotion();
  const { active, bind } = useTapActivate();

  return (
    <motion.article
      {...bind}
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
    >
      {children(active)}
    </motion.article>
  );
}
