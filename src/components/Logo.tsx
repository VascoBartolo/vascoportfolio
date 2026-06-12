import { cn } from "@/lib/utils";

/* Dark brand icon (blue gradient VB monogram on navy). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/icon-dark.png"
      alt="Vasco Bartolomeu logo"
      width={512}
      height={512}
      className={cn(
        "h-9 w-9 rounded-md border border-white/[0.08] object-cover",
        className,
      )}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="font-heading font-semibold tracking-[0.18em] text-sm uppercase text-foreground">
        Vasco <span className="text-gradient">Bartolomeu</span>
      </span>
    </a>
  );
}
