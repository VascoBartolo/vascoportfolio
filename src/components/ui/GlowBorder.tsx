import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { PulsingBorder } from "@paper-design/shaders-react";
import { onScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** Site accents only: sky → indigo → blue. */
const ACCENT_COLORS = ["#38bdf8", "#6366f1", "#60a5fa"];

interface GlowBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Corner radius of the framed element, in px (matches its border-radius). */
  radius?: number;
  /** How far the glow may reach outside the frame, in px. */
  spread?: number;
  colors?: string[];
}

/**
 * Sober pulsing accent border (paper-design "PulsingBorder" shader) drawn on
 * a canvas that sits just outside the framed element. The canvas is only
 * mounted while the element is near the viewport, so it costs nothing while
 * off screen. Ancestors must not clip overflow for the glow to show.
 */
export function GlowBorder({
  children,
  className,
  radius = 24,
  spread = 18,
  colors = ACCENT_COLORS,
  style,
  ...rest
}: GlowBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setSize((p) => (p.w === w && p.h === h ? p : { w, h }));
    };
    // Visibility from the element's rect (checked on mount and on every
    // smooth-scroll event) with an IntersectionObserver as a backup.
    const MARGIN = 240;
    const check = () => {
      const r = el.getBoundingClientRect();
      const visible =
        r.bottom > -MARGIN &&
        r.top < window.innerHeight + MARGIN &&
        r.right > -MARGIN &&
        r.left < window.innerWidth + MARGIN;
      setNear((p) => (p === visible ? p : visible));
    };
    measure();
    check();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: `${MARGIN}px` },
    );
    io.observe(el);
    const unsubscribe = onScroll(check);
    return () => {
      ro.disconnect();
      io.disconnect();
      unsubscribe();
    };
  }, []);

  // The shader's "world" is the frame plus the spread; margins put the ring
  // back onto the frame, and extra room lets the glow fade before the edge.
  const worldW = size.w + spread * 2;
  const worldH = size.h + spread * 2;
  const room = Math.min(240, Math.ceil(0.3 * Math.min(worldW, worldH)));
  const bleed = spread + room;
  const measured = size.w > 0 && size.h > 0;
  const roundness = measured
    ? Math.min(1, Math.max(0, (radius * 2) / Math.min(worldW, worldH)))
    : 0.2;

  const canvasStyle: CSSProperties = {
    position: "absolute",
    left: -bleed,
    top: -bleed,
    width: size.w + bleed * 2,
    height: size.h + bleed * 2,
    pointerEvents: "none",
    zIndex: 0,
  };

  return (
    <div
      ref={ref}
      {...rest}
      style={style}
      className={cn("relative", className)}
      data-glow-state={import.meta.env.DEV ? `${near}:${size.w}x${size.h}` : undefined}
    >
      {near && measured && (
        <PulsingBorder
          colors={colors}
          colorBack="rgba(0, 0, 0, 0)"
          speed={0.45}
          roundness={roundness}
          thickness={0.04}
          softness={0.8}
          intensity={0.18}
          bloom={0.3}
          spots={2}
          spotSize={0.25}
          pulse={0}
          smoke={0.12}
          smokeSize={0.5}
          worldWidth={worldW}
          worldHeight={worldH}
          fit="none"
          marginLeft={spread / worldW}
          marginRight={spread / worldW}
          marginTop={spread / worldH}
          marginBottom={spread / worldH}
          scale={1}
          style={canvasStyle}
        />
      )}
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
