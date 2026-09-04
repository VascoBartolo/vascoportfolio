import { createElement, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, scrollState } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface SplitTextProps {
  text: string;
  as?: Tag;
  className?: string;
  /** Animate per character or per word. */
  by?: "chars" | "words";
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Add a blur-in on top of the mask reveal. */
  blur?: boolean;
  start?: string;
  /** Render this node after the text (e.g. an accent word). */
  after?: ReactNode;
  /** Render statically with no animation (used by the looping hero clone). */
  disabled?: boolean;
}

/**
 * GSAP-driven text reveal: each word is masked and its units rise into view
 * with a stagger. Inspired by React Bits' SplitText.
 */
export function SplitText({
  text,
  as = "span",
  className,
  by = "words",
  immediate = false,
  delay = 0,
  stagger,
  duration = 1.1,
  blur = false,
  start = "top 88%",
  after,
  disabled = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  const nodes = useMemo(() => {
    const words = text.split(" ");
    const out: ReactNode[] = [];
    words.forEach((word, wi) => {
      out.push(
        <span className="split-line" key={`w${wi}`}>
          {by === "chars"
            ? Array.from(word).map((ch, ci) => (
                <span className="split-unit" key={ci}>
                  {ch}
                </span>
              ))
            : <span className="split-unit">{word}</span>}
        </span>,
      );
      if (wi < words.length - 1)
        out.push(
          <span className="split-unit is-space" key={`s${wi}`}>
            {" "}
          </span>,
        );
    });
    return out;
  }, [text, by]);

  // Gradient text (`background-clip: text`) cannot paint through transformed
  // descendants in Chromium, so each unit is given its own slice of the
  // parent's gradient, offset so the gradient stays continuous.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Each unit gets the whole gradient over its own box (no measuring, so
    // the entrance transforms can't skew it). Vertical gradients look
    // identical; horizontal ones restart per word, which reads fine.
    const cs = getComputedStyle(el);
    const clip = cs.webkitBackgroundClip || cs.backgroundClip;
    if (clip !== "text" || cs.backgroundImage === "none") return;
    el.querySelectorAll<HTMLElement>(".split-unit").forEach((u) => {
      u.style.backgroundImage = cs.backgroundImage;
      u.style.webkitBackgroundClip = "text";
      u.style.backgroundClip = "text";
      u.style.color = "transparent";
    });
  }, [nodes]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || disabled || scrollState.reducedMotion) return;
    const units = el.querySelectorAll<HTMLElement>(".split-line .split-unit");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        units,
        {
          yPercent: 115,
          opacity: 0,
          rotateZ: by === "chars" ? 4 : 2,
          filter: blur ? "blur(10px)" : "blur(0px)",
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power4.out",
          stagger: stagger ?? (by === "chars" ? 0.028 : 0.06),
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start, once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [nodes, by, immediate, delay, stagger, duration, blur, start, disabled]);

  return createElement(
    as,
    { ref, className: cn("inline-block", className), "aria-label": text },
    nodes,
    after,
  );
}

/** Re-export so sections can refresh triggers after layout changes. */
export { ScrollTrigger };
