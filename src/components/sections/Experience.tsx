import { Briefcase, FileDown, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT, EDUCATION, WORK } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" data-section="experience" className="relative py-28 md:py-40">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_0.55fr] gap-12">
          <div>
            <SectionHeading
              eyebrow="Experience"
              title="Where I've worked"
              accent="& studied"
            />

            <div className="relative pl-8 md:pl-10">
              <div className="absolute left-[9px] md:left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-300/60 via-white/10 to-transparent" />
              <Reveal stagger={0.15} className="space-y-6">
                {WORK.map((job) => (
                  <div key={job.role} className="relative">
                    <span className="absolute -left-8 md:-left-10 top-6 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-sky-300/50 shadow-[0_0_18px_rgba(125,211,252,0.35)]">
                      <Briefcase className="h-2.5 w-2.5 text-sky-300" />
                    </span>
                    <SpotlightCard className="p-6 md:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <p className="text-sm text-sky-300 font-medium tabular-nums">{job.period}</p>
                        <p className="text-sm text-muted-foreground">{job.org}</p>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{job.role}</h3>
                      <ul className="mt-4 space-y-2">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-300" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="mt-14 grid md:grid-cols-[1fr_1fr] gap-4">
              <Reveal className="md:col-span-2">
                <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-sky-300" />
                  Education
                </h3>
              </Reveal>
              {EDUCATION.map((edu, i) => (
                <Reveal key={edu.degree} delay={i * 0.1}>
                  <SpotlightCard className="p-6 h-full">
                    <p className="text-sm text-sky-300 font-medium tabular-nums mb-1">{edu.period}</p>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{edu.org}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
              <Reveal delay={0.2} className="md:col-span-2">
                <a
                  href={CONTACT.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-xl glass p-4 pr-6 transition-all duration-500 hover:border-sky-300/30 hover:-translate-y-0.5"
                >
                  <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <img
                      src="/cv-header.webp"
                      alt="Preview of Vasco Bartolomeu's CV"
                      loading="lazy"
                      width={1836}
                      height={468}
                      className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-white transition-colors">
                      Resume / CV
                    </h4>
                    <p className="text-sm text-muted-foreground">Full career history &amp; skills overview</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:bg-white group-hover:text-background">
                    <FileDown className="h-4 w-4" />
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
