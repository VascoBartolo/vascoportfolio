import {
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds a subtle 3D tilt that follows the pointer. */
  tilt?: boolean;
  strong?: boolean;
}

/** Glass card with a cursor-following spotlight and glowing border. */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  strong = false,
  onPointerMove,
  onPointerLeave,
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useRef<((v: number) => void) | null>(null);
  const ry = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !tilt || !window.matchMedia("(hover: hover)").matches) return;
    rx.current = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
    ry.current = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });
    gsap.set(el, { transformPerspective: 900 });
  }, [tilt]);

  const move = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--sx", `${px * 100}%`);
        el.style.setProperty("--sy", `${py * 100}%`);
        if (tilt) {
          rx.current?.((0.5 - py) * 8);
          ry.current?.((px - 0.5) * 10);
        }
      }
      onPointerMove?.(e);
    },
    [onPointerMove, tilt],
  );

  const leave = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (tilt) {
        rx.current?.(0);
        ry.current?.(0);
      }
      onPointerLeave?.(e);
    },
    [onPointerLeave, tilt],
  );

  return (
    <div
      ref={ref}
      {...rest}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "spotlight-card rounded-xl",
        strong ? "glass-strong" : "glass",
        "transition-[border-color,box-shadow] duration-500 hover:border-white/[0.14]",
        className,
      )}
    >
      {children}
    </div>
  );
}
