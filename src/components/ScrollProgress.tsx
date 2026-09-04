import { useEffect, useState } from "react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { onScroll, sectionIdAt } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const DOTS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "flagship", label: "Product" },
  { id: "projects", label: "Projects" },
  { id: "websites", label: "Websites" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/** Vertical section navigator (desktop) in a liquid-glass capsule. */
export function ScrollProgress() {
  const [active, setActive] = useState("hero");

  useEffect(
    () =>
      onScroll((s) => {
        const id = sectionIdAt(s.index);
        setActive((prev) => (prev === id ? prev : id));
      }),
    [],
  );

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <LiquidGlass
        displace={false}
        className="px-2 py-3"
        contentClassName="flex-col gap-2.5"
        aria-label="Section navigation"
      >
        {DOTS.map((d) => {
          const isActive = active === d.id;
          return (
            <a
              key={d.id}
              href={`#${d.id}`}
              aria-label={d.label}
              title={d.label}
              className="group relative flex h-5 w-5 items-center justify-center"
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-500",
                  isActive
                    ? "h-4 w-1.5 bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.7)]"
                    : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/70",
                )}
              />
              <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-full glass px-2.5 py-1 text-[11px] text-foreground opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                {d.label}
              </span>
            </a>
          );
        })}
      </LiquidGlass>
    </div>
  );
}
