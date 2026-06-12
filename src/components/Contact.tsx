import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container">
        <Reveal>
          <div className="rounded-2xl glass border-white/[0.08] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[480px] rounded-full bg-sky-500/15 blur-[100px] pointer-events-none" />
            <div className="relative">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                Contact
              </p>
              <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
                Have a project in mind?{" "}
                <span className="text-gradient">Let's build it.</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Whether it's an AI product, a data pipeline or a website with
                booking built in — I'm open to freelance work and
                collaborations.
              </p>
              <a
                href="mailto:vbartolo00@gmail.com"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:brightness-110 transition-all duration-200"
              >
                <Mail className="h-5 w-5" />
                vbartolo00@gmail.com
              </a>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-400" />
                  Angra do Heroísmo, Azores, Portugal
                </span>
                <a
                  href="tel:+351912878243"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-sky-400" />
                  +351 912 878 243
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="container mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <LogoMark className="h-7 w-7" />
          <span>
            © {new Date().getFullYear()} Vasco Bartolomeu. All rights
            reserved.
          </span>
        </div>
        <a
          href="#home"
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          Back to top
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </footer>
    </section>
  );
}
