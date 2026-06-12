import { MapPin, ArrowRight, ChevronDown, FileDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

/* CTAs + quick stats. Rendered inside the left column on desktop,
   and below the 3D scene on mobile. */
function HeroActions({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
        <a
          href="#flagship"
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:brightness-110 transition-all duration-200"
        >
          Explore my work
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-md glass px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07] transition-colors duration-200"
        >
          Get in touch
        </a>
        <a
          href="/Vasco_Bartolomeu_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md glass px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07] transition-colors duration-200"
        >
          <FileDown className="h-4 w-4" />
          Download CV
        </a>
      </div>

      <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-muted-foreground">
        <div>
          <span className="font-heading text-2xl font-bold text-foreground">
            4+
          </span>{" "}
          years building
        </div>
        <div>
          <span className="font-heading text-2xl font-bold text-foreground">
            15+
          </span>{" "}
          projects shipped
        </div>
        <div>
          <span className="font-heading text-2xl font-bold text-foreground">
            3
          </span>{" "}
          languages spoken
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-dvh flex flex-col grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#60A5FA"
      />

      <div className="container flex-1 flex flex-col lg:flex-row items-center justify-center pt-24 pb-4 lg:pt-16 lg:pb-0 gap-6 lg:gap-8 relative z-10">
        {/* Intro text */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6 text-sm text-muted-foreground",
            )}
          >
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            Azores, Portugal
            <span className="mx-1 text-white/20">|</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Open to new projects
          </div>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Vasco Bartolomeu
            </span>
            <br />
            <span className="text-gradient">Data Scientist</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              {" "}
              &amp; Engineer
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            I build AI products end to end — from machine learning models and
            cloud infrastructure to the interfaces people use. Physics
            engineer by training, data scientist by craft.
          </p>

          {/* Desktop: actions stay in the left column */}
          <HeroActions className="hidden lg:block mt-8" />
        </div>

        {/* 3D scene */}
        <div className="flex-1 relative w-full h-[340px] md:h-[480px] lg:h-[620px]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Mobile: actions move below the 3D scene */}
        <HeroActions className="lg:hidden" />
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="relative z-10 self-center mb-6 mt-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
