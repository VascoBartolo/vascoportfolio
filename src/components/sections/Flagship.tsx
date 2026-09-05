import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, pinTuning } from "@/lib/scroll";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Magnetic } from "@/components/ui/Magnetic";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GlowBorder } from "@/components/ui/GlowBorder";
import { FLAGSHIP } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Index of the results tile that gets the pulsing accent border. */
const HIGHLIGHT = FLAGSHIP.results.findIndex((r) => r.label === "Cost savings");

/**
 * Pinned three-act product story. Scrolling scrubs a GSAP timeline: each
 * step card enters and leaves in turn, then the results tiles and CTA land.
 * The robot (see robot-poses.ts) faces each card, spins during "Optimize"
 * and steps aside to look at the results.
 */
export function Flagship() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useLayoutEffect(() => {
    const pinEl = pin.current;
    const wrapEl = wrap.current;
    if (!pinEl || !wrapEl) return;
    const q = gsap.utils.selector(pinEl);
    const steps = q<HTMLElement>("[data-step]");
    const tiles = q<HTMLElement>("[data-tile]");
    const cta = q<HTMLElement>("[data-cta]");
    const bar = q<HTMLElement>("[data-bar]")[0];

    const ctx = gsap.context(() => {
      gsap.set(steps, { opacity: 0, y: 60 });
      gsap.set(tiles, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(cta, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: pinEl,
          pin: true,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
          invalidateOnRefresh: true,
          ...pinTuning(0.7),
          onUpdate: (self) => {
            const p = self.progress;
            const ph = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
            setPhase((prev) => (prev === ph ? prev : ph));
            if (bar) bar.style.transform = `scaleX(${p})`;
          },
        },
      });

      tl.to(steps[0], { opacity: 1, y: 0, duration: 0.1 }, 0.02)
        .to(steps[0], { opacity: 0, y: -40, duration: 0.07, ease: "power2.in" }, 0.28)
        .to(steps[1], { opacity: 1, y: 0, duration: 0.1 }, 0.36)
        .to(steps[1], { opacity: 0, y: -40, duration: 0.07, ease: "power2.in" }, 0.6)
        .to(steps[2], { opacity: 1, y: 0, duration: 0.1 }, 0.68)
        .to(tiles, { opacity: 1, y: 0, scale: 1, duration: 0.12, stagger: 0.035 }, 0.76)
        .to(cta, { opacity: 1, y: 0, duration: 0.08 }, 0.9)
        .to({}, { duration: 0.02 }, 0.98);
    }, wrapEl);

    return () => ctx.revert();
  }, []);

  return (
    <div id="flagship" data-section="flagship" ref={wrap} className="relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      <div ref={pin} className="h-[100svh] overflow-hidden">
        {/* Inner relative box so absolutely positioned blocks respect the
            container's horizontal padding on phones. From md up the negative
            margins cancel that padding, keeping the desktop layout as is. */}
        <div className="container h-full">
        <div className="relative h-full">
          {/* Header */}
          <div className="absolute left-0 top-[11svh] max-w-md lg:max-w-lg pr-4">
            <Reveal>
              <Eyebrow>Flagship product</Eyebrow>
            </Reveal>
            <h2 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02] text-metal">
              <SplitText text={FLAGSHIP.name} />
              <br />
              <SplitText
                text={FLAGSHIP.tagline}
                delay={0.15}
                className="serif-italic text-gradient pr-2 text-3xl md:text-5xl lg:text-6xl"
              />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground lg:hidden">
                {FLAGSHIP.descriptionShort}
              </p>
              <p className="mt-5 hidden lg:block text-muted-foreground md:text-lg leading-relaxed">
                {FLAGSHIP.description}
              </p>
            </Reveal>
          </div>

          {/* Step cards: act 1 left, act 2 right, act 3 left */}
          {FLAGSHIP.steps.map((step, i) => (
            <div
              key={step.step}
              data-step
              className={cn(
                "absolute w-[min(88vw,400px)] bottom-[13svh] lg:bottom-auto lg:top-[58%]",
                i === 1 ? "right-0" : "left-0",
              )}
            >
              <SpotlightCard strong className="p-6 md:p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-3xl font-semibold text-sky-300/60 tabular-nums leading-none">
                    {step.step}
                  </span>
                  <span className="h-10 w-10 rounded-lg bg-sky-400/10 border border-sky-300/20 flex items-center justify-center">
                    <step.icon className="h-[18px] w-[18px] text-sky-300" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </SpotlightCard>
            </div>
          ))}

          {/* Results (desktop): top-right, land in act 3 */}
          <div className="absolute right-0 top-[11svh] hidden lg:block w-[min(38vw,440px)]">
            {/* Revealed together with the tiles (first in the stagger). */}
            <p data-tile="" className="eyebrow mb-4 text-right">
              Measured results
            </p>
            <div className="grid grid-cols-2 gap-3">
              {FLAGSHIP.results.map((r, i) => {
                const tile = (
                  <SpotlightCard strong className="p-5 h-full">
                    <p className="font-heading text-3xl xl:text-4xl font-semibold tracking-tight text-gradient">
                      <CountUp value={r.value} prefix={r.prefix} suffix={r.suffix} />
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{r.label}</p>
                  </SpotlightCard>
                );
                // The timeline animates [data-tile]; the wrapper carries it so
                // the glow fades in together with its tile.
                return i === HIGHLIGHT ? (
                  <GlowBorder key={r.label} data-tile="" radius={18} spread={14}>
                    {tile}
                  </GlowBorder>
                ) : (
                  <div key={r.label} data-tile="">
                    {tile}
                  </div>
                );
              })}
            </div>
            <div data-cta className="mt-5 flex justify-end">
              <Magnetic strength={0.25}>
                <a
                  href={FLAGSHIP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                >
                  Visit {FLAGSHIP.name}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Act indicator */}
          <div className="absolute inset-x-0 bottom-[4svh]">
            <div className="flex items-center justify-center gap-6 mb-3">
              {FLAGSHIP.steps.map((s, i) => (
                <span
                  key={s.step}
                  className={cn(
                    "flex items-center gap-2 text-[11px] uppercase tracking-eyebrow transition-colors duration-500",
                    phase === i ? "text-sky-300" : "text-muted-foreground/50",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-500",
                      phase === i ? "bg-sky-300 w-5" : "bg-white/25",
                    )}
                  />
                  {s.title}
                </span>
              ))}
            </div>
            <div className="mx-auto h-px w-40 bg-white/[0.08] overflow-hidden rounded-full">
              <div
                data-bar
                className="h-full w-full origin-left bg-gradient-to-r from-sky-300 to-indigo-400"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Results (mobile): static grid after the story */}
      <div className="container lg:hidden pb-24">
        <Reveal>
          <p className="eyebrow mb-4">Measured results</p>
        </Reveal>
        <Reveal stagger={0.08} className="grid grid-cols-2 gap-3">
          {FLAGSHIP.results.map((r, i) => {
            const tile = (
              <SpotlightCard strong className="p-5 h-full">
                <p className="font-heading text-3xl font-semibold tracking-tight text-gradient">
                  <CountUp value={r.value} prefix={r.prefix} suffix={r.suffix} />
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">{r.label}</p>
              </SpotlightCard>
            );
            return i === HIGHLIGHT ? (
              <GlowBorder key={r.label} radius={18} spread={12}>
                {tile}
              </GlowBorder>
            ) : (
              <div key={r.label}>{tile}</div>
            );
          })}
        </Reveal>
        <Reveal delay={0.2} className="mt-6">
          <a
            href={FLAGSHIP.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          >
            Visit {FLAGSHIP.name}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}
