import {
  ArrowUpRight,
  BrainCircuit,
  CalendarCheck,
  Clock,
  Settings2,
  ShieldCheck,
  Layers,
  RefreshCw,
  LineChart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, SectionHeading } from "@/components/Reveal";

const results = [
  { value: "80%", label: "Planning time saved" },
  { value: "99%", label: "Conflict-free schedules" },
  { value: "<10min", label: "Solve time" },
  { value: "25%", label: "Cost savings" },
];

const steps = [
  {
    icon: Settings2,
    step: "01",
    title: "Configure",
    text: "Define shifts, employee availability, qualifications and business constraints through a web interface or REST API.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "Optimize",
    text: "The AI engine runs a multi-stage optimization, balancing coverage, fairness and compliance — automatically.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Schedule",
    text: "Receive a conflict-free, capacity-balanced schedule ready to plug into your operations within minutes.",
  },
];

const features = [
  { icon: ShieldCheck, text: "Hard constraint enforcement — no double bookings, guaranteed rest" },
  { icon: Layers, text: "Multi-tenant, enterprise-grade cloud architecture" },
  { icon: RefreshCw, text: "Real-time rescheduling and mid-season adjustments" },
  { icon: LineChart, text: "Rapid what-if analysis — re-optimize in minutes" },
];

export function FlagshipProduct() {
  return (
    <section id="flagship" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/3 -right-64 h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Flagship product"
          title="DEEP Schedule — Schedule Smarter. Operate Better."
          description="An AI-powered scheduling optimization platform I architected and built. It automatically assigns the right people, with the right skills, to the right work — producing conflict-free, cost-efficient schedules for any business that manages teams, services or resources."
        />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div>
            {/* The problem it solves */}
            <Reveal>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Manual scheduling silently drains businesses: planners lose{" "}
                <span className="text-foreground font-medium">
                  15–20 hours every week
                </span>
                , around{" "}
                <span className="text-foreground font-medium">
                  20% of assignments collide
                </span>{" "}
                in double bookings, and unbalanced workloads push employee
                turnover up. DEEP Schedule removes all of that — in minutes,
                not hours.
              </p>
            </Reveal>

            {/* How it works */}
            <div className="grid sm:grid-cols-3 gap-4">
              {steps.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.1}>
                  <Card className="h-full glass border-white/[0.08]">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-heading text-2xl font-bold text-primary/70">
                          {s.step}
                        </span>
                        <s.icon className="h-5 w-5 text-sky-400" />
                      </div>
                      <h3 className="font-semibold mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.text}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>

            {/* Feature list */}
            <Reveal delay={0.15} className="mt-8">
              <ul className="grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <f.icon className="h-4 w-4 mt-0.5 shrink-0 text-sky-400" />
                    {f.text}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex justify-center lg:justify-start">
              <a
                href="https://deep-orpin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:brightness-110 transition-all duration-200"
              >
                Visit DEEP Schedule
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          {/* Results panel */}
          <Reveal delay={0.1}>
            <Card className="glass border-primary/20 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-8">
                  <Clock className="h-4 w-4 text-sky-400" />
                  <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                    Measured results
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                  {results.map((r) => (
                    <div key={r.label}>
                      <p className="font-heading text-4xl md:text-5xl font-bold text-gradient">
                        {r.value}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-xs text-muted-foreground/70 border-t border-white/[0.06] pt-4">
                  Enterprise SaaS platform · multi-tenant · cloud native ·
                  live with pilot customers
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
