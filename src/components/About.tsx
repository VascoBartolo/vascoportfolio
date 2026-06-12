import { Atom, BrainCircuit, Cloud, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { Reveal, SectionHeading } from "@/components/Reveal";

const pillars = [
  {
    icon: Atom,
    title: "Physics foundations",
    text: "B.Eng. in Physics Engineering (University of Porto). Rigorous mathematical thinking applied to messy real-world problems.",
  },
  {
    icon: BrainCircuit,
    title: "Data science core",
    text: "M.Eng. in Data Science and Engineering (FEUP). Machine learning, deep learning, computer vision and LLMs in production.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Azure-native engineering: ML pipelines, Kubernetes, Terraform IaC and CI/CD that take models from notebook to product.",
  },
  {
    icon: Code2,
    title: "Full-stack delivery",
    text: "React frontends, FastAPI/Flask backends and booking platforms — I ship the whole product, not just the model.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="About me"
          title="From particle physics to production AI"
          description="Born and based in the Azores, Portugal. I started in Physics Engineering, fell in love with data, and turned that into a Master's in Data Science and a career building AI systems for companies like Red Bull, Porsche eBike and Enari GmbH."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <Card className="relative h-full glass border-white/[0.08] hover:border-primary/40 transition-colors duration-300">
                <CursorSpotlight size={180} />
                <CardContent className="p-6">
                  <div className="h-11 w-11 rounded-md bg-primary/10 border border-primary/25 flex items-center justify-center mb-4">
                    <pillar.icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.text}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Today I work as an AI Engineer at{" "}
            <span className="text-foreground font-medium">Enari GmbH</span>,
            where I design machine learning systems, cloud architecture and
            full-stack applications for enterprise clients across Europe —
            speaking Portuguese, English and Spanish along the way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
