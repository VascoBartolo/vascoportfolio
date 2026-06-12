import { Card, CardContent } from "@/components/ui/card";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { Reveal, SectionHeading } from "@/components/Reveal";

const projects = [
  {
    client: "Red Bull",
    title: "SurfAI Coach",
    text: "An AI coaching application that analyzes surf training videos and generates personalized coaching feedback for athletes.",
    tags: ["PyTorch", "Hugging Face", "OpenCV", "Azure"],
  },
  {
    client: "Enari GmbH",
    title: "Hand Pose Estimation from Muscle Signals",
    text: "Convolutional neural networks that infer full hand pose from electrical impedance measurements of muscle activation — no camera required.",
    tags: ["CNNs", "PyTorch", "Azure ML", "Mediapipe"],
  },
  {
    client: "Digital Loop",
    title: "LLM-Powered SEO Intelligence",
    text: "Large Language Model integrations that turn raw analytics into actionable SEO insights, deployed on fully automated cloud pipelines.",
    tags: ["OpenAI", "Gemini", "Terraform", "FastAPI"],
  },
  {
    client: "HybridDigital",
    title: "Material Classification Platform",
    text: "A Kubernetes-hosted computer vision service detecting anomalies in material images and quantifying affected areas for industrial QA.",
    tags: ["Kubernetes", "OpenCV", "Azure DevOps", "Dynamics 365"],
  },
  {
    client: "Porsche eBike",
    title: "Bicycle KPI Prediction",
    text: "End-to-end machine learning pipeline predicting e-bike performance KPIs with regression models, provisioned and served on Azure.",
    tags: ["Scikit-learn", "Azure ML", "AKS"],
  },
  {
    client: "Raceland Automação",
    title: "Smart Home Automation System",
    text: "A complete home automation platform for motorhomes — custom firmware, PLC control, voice commands via Whisper and object detection with YOLOv5, shipped with mobile apps on both stores.",
    tags: ["Python", "YOLOv5", "Whisper", "Web Components"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Selected projects"
          title="AI systems shipped to real clients"
          description="A selection of machine learning, computer vision and cloud engineering projects delivered for international brands and industrial clients."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.08}>
              <Card className="relative h-full glass border-white/[0.08] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <CursorSpotlight size={220} />
                <CardContent className="p-6 flex flex-col h-full">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-sky-400 mb-3">
                    {project.client}
                  </p>
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {project.text}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground border border-white/[0.06]"
                      >
                        {tag}
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
