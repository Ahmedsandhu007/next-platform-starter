"use client";

import { useEffect } from "react";

/**
 * Plays the CSS scroll-reveals (adds `.is-visible`). Pure CSS transitions +
 * a single IntersectionObserver — reliable on iOS/WebKit where Framer Motion's
 * whileInView is flaky.
 *
 * An IntersectionObserver gives the nice on-enter timing; a throttled scroll
 * "sweep" is a safety net that reveals anything already in/above the viewport
 * (covers fast flicks and anchor jumps the observer can skip), so content can
 * never end up stuck hidden. If JS is off entirely, the CSS leaves everything
 * visible anyway.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger], [data-reveal-line]"),
    );
    if (els.length === 0) return;

    const reveal = (el: Element) => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    // Safety net: reveal anything that has already entered the viewport.
    const sweep = () => {
      const limit = window.innerHeight * 0.95;
      for (const el of els) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < limit) {
          reveal(el);
          io.unobserve(el);
        }
      }
    };
    sweep();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sweep();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
