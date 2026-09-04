import { ArrowRight, ArrowDown, FileDown, MapPin } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { CountUp } from "@/components/ui/CountUp";
import { Marquee } from "@/components/ui/Marquee";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { CLIENTS, CONTACT, HERO_STATS } from "@/lib/data";

/**
 * Hero. Desktop: text column left, robot right. Phones: text at the top,
 * a free band in the middle for the robot, buttons + counters + client
 * ticker pinned to the bottom so the whole hero fits one screen.
 */
export function Hero() {
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-[100svh] flex flex-col"
    >
      <div aria-hidden className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="container relative flex-1 flex flex-col pt-24 pb-4 lg:justify-center lg:pt-24 lg:pb-10">
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div className="flex flex-col lg:block">
            <Reveal immediate delay={0.2}>
              <span className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 text-xs lg:px-4 lg:text-[13px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-sky-300" />
                Azores, Portugal
                <span className="mx-1 h-3 w-px bg-white/15" />
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-soft" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to new projects
              </span>
            </Reveal>

            <h1 className="mt-5 lg:mt-7 font-semibold tracking-[-0.04em] leading-[0.95] text-[2.35rem] sm:text-5xl lg:text-7xl xl:text-[5.6rem]">
              <SplitText
                text="Vasco Bartolomeu"
                by="chars"
                immediate
                delay={0.35}
                className="text-metal"
              />
            </h1>

            <p className="mt-3 lg:mt-4 text-lg sm:text-2xl lg:text-[2.4rem] leading-[1.1] tracking-[-0.02em]">
              <SplitText
                text="Data Scientist &"
                immediate
                delay={0.75}
                className="text-foreground/85 font-heading font-medium"
              />{" "}
              <SplitText
                text="Software Engineer"
                immediate
                delay={0.9}
                className="serif-italic text-gradient pr-2"
              />
            </p>

            <Reveal immediate delay={1.15}>
              <p className="mt-4 lg:mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground line-clamp-3 md:text-base lg:text-lg lg:line-clamp-none">
                I design and ship AI products end to end: machine learning
                models, cloud infrastructure and the interfaces people actually
                use. Physics engineer by training, data scientist by craft.
              </p>
            </Reveal>

            {/* Free band for the robot on phones. */}
            <div className="flex-1 min-h-[210px] lg:hidden" aria-hidden />

            <Reveal immediate delay={1.35}>
              <div className="mt-6 lg:mt-8 grid grid-cols-2 gap-2.5 lg:flex lg:flex-wrap lg:items-center lg:gap-3">
                <Magnetic strength={0.25} className="w-full lg:w-auto">
                  <a
                    href="#contact"
                    className="btn-primary group inline-flex w-full lg:w-auto items-center justify-center gap-2 rounded-full px-5 py-3 lg:px-6 lg:py-3.5 text-sm font-semibold text-white"
                  >
                    Book a call
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.2} className="w-full lg:w-auto">
                  <LiquidGlass
                    as="a"
                    href="#flagship"
                    interactive
                    className="w-full lg:w-auto px-5 py-3 lg:px-6 lg:py-3.5 text-sm font-semibold text-foreground"
                    contentClassName="w-full justify-center gap-2"
                  >
                    See my work
                  </LiquidGlass>
                </Magnetic>
                <Magnetic strength={0.2} className="col-span-2 w-full lg:w-auto">
                  <LiquidGlass
                    as="a"
                    href={CONTACT.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    interactive
                    className="w-full lg:w-auto px-5 py-3 lg:py-3.5 text-sm font-semibold text-foreground"
                    contentClassName="w-full justify-center gap-2"
                  >
                    <FileDown className="h-4 w-4 text-sky-300" />
                    Download CV
                  </LiquidGlass>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal immediate delay={1.55}>
              <dl className="mt-5 lg:mt-10 grid grid-cols-3 gap-2 text-center lg:text-left lg:flex lg:flex-wrap lg:gap-x-10 lg:gap-y-4">
                {HERO_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center lg:flex-row lg:items-baseline lg:gap-2"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-heading text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        immediate
                        delay={1.6 + i * 0.15}
                        duration={1.8}
                      />
                    </dd>
                    <dd className="text-[11px] leading-tight lg:text-sm text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          {/* Right column intentionally empty on desktop: the 3D robot lives here. */}
          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="container relative pb-5 lg:pb-8">
        <Reveal immediate delay={1.8} y={16}>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[10px] lg:text-[11px] uppercase tracking-eyebrow text-muted-foreground/70">
                Trusted by teams at
              </span>
              <span className="hidden md:block h-px w-10 bg-white/10" />
            </div>
            <Marquee
              duration={30}
              className="md:max-w-[520px]"
              items={CLIENTS.map((c) => (
                <span
                  key={c}
                  className="font-heading text-sm font-medium tracking-wide text-foreground/55 whitespace-nowrap"
                >
                  {c}
                </span>
              ))}
              itemClassName="px-4"
            />
            <div className="hidden lg:flex md:ml-auto items-center">
              <LiquidGlass
                as="a"
                href="#about"
                interactive
                aria-label="Scroll to next section"
                className="px-4 py-2 text-xs text-muted-foreground"
                contentClassName="gap-2"
              >
                Scroll
                <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
              </LiquidGlass>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
