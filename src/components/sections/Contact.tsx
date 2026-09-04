import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { LogoMark } from "@/components/Logo";
import { CONTACT } from "@/lib/data";

export function Contact() {
  const mailto = `mailto:${CONTACT.email}?subject=${CONTACT.bookingSubject}`;
  return (
    <section id="contact" data-section="contact" className="relative pt-28 md:pt-40 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-[0.55fr_1fr] gap-12 items-center">
          <div className="hidden lg:block min-h-[50vh]" />
          <Reveal scale={0.98}>
            <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 md:p-14">
              <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-sky-400/20 blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[110px] pointer-events-none" />
              <div className="relative">
                <Eyebrow>Contact</Eyebrow>
                <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-metal">
                  <SplitText text="Have a project in mind?" />{" "}
                  <SplitText
                    text="Let's build it."
                    delay={0.2}
                    className="serif-italic text-gradient pr-2"
                  />
                </h2>
                <Reveal delay={0.25}>
                  <p className="mt-6 max-w-xl text-muted-foreground md:text-lg leading-relaxed">
                    Whether it's an AI product, a data pipeline or a website with booking
                    built in, I'm open to freelance work and collaborations. Book a call
                    and let's scope it together.
                  </p>
                </Reveal>

                <Reveal delay={0.35}>
                  <div className="mt-9 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                    <Magnetic strength={0.25} className="w-full sm:w-auto">
                      <a
                        href={mailto}
                        className="btn-primary group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-3 py-3.5 sm:px-7 sm:py-4 text-[13px] sm:text-sm font-semibold text-white"
                      >
                        <Mail className="h-4 w-4" />
                        Book a call
                        <ArrowRight className="hidden sm:block h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.2} className="w-full sm:w-auto">
                      <LiquidGlass
                        as="a"
                        href={CONTACT.phoneHref}
                        interactive
                        className="w-full sm:w-auto px-3 py-3.5 sm:px-6 sm:py-4 text-[13px] sm:text-sm font-semibold text-foreground"
                        contentClassName="w-full justify-center gap-2 whitespace-nowrap"
                      >
                        <Phone className="h-4 w-4 text-sky-300" />
                        {CONTACT.phone}
                      </LiquidGlass>
                    </Magnetic>
                  </div>
                </Reveal>

                <Reveal delay={0.45}>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4 text-sky-300" />
                      {CONTACT.email}
                    </a>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sky-300" />
                      {CONTACT.location}
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="container mt-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <LogoMark className="h-7 w-7" />
            <span>© {new Date().getFullYear()} Vasco Bartolomeu. All rights reserved.</span>
          </div>
          <span className="text-muted-foreground/60">Designed &amp; built in the Azores</span>
        </div>
      </footer>
    </section>
  );
}
