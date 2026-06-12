import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FlagshipProduct } from "@/components/FlagshipProduct";
import { Projects } from "@/components/Projects";
import { Websites } from "@/components/Websites";
import { Experience } from "@/components/Experience";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FlagshipProduct />
        <Projects />
        <Websites />
        <Experience />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
