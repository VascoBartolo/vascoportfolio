import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "a" | "button" | "span" | "nav";

interface LiquidGlassProps extends HTMLAttributes<HTMLElement> {
  as?: Tag;
  children?: ReactNode;
  /** CSS border-radius; defaults to a full pill. */
  radius?: string;
  /** Enables the hover lift / press scale. */
  interactive?: boolean;
  /** Skip the refraction filter (better for wide surfaces like the navbar). */
  displace?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  contentClassName?: string;
  "aria-label"?: string;
}

/**
 * Apple-style "liquid glass" surface. A displacement-mapped backdrop filter
 * (Chromium) refracts the page behind it; other engines fall back to a
 * frosted blur. Highlights track the pointer.
 */
export function LiquidGlass({
  as = "div",
  children,
  className,
  contentClassName,
  radius = "9999px",
  interactive = false,
  displace = true,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--lg-x", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--lg-y", `${((e.clientY - r.top) / r.height) * 100}%`);
      }
      onPointerMove?.(e);
    },
    [onPointerMove],
  );

  const handleLeave = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (el) {
        el.style.setProperty("--lg-x", "50%");
        el.style.setProperty("--lg-y", "50%");
      }
      onPointerLeave?.(e);
    },
    [onPointerLeave],
  );

  const mergedStyle: CSSProperties = { ...style, ["--lg-radius" as string]: radius };

  return createElement(
    as,
    {
      ...rest,
      ref,
      style: mergedStyle,
      className: cn(
        "liquid-glass",
        interactive && "is-interactive",
        !displace && "no-displace",
        className,
      ),
      onPointerMove: handleMove,
      onPointerLeave: handleLeave,
    },
    <span className="lg-backdrop" aria-hidden />,
    <span className="lg-tint" aria-hidden />,
    <span className="lg-shine" aria-hidden />,
    <span className={cn("relative z-10 flex items-center", contentClassName)}>
      {children}
    </span>,
  );
}

/* ---------- Displacement filter (rendered once) ---------- */

function buildDisplacementMap(size = 256, edge = 0.42): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(size, size);
  const data = img.data;
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / (size - 1)) * 2 - 1;
      const v = (y / (size - 1)) * 2 - 1;
      // Squircle distance so the refraction hugs rounded corners.
      const r = Math.pow(Math.pow(Math.abs(u), 5) + Math.pow(Math.abs(v), 5), 1 / 5);
      const strength = Math.pow(smooth(1 - edge, 1, r), 1.6);
      const nx = r > 0 ? u / r : 0;
      const ny = r > 0 ? v / r : 0;
      const i = (y * size + x) * 4;
      data[i] = 128 + nx * strength * 127;
      data[i + 1] = 128 + ny * strength * 127;
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

export function LiquidGlassFilter() {
  const [map, setMap] = useState<string>("");

  useEffect(() => {
    const ua = navigator.userAgent;
    const chromium = /Chrome|Chromium|Edg/.test(ua) && !/Firefox|OPR\/|SamsungBrowser/.test(ua);
    if (!chromium) return;
    const url = buildDisplacementMap();
    if (!url) return;
    setMap(url);
    document.documentElement.classList.add("lg-displace");
    return () => document.documentElement.classList.remove("lg-displace");
  }, []);

  if (!map) return null;

  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={map}
            result="map"
            preserveAspectRatio="none"
            x="0"
            y="0"
            width="100%"
            height="100%"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="42"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.6" />
        </filter>
      </defs>
    </svg>
  );
}
