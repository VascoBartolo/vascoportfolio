import {
  Atom,
  BrainCircuit,
  CalendarCheck,
  Cloud,
  CloudCog,
  Code2,
  Database,
  Layers,
  LineChart,
  PanelsTopLeft,
  RefreshCw,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const CONTACT = {
  email: "vbartolo00@gmail.com",
  phone: "+351 912 878 243",
  phoneHref: "tel:+351912878243",
  location: "Angra do Heroísmo, Azores, Portugal",
  cv: "/Vasco_Bartolomeu_CV.pdf",
  bookingSubject: encodeURIComponent("Project enquiry — let's talk"),
};

export const CLIENTS = [
  "Red Bull",
  "Porsche eBike",
  "Enari GmbH",
  "Digital Loop",
  "HybridDigital",
  "Raceland",
];

/** Career start year; the "years building" stat is derived from it. */
export const CAREER_START_YEAR = 2022;

export function yearsBuilding(now = new Date()): number {
  const start = new Date(CAREER_START_YEAR, 0, 1);
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000);
  return Math.max(1, Math.floor(years));
}

export const HERO_STATS = [
  { value: yearsBuilding(), suffix: "+", label: "years building" },
  { value: 25, suffix: "+", label: "projects shipped" },
  { value: 10, suffix: "+", label: "live websites" },
];

export const CURRENT_ROLE = {
  title: "Founder and Lead Software Developer",
  company: "DEP - Digital Enterprise Provider",
};

export interface Pillar {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const PILLARS: Pillar[] = [
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
    text: "React frontends, FastAPI/Flask backends and booking platforms. I ship the whole product, not just the model.",
  },
];

export const FLAGSHIP = {
  name: "DEP Schedule",
  url: "https://deep-orpin.vercel.app/",
  tagline: "Schedule smarter. Operate better.",
  description:
    "A scheduling optimization platform I architected and built. It assigns the right people, with the right skills, to the right work, producing conflict-free, cost-efficient schedules for any business that manages teams, services or resources.",
  /** Phone-length version of the description (fits without clamping). */
  descriptionShort:
    "A scheduling optimization platform I architected and built: the right people, with the right skills, on the right work. Conflict-free, cost-efficient schedules in minutes.",
  problem:
    "Manual scheduling silently drains businesses: planners lose 15–20 hours every week, around 20% of assignments collide in double bookings, and unbalanced workloads push turnover up. DEP Schedule removes all of that in minutes, not hours.",
  results: [
    { value: 80, suffix: "%", label: "Planning time saved" },
    { value: 99, suffix: "%", label: "Conflict-free schedules" },
    { value: 10, prefix: "<", suffix: "min", label: "Solve time" },
    { value: 50, suffix: "+%", label: "Cost savings" },
  ],
  steps: [
    {
      icon: Settings2,
      step: "01",
      title: "Configure",
      text: "Define shifts, availability, qualifications and business constraints through a web interface or REST API.",
    },
    {
      icon: BrainCircuit,
      step: "02",
      title: "Optimize",
      text: "A multi-stage optimization engine balances coverage, fairness and compliance automatically.",
    },
    {
      icon: CalendarCheck,
      step: "03",
      title: "Schedule",
      text: "Receive a conflict-free, capacity-balanced schedule ready to plug into operations within minutes.",
    },
  ],
  features: [
    { icon: ShieldCheck, text: "Hard constraints: no double bookings, guaranteed rest" },
    { icon: Layers, text: "Multi-tenant, enterprise-grade cloud architecture" },
    { icon: RefreshCw, text: "Real-time rescheduling and mid-season adjustments" },
    { icon: LineChart, text: "Rapid what-if analysis, re-optimized in minutes" },
  ],
};

export interface Project {
  client: string;
  /** Client website domain, used to fetch its favicon as a company icon. */
  clientDomain: string;
  /** Local logo in /public/logos (preferred over the favicon when present). */
  logo?: string;
  title: string;
  text: string;
  tags: string[];
  domain: string;
}

export const PROJECTS: Project[] = [
  {
    client: "Red Bull",
    clientDomain: "redbull.com",
    title: "SurfAI Coach",
    text: "An AI coaching application that analyzes surf training videos and generates personalized coaching feedback for athletes.",
    tags: ["PyTorch", "Hugging Face", "OpenCV", "Azure"],
    domain: "Computer vision",
  },
  {
    client: "Enari GmbH",
    clientDomain: "enari.de",
    logo: "/logos/enari.png",
    title: "Hand Pose from Muscle Signals",
    text: "Convolutional neural networks that infer full hand pose from electrical impedance measurements of muscle activation. No camera required.",
    tags: ["CNNs", "PyTorch", "Azure ML", "Mediapipe"],
    domain: "Deep learning",
  },
  {
    client: "Digital Loop",
    clientDomain: "digitalloop.de",
    logo: "/logos/digital-loop.png",
    title: "LLM-Powered SEO Intelligence",
    text: "Large Language Model integrations that turn raw analytics into actionable SEO insights, deployed on fully automated cloud pipelines.",
    tags: ["OpenAI", "Gemini", "Terraform", "Hugging Face", "FastAPI"],
    domain: "LLM systems",
  },
  {
    client: "HybridDigital",
    clientDomain: "hybriddigital.de",
    logo: "/logos/hybrid-digital.png",
    title: "Material Classification Platform",
    text: "A Kubernetes-hosted computer vision service detecting anomalies in material images and quantifying affected areas for industrial QA.",
    tags: ["Kubernetes", "OpenCV", "Azure DevOps", "Scikit-learn"],
    domain: "Industrial AI",
  },
  {
    client: "Porsche eBike",
    clientDomain: "porsche-ebike.com",
    logo: "/logos/porsche-ebike.png",
    title: "Bicycle KPI Prediction",
    text: "End-to-end machine learning pipeline predicting e-bike performance KPIs with regression models, provisioned and served on Azure.",
    tags: ["Scikit-learn", "Azure ML", "AKS"],
    domain: "MLOps",
  },
  {
    client: "Raceland Automação",
    clientDomain: "raceland.pt",
    title: "Smart Home Automation",
    text: "A complete home automation platform for motorhomes: custom firmware, PLC control, Whisper voice commands and YOLOv5 detection, shipped with apps on both stores.",
    tags: ["Python", "YOLOv5", "Whisper", "Web Components"],
    domain: "IoT product",
  },
];

/** Company favicon via Google's icon service (falls back to a monogram). */
export const companyIcon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

export interface Site {
  name: string;
  url: string;
  type: string;
  accent: string;
}

export const SITES: Site[] = [
  {
    name: "Inês — Nutricionista",
    url: "https://ineswebsite.vercel.app/",
    type: "Landing page + booking",
    accent: "#34d399",
  },
  {
    name: "DEP Schedule",
    url: "https://deep-orpin.vercel.app/",
    type: "Product landing page",
    accent: "#60a5fa",
  },
  {
    name: "Enari",
    url: "https://enariwebsite.vercel.app/",
    type: "Company landing page",
    accent: "#a78bfa",
  },
  {
    name: "Haja Saúde — Fisioterapia",
    url: "https://www.hajasaudefisio.com/",
    type: "Clinic landing page",
    accent: "#f472b6",
  },
  {
    name: "Raceland Automação",
    url: "https://raceland.pt/automacao/",
    type: "Product landing page",
    accent: "#fb923c",
  },
  {
    name: "Barbershop",
    url: "https://barbershopwebsite-rho.vercel.app/",
    type: "Landing page + booking",
    accent: "#f97316",
  },
  {
    name: "Next Energy",
    url: "https://nextenergy.pt/",
    type: "Company website",
    accent: "#4ade80",
  },
  {
    name: "Grupo Next Energy",
    url: "https://www.gruponextenergy.com/",
    type: "Group website",
    accent: "#facc15",
  },
];

/* Live hero-section screenshots via the WordPress mShots service. */
export const screenshot = (url: string) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`;

export const WORK = [
  {
    period: "Present",
    role: CURRENT_ROLE.title,
    org: CURRENT_ROLE.company,
    points: [
      "Founded DEP to build AI products, digital platforms and booking systems for businesses",
      "Architected and shipped DEP Schedule, an AI scheduling optimization SaaS",
      "Designs, develops and deploys landing pages and booking platforms for real clients",
      "Leads product, architecture and delivery end to end, from model to interface",
    ],
  },
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

export const EDUCATION = [
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

export interface StackGroup {
  icon: LucideIcon;
  title: string;
  items: string[];
}

export const STACK: StackGroup[] = [
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
      "AWS",
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
      "Three.js",
      "Lit Element",
      "Dynamics 365",
    ],
  },
];

export const MARQUEE_A = [
  "Python",
  "PyTorch",
  "Azure ML",
  "Kubernetes",
  "React",
  "FastAPI",
  "Terraform",
  "OpenCV",
  "TypeScript",
  "Docker",
  "Scikit-learn",
  "PostgreSQL",
];

export const MARQUEE_B = [
  "OpenAI",
  "Claude",
  "Hugging Face",
  "Next.js",
  "Databricks",
  "pySpark",
  "Three.js",
  "Tailwind",
  "MongoDB",
  "GitLab CI",
  "Whisper",
  "YOLO",
];
