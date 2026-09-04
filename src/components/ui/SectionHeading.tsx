import type { ReactNode } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Optional italic serif accent appended to the title. */
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 eyebrow",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 animate-pulse-soft" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
  size = "md",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        center && "text-center flex flex-col items-center",
        className,
      )}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <h2
        className={cn(
          "mt-5 font-semibold tracking-[-0.03em] leading-[1.02] text-metal",
          size === "lg"
            ? "text-4xl md:text-6xl lg:text-7xl"
            : "text-3xl md:text-5xl lg:text-[3.5rem]",
        )}
      >
        <SplitText text={title} by="words" />
        {accent && (
          <>
            {" "}
            <SplitText
              text={accent}
              by="words"
              delay={0.15}
              className="serif-italic text-gradient pr-2"
            />
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={0.25}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground",
              center && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
