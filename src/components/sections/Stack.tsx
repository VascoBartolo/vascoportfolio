import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { MARQUEE_A, MARQUEE_B, STACK } from "@/lib/data";

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 font-heading text-sm text-foreground/80 whitespace-nowrap">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
      {label}
    </span>
  );
}

export function Stack() {
  return (
    <section id="stack" data-section="stack" className="relative py-28 md:py-40 overflow-hidden">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Tech stack"
          title="Tools I work with"
          accent="every day"
          description="A stack shaped by production work: from training deep learning models to deploying them behind scalable cloud APIs and polished frontends."
        />
      </div>

      <Reveal className="space-y-4">
        <Marquee duration={48} items={MARQUEE_A.map((l) => <Chip key={l} label={l} />)} />
        <Marquee duration={54} reverse items={MARQUEE_B.map((l) => <Chip key={l} label={l} />)} />
      </Reveal>

      <div className="container mt-14">
        <Reveal stagger={0.08} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((group, i) => (
            <SpotlightCard
              key={group.title}
              className={i === 1 ? "p-6 lg:row-span-2" : "p-6"}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-md bg-sky-400/10 border border-sky-300/20 flex items-center justify-center">
                  <group.icon className="h-4 w-4 text-sky-300" />
                </div>
                <h3 className="font-semibold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:border-sky-300/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
