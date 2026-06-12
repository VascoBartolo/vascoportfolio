import {
  Code2,
  BrainCircuit,
  CloudCog,
  Database,
  PanelsTopLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, SectionHeading } from "@/components/Reveal";

const groups = [
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "R", "SQL", "Bash"],
  },
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "OpenCV",
      "Hugging Face",
      "OpenAI API",
      "Claude API",
      "CNNs",
      "Time Series",
      "Vector DBs",
      "Whisper",
    ],
  },
  {
    icon: CloudCog,
    title: "Cloud & DevOps",
    items: [
      "Azure ML",
      "Azure Databricks",
      "Kubernetes (AKS)",
      "Docker",
      "Terraform",
      "Azure DevOps",
      "GitLab CI",
      "AWS (EC2, S3, Lambda)",
      "Keycloak",
    ],
  },
  {
    icon: Database,
    title: "Data Engineering",
    items: [
      "Pandas",
      "NumPy",
      "pySpark",
      "PostgreSQL",
      "MongoDB",
      "CosmosDB",
      "SQL Server",
      "Power BI",
    ],
  },
  {
    icon: PanelsTopLeft,
    title: "Web & Product",
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "Flask",
      "Tailwind CSS",
      "Lit Element",
      "Dynamics 365",
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 -right-64 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Tech stack"
          title="Tools I work with daily"
          description="A stack shaped by production work — from training deep learning models to deploying them behind scalable cloud APIs and polished frontends."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 3) * 0.08}
              className={i === 1 ? "lg:row-span-2" : undefined}
            >
              <Card className="h-full glass border-white/[0.08]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/25 flex items-center justify-center">
                      <group.icon className="h-4 w-4 text-sky-400" />
                    </div>
                    <h3 className="font-semibold">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground border border-white/[0.06] hover:border-primary/40 hover:text-foreground transition-colors duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
