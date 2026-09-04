import { useLayoutEffect, useRef, useState } from "react";
import { gsap, scrollState } from "@/lib/scroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { PROJECTS, companyIcon } from "@/lib/data";

/** Resting offset of the stack from the top of the viewport (px). */
const STACK_TOP = 120;
/** Per-card stagger in the stack (px). */
const STACK_STEP = 14;

function CompanyBadge({
  name,
  domain,
  logo,
}: {
  name: string;
  domain: string;
  logo?: string;
}) {
  // Local logo → favicon → monogram.
  const [stage, setStage] = useState<"logo" | "favicon" | "mono">(logo ? "logo" : "favicon");
  return (
    <span className="inline-flex items-center gap-3">
      {stage === "mono" ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] font-heading text-sm font-semibold text-sky-200">
          {name.charAt(0)}
        </span>
      ) : stage === "logo" ? (
        <span className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-white px-2 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6)]">
          <img
            src={logo}
            alt={`${name} logo`}
            loading="lazy"
            className="h-6 w-auto max-w-[110px] object-contain"
            onError={() => setStage("favicon")}
          />
        </span>
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
          <img
            src={companyIcon(domain)}
            alt={`${name} logo`}
            width={22}
            height={22}
            loading="lazy"
            className="h-[22px] w-[22px] object-contain"
            onError={() => setStage("mono")}
          />
        </span>
      )}
      <span className="text-sm md:text-base font-semibold text-sky-200">{name}</span>
    </span>
  );
}

/**
 * Stacked deck: each project card sticks at the vertical centre of the
 * viewport and the next one slides up over it, while the previous card
 * recedes (scale/fade). The robot stands beside the stack.
 */
export function Projects() {
  const wrap = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el || scrollState.reducedMotion) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        // Recede only while the next card is in the upper part of the screen
        // (from 70% of the viewport up to its resting spot), so the current
        // card stays crisp until the new one is already easy to read.
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 70%",
            end: `top ${STACK_TOP + (i + 1) * STACK_STEP}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      data-section="projects"
      ref={wrap}
      className="relative py-28 md:py-40"
    >
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Selected projects"
              title="AI systems shipped to"
              accent="real clients"
              description="Machine learning, computer vision and cloud engineering delivered for international brands and industrial clients."
            />

            <div className="relative pb-[22vh]">
              {PROJECTS.map((project, i) => (
                <div
                  key={project.title}
                  data-card
                  className="sticky mb-10 origin-top will-change-transform"
                  style={{ top: STACK_TOP + i * STACK_STEP }}
                >
                  <SpotlightCard
                    strong
                    tilt
                    className="p-6 md:p-8 min-h-[300px] flex flex-col"
                    // Opaque paint so the cards underneath don't bleed through.
                    style={{
                      background: "linear-gradient(160deg, #141b31 0%, #0b0f1d 100%)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <span className="eyebrow">{project.domain}</span>
                      <span className="font-heading text-4xl font-semibold text-white/10 tabular-nums leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mb-3">
                      <CompanyBadge
                        name={project.client}
                        domain={project.clientDomain}
                        logo={project.logo}
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground flex-1 max-w-xl">
                      {project.text}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </div>
          {/* Robot column */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}
