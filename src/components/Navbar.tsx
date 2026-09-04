import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { Magnetic } from "@/components/ui/Magnetic";
import { LogoMark } from "@/components/Logo";
import { getLenis, gsap, onScroll, sectionIdAt } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "about", label: "About" },
  { id: "flagship", label: "Product" },
  { id: "projects", label: "Projects" },
  { id: "websites", label: "Websites" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
];

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    return onScroll((s) => {
      const id = sectionIdAt(s.index);
      setActive((prev) => (prev === id ? prev : id));
      // Hide on fast downward scroll, show on upward.
      const delta = s.scroll - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && s.scroll > 200 && s.velocity > 4);
        lastY.current = s.scroll;
      }
    });
  }, []);

  // Sliding active indicator.
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const target = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!target) {
      gsap.to(pill, { opacity: 0, duration: 0.3 });
      return;
    }
    const lr = list.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    gsap.to(pill, {
      x: tr.left - lr.left,
      width: tr.width,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [active]);

  // Lock smooth scroll while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 transition-transform duration-500",
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0",
        )}
      >
        <LiquidGlass
          as="nav"
          aria-label="Primary"
          displace={false}
          className="w-full max-w-5xl px-2 py-2 pl-3"
          contentClassName="w-full justify-between gap-3"
        >
          <a href="#hero" className="flex items-center gap-3 pr-2" aria-label="Back to top">
            <LogoMark className="h-8 w-8" />
            <span className="hidden sm:block font-heading text-sm font-semibold tracking-[0.16em] uppercase">
              Vasco <span className="text-gradient">Bartolomeu</span>
            </span>
          </a>

          <ul ref={listRef} className="relative hidden lg:flex items-center">
            <span
              ref={pillRef}
              aria-hidden
              className="absolute left-0 top-0 h-full rounded-full bg-white/[0.08] border border-white/[0.08] opacity-0"
              style={{ width: 0 }}
            />
            {LINKS.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  data-id={link.id}
                  className={cn(
                    "block px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                    active === link.id ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.2} className="hidden md:inline-block">
              <a
                href="#contact"
                className="btn-primary group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white"
              >
                Book a call
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <button
              type="button"
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </LiquidGlass>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        {/* Solid paint instead of backdrop-filter: a blurred backdrop can't
            cross-fade smoothly, which made the open/close feel stepped. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,18,0.97),rgba(8,12,24,0.99))]" />
        <nav className="relative h-full container flex flex-col justify-center gap-2 pt-20">
          {[{ id: "hero", label: "Home" }, ...LINKS, { id: "contact", label: "Contact" }].map(
            (link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-baseline gap-4 py-3 font-heading text-4xl font-semibold tracking-tight transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  active === link.id ? "text-white" : "text-foreground/60",
                )}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <span className="text-xs text-sky-300 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </>
  );
}
