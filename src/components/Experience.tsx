import { Briefcase, FileDown, GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const work = [
  {
    period: "07/2023 — Present",
    role: "AI Engineer & Data Scientist",
    org: "Enari GmbH",
    points: [
      "End-to-end machine learning pipelines on Azure for clients including Red Bull, Porsche eBike, Digital Loop and HybridDigital",
      "LLM integrations in production with OpenAI and Claude",
      "Cloud architecture, Kubernetes, Terraform IaC and CI/CD automation",
      "Full-stack product development with React, FastAPI and Flask",
    ],
  },
  {
    period: "04/2022 — 07/2023",
    role: "Full-Stack Software Developer",
    org: "Raceland Automação",
    points: [
      "Engineered a home automation platform from firmware to mobile apps",
      "Built backend APIs connecting company systems to new services",
      "Adapted computer vision algorithms for home security surveillance",
      "Created a serverless company website with Next.js on Google Cloud Run",
    ],
  },
];

const education = [
  {
    period: "2022 — 2024",
    degree: "M.Eng. Data Science and Engineering",
    org: "Faculdade de Engenharia, Universidade do Porto",
  },
  {
    period: "2018 — 2022",
    degree: "B.Eng. Physics Engineering",
    org: "Faculdade de Ciências, Universidade do Porto",
  },
];

function ResumeCard() {
  return (
    <a
      href="/Vasco_Bartolomeu_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg glass border-white/[0.08] overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[1836/468] overflow-hidden bg-secondary">
        <img
          src="/cv-header.webp"
          alt="Preview of Vasco Bartolomeu's CV"
          loading="lazy"
          width={1836}
          height={468}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <FileDown className="h-4 w-4" />
        </div>
      </div>
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold group-hover:text-sky-300 transition-colors duration-200">
            Resume / CV
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Full career history & skills overview
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-white/[0.06] px-3 py-1 text-xs text-muted-foreground shrink-0">
          <FileDown className="h-3 w-3 text-sky-400" />
          PDF
        </span>
      </div>
    </a>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked & studied"
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="relative border-l border-white/[0.08] pl-8 space-y-12">
            {work.map((job, i) => (
              <Reveal key={job.role} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 border border-primary/40">
                    <Briefcase className="h-3 w-3 text-sky-400" />
                  </span>
                  <p className="text-sm text-sky-400 font-medium mb-1">
                    {job.period}
                  </p>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="text-muted-foreground font-medium mb-3">
                    {job.org}
                  </p>
                  <ul className="space-y-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-3"
                      >
                        <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-sky-400 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal>
              <h3 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-sky-400" />
                Education
              </h3>
            </Reveal>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <Reveal key={edu.degree} delay={i * 0.1}>
                  <div className="rounded-lg glass border-white/[0.08] p-5">
                    <p className="text-sm text-sky-400 font-medium mb-1">
                      {edu.period}
                    </p>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.org}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10">
              <h3 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                <FileDown className="h-5 w-5 text-sky-400" />
                Resume
              </h3>
              <ResumeCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
