import { useLayoutEffect, useRef } from "react";
import { gsap, scrollState } from "@/lib/scroll";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Play immediately (hero) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
  disabled?: boolean;
}

/** Counts from 0 to `value` when scrolled into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  immediate = false,
  delay = 0,
  disabled = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (disabled || scrollState.reducedMotion) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: value,
        duration,
        delay,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
        },
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [value, prefix, suffix, duration, immediate, delay, disabled]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
