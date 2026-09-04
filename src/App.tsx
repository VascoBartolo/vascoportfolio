import { useEffect } from "react";
import { initSmoothScroll, ScrollTrigger } from "@/lib/scroll";
import { LiquidGlassFilter } from "@/components/ui/LiquidGlass";
import { Background } from "@/components/Background";
import { SplineRobot } from "@/components/three/SplineRobot";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Flagship } from "@/components/sections/Flagship";
import { Projects } from "@/components/sections/Projects";
import { WebsitesCarousel } from "@/components/sections/WebsitesCarousel";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 600);
    const t2 = window.setTimeout(refresh, 2000);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cleanup();
    };
  }, []);

  return (
    <>
      <LiquidGlassFilter />
      <Background />
      <SplineRobot />
      <Navbar />
      <ScrollProgress />
      <main className="relative z-10">
        <Hero />
        <About />
        <Flagship />
        <Projects />
        <WebsitesCarousel />
        <Experience />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
