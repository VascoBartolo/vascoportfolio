import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  itemClassName?: string;
}

/** Infinite horizontal ticker with edge fade; pauses on hover. */
export function Marquee({
  items,
  reverse = false,
  duration = 42,
  className,
  itemClassName,
}: MarqueeProps) {
  const style = { ["--marquee-duration" as string]: `${duration}s` };
  return (
    <div
      className={cn("group relative w-full overflow-hidden mask-fade-x", className)}
      style={style}
    >
      <div
        className={cn(
          "flex w-max items-center gap-4 [animation-play-state:running] group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <div className="flex items-center gap-4 pr-4" key={copy} aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={i} className={cn("shrink-0", itemClassName)}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
