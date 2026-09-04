import { memo, useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { gsap, ScrollTrigger, scrollToTarget, scrollState } from "@/lib/scroll";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";
import { SITES, screenshot, type Site } from "@/lib/data";

const EDGE = "max(1.25rem, calc((100vw - 1360px) / 2 + 3rem))";

const SiteCard = memo(function SiteCard({ site, index }: { site: Site; index: number }) {
  const domain = new URL(site.url).hostname.replace("www.", "");
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-[min(82vw,560px)] shrink-0 rounded-2xl glass p-3 transform-gpu transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-white/[0.16]"
      style={{ ["--accent" as string]: site.accent }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at 20% 0%, color-mix(in srgb, ${site.accent} 22%, transparent), transparent 60%)`,
        }}
      />
      {/* Browser chrome */}
      <div className="relative flex items-center gap-2 px-2 pb-3 pt-1">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 border border-white/[0.06] px-3 py-1 text-[11px] text-muted-foreground">
          <Globe className="h-3 w-3" style={{ color: site.accent }} />
          {domain}
        </span>
        <span className="ml-auto font-heading text-xs text-muted-foreground/50 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
        <img
          src={screenshot(site.url)}
          alt={`Preview of ${site.name}`}
          loading="lazy"
          decoding="async"
          width={960}
          height={600}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="relative flex items-center justify-between gap-4 px-2 pt-4 pb-2">
        <div>
          <h3 className="font-semibold tracking-tight group-hover:text-white transition-colors">
            {site.name}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{site.type}</p>
        </div>
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition-all duration-500 group-hover:bg-white group-hover:text-background group-hover:rotate-45"
          aria-hidden
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
});

/**
 * Pinned section: vertical scrolling drives a horizontal track of live
 * website previews. Prev/next controls jump the smooth scroller to the
 * matching scroll position.
 */
export function WebsitesCarousel() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const index = useRef(0);
  const total = SITES.length + 1;

  useLayoutEffect(() => {
    const trackEl = track.current;
    const pinEl = pin.current;
    if (!trackEl || !pinEl) return;
    const distance = () => {
      const last = trackEl.lastElementChild as HTMLElement | null;
      // Phones: end with the last (CTA) card centred on screen.
      if (window.innerWidth < 768 && last) {
        return Math.max(0, last.offsetLeft + last.offsetWidth / 2 - window.innerWidth / 2);
      }
      return Math.max(0, trackEl.scrollWidth - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          pin: true,
          scrub: scrollState.reducedMotion ? true : 0.8,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // DOM-only updates: no React re-render while the track is moving.
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            const i = Math.round(self.progress * (total - 1));
            if (i !== index.current) {
              index.current = i;
              if (counter.current) counter.current.textContent = String(i + 1).padStart(2, "0");
            }
          },
        },
      });
      st.current = tween.scrollTrigger ?? null;
    }, wrap);

    return () => {
      ctx.revert();
      st.current = null;
    };
  }, [total]);

  const goTo = (i: number) => {
    const trigger = st.current;
    if (!trigger) return;
    const clamped = Math.min(total - 1, Math.max(0, i));
    const y = trigger.start + ((trigger.end - trigger.start) * clamped) / (total - 1);
    scrollToTarget(y, { duration: 1.1 });
  };

  return (
    <div id="websites" data-section="websites" ref={wrap} className="relative">
      <div ref={pin} className="h-[100svh] flex flex-col justify-center overflow-hidden py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
              <Reveal>
                <Eyebrow>Live websites</Eyebrow>
              </Reveal>
              <h2 className="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.02] text-metal">
                <SplitText text="Websites built &" />{" "}
                <SplitText text="shipped" delay={0.15} className="serif-italic text-gradient pr-2" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                  Landing pages, applications and booking platforms designed, developed and deployed
                  for real businesses.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="flex items-center gap-3 shrink-0">
              <span className="font-heading text-sm text-muted-foreground tabular-nums mr-2">
                <span ref={counter}>01</span>
                <span className="text-muted-foreground/40"> / {String(total).padStart(2, "0")}</span>
              </span>
              <LiquidGlass
                as="button"
                type="button"
                interactive
                aria-label="Previous website"
                onClick={() => goTo(index.current - 1)}
                className="h-12 w-12 text-foreground"
                contentClassName="h-full w-full justify-center"
              >
                <ArrowLeft className="h-4 w-4" />
              </LiquidGlass>
              <LiquidGlass
                as="button"
                type="button"
                interactive
                aria-label="Next website"
                onClick={() => goTo(index.current + 1)}
                className="h-12 w-12 text-foreground"
                contentClassName="h-full w-full justify-center"
              >
                <ArrowRight className="h-4 w-4" />
              </LiquidGlass>
            </Reveal>
          </div>
        </div>

        <div
          ref={track}
          // On phones the right padding centres the last (CTA) card when the
          // track reaches its end; from md up it matches the container edge.
          className="carousel-track flex items-stretch gap-5 md:gap-6 pr-[calc((100vw-min(82vw,440px))/2)] md:pr-[max(1.25rem,calc((100vw-1360px)/2+3rem))]"
          style={{ paddingLeft: EDGE }}
        >
          {SITES.map((site, i) => (
            <SiteCard key={site.url} site={site} index={i} />
          ))}
          {/* Closing CTA card */}
          <a
            href="#contact"
            className="group relative flex w-[min(82vw,440px)] shrink-0 flex-col justify-between overflow-hidden rounded-2xl glass-strong p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-sky-300/30"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sky-400/20 blur-[90px] pointer-events-none" />
            <p className="eyebrow">Next project</p>
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Your website could be{" "}
                <span className="serif-italic text-gradient">here.</span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                Landing page, booking flow or a full AI product. Let's scope it together.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        <div className="container mt-8">
          <div className="h-px w-full bg-white/[0.08] overflow-hidden rounded-full">
            <div
              ref={bar}
              className="h-full w-full origin-left bg-gradient-to-r from-sky-300 to-indigo-400"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
