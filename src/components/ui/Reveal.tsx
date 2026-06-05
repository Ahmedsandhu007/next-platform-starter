"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, createElement } from "react";
import { easeOut, viewportOnce } from "@/lib/motion";

const motionTags = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  span: motion.span,
  section: motion.section,
  p: motion.p,
} as const;

type Tag = keyof typeof motionTags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay (seconds) for sequencing reveals */
  delay?: number;
  /** Vertical travel distance in px */
  y?: number;
  as?: Tag;
};

/**
 * Fade + slide-in once the element scrolls into view.
 * Falls back to a static, fully-visible render when the user
 * prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return createElement(as, { className }, children);
  }

  const MotionTag = motionTags[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      {children}
    </MotionTag>
  );
}
