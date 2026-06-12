import { ArrowUpRight, Globe } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";

interface Site {
  name: string;
  url: string;
  type: string;
}

const sites: Site[] = [
  {
    name: "Inês — Nutricionista SPA ",
    url: "https://ineswebsite.vercel.app/",
    type: "Landing page + booking service",
  },
  {
    name: "DEEP",
    url: "https://deep-orpin.vercel.app/",
    type: "Product landing page",
  },
  {
    name: "Enari - SPA",
    url: "https://enariwebsite.vercel.app/",
    type: "Landing page",
  },
  {
    name: "Haja Saúde — Fisioterapia",
    url: "https://www.hajasaudefisio.com/",
    type: "Landing page",
  },
  {
    name: "Raceland Automação",
    url: "https://raceland.pt/automacao/",
    type: "Landing page",
  },
  {
    name: "Barbershop",
    url: "https://barbershopwebsite-rho.vercel.app/",
    type: "Landing page + booking service",
  },
];

/* Live hero-section screenshots via the WordPress mShots service —
   self-updating, no stored assets needed. */
const screenshot = (url: string) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`;

function SiteCard({ site }: { site: Site }) {
  const domain = new URL(site.url).hostname.replace("www.", "");
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-lg glass border-white/[0.08] overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary shrink-0">
        <img
          src={screenshot(site.url)}
          alt={`Preview of ${site.name} website`}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="p-5 flex flex-1 items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold group-hover:text-sky-300 transition-colors duration-200 line-clamp-2">
            {site.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{site.type}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-white/[0.06] px-3 py-1 text-xs text-muted-foreground shrink-0">
          <Globe className="h-3 w-3 text-sky-400" />
          {domain}
        </span>
      </div>
    </a>
  );
}

export function Websites() {
  return (
    <section id="websites" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 -left-64 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Live websites"
          title="Websites built & shipped"
          description="Landing pages and booking platforms designed, developed and deployed for real businesses. Click any preview to visit the live site."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site, i) => (
            <Reveal key={site.url} delay={(i % 3) * 0.08} className="h-full">
              <SiteCard site={site} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
