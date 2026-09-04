import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { CURRENT_ROLE, PILLARS } from "@/lib/data";

const LANGUAGES = ["Portuguese", "English", "Spanish"];

export function About() {
  return (
    <section id="about" data-section="about" className="relative py-28 md:py-40">
      <div className="container">
        <div className="grid lg:grid-cols-[0.62fr_1fr] gap-12 items-start">
          {/* Robot column */}
          <div className="hidden lg:block min-h-[60vh]" />
          <div>
            <SectionHeading
              eyebrow="About me"
              title="From particle physics to"
              accent="production AI"
              description="Born and based in the Azores, Portugal. I started in Physics Engineering, fell in love with data, and turned that into a Master's in Data Science and a career building AI systems for companies like Red Bull, Porsche eBike and Enari GmbH."
            />

            <Reveal stagger={0.1} className="grid sm:grid-cols-2 gap-4">
              {PILLARS.map((pillar) => (
                <SpotlightCard key={pillar.title} className="p-6" tilt>
                  <div className="h-11 w-11 rounded-lg bg-sky-400/10 border border-sky-300/20 flex items-center justify-center mb-5">
                    <pillar.icon className="h-5 w-5 text-sky-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
                </SpotlightCard>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-10 max-w-2xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Today I work as {CURRENT_ROLE.title} at{" "}
                <span className="text-foreground font-medium">{CURRENT_ROLE.company}</span>,
                where I design AI products, cloud architecture and full-stack
                applications for clients across Europe.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-eyebrow text-muted-foreground/70 mr-2">
                  Speaks
                </span>
                {LANGUAGES.map((l) => (
                  <span
                    key={l}
                    className="rounded-full glass px-3.5 py-1.5 text-xs text-foreground/80"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
