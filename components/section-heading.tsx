import { cn } from "@/lib/utils";

/** Eyebrow + big display title + optional lede. Used by every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  className,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div data-fab-avoid className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "text-sm font-extrabold uppercase tracking-[0.14em]",
          tone === "dark" ? "text-mustard" : "text-paprika",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 font-display text-[clamp(2.1rem,7.5vw,3.75rem)] font-extrabold leading-[1] tracking-[-0.025em]"
      >
        {title}
      </h2>
      {lede ? (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-cream/85" : "text-muted")}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
