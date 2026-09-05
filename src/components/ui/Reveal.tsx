import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, isTouchDevice, scrollState } from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  y?: number;
  /** Animate direct children with a stagger instead of the wrapper. */
  stagger?: number;
  immediate?: boolean;
  start?: string;
  scale?: number;
  disabled?: boolean;
}

/** Scroll-triggered block reveal (rise + fade + soft blur) powered by GSAP. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  duration = 1.1,
  y = 36,
  stagger,
  immediate = false,
  start = "top 88%",
  scale = 1,
  disabled = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || disabled || scrollState.reducedMotion) return;
    const targets = stagger !== undefined ? Array.from(el.children) : el;
    // Animating a blur filter is a full repaint per frame; on phones that
    // hitches, especially when several reveals start as a pinned section
    // releases, so touch devices reveal with motion + opacity only.
    const blur = !isTouchDevice();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0, filter: blur ? "blur(8px)" : "none", scale },
        {
          y: 0,
          opacity: 1,
          filter: blur ? "blur(0px)" : "none",
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          clearProps: "filter",
          scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, duration, y, stagger, immediate, start, scale, disabled]);

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
