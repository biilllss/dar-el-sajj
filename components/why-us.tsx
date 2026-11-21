"use client";

import { Bike, Flame, Store, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [Flame, Bike, Store];

/** Three short reasons. First card in paprika to break the rhythm. */
export function WhyUs() {
  const { t } = useLang();

  return (
    <section id="why" aria-labelledby="why-title" className="on-dark bg-charcoal py-16 text-cream sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} tone="dark" />
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.why.blocks.map((block, i) => {
            const Icon = ICONS[i] ?? Flame;
            return (
              <li key={block.title}>
                <Reveal delay={i * 90} className="h-full">
                  <div
                    data-fab-avoid
                    className={cn(
                      "flex h-full flex-col gap-4 rounded-2xl border-2 p-6",
                      i === 0 ? "border-paprika bg-paprika" : "border-cream/20 bg-white/[0.04]",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-[14px] bg-cream text-charcoal">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <span aria-hidden="true" className="font-display text-4xl font-extrabold text-cream/25 tabular-nums">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight">{block.title}</h3>
                    <p className="leading-relaxed text-cream/85">{block.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
