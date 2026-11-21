"use client";

import { MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { BranchHoursLine, BranchStatus } from "@/components/branch-status";
import { ChatOrderIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { BRANCHES, type BranchId } from "@/lib/config";
import { useLang } from "@/lib/i18n";

/** Road angle per branch, so the two placeholder maps don't look identical. */
const ROAD_ANGLE: Record<BranchId, string> = { hamra: "28deg", jounieh: "-34deg" };

export function Locations() {
  const { t } = useLang();
  const { setBranch, setOpen } = useCart();

  return (
    <section
      id="locations"
      aria-labelledby="locations-title"
      className="border-t-2 border-charcoal bg-cream-deep py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            id="locations-title"
            eyebrow={t.locations.eyebrow}
            title={t.locations.title}
            lede={t.locations.lede}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BRANCHES.map((branch, i) => {
            const info = t.branchInfo[branch.id];
            return (
              <Reveal key={branch.id} delay={i * 90} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-charcoal bg-paper">
                  {/* Placeholder map: swap for an embed once there's a real address. */}
                  <div
                    role="img"
                    aria-label={t.locations.mapLabel(info.area)}
                    className="map-pattern relative aspect-[16/9] border-b-2 border-charcoal"
                    style={{ "--road-angle": ROAD_ANGLE[branch.id] } as CSSProperties}
                  >
                    <span data-fab-avoid className="absolute start-3 top-3 rounded-full bg-charcoal px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-cream">
                      {t.locations.mapPreview}
                    </span>
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-14 place-items-center rounded-full border-2 border-charcoal bg-paprika text-cream shadow-block">
                        <MapPin className="size-7" aria-hidden="true" />
                      </span>
                    </span>
                  </div>

                  <div data-fab-avoid className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                    <div>
                      <h3 className="font-display text-3xl font-extrabold leading-none tracking-[-0.02em]">{info.name}</h3>
                      <p className="mt-2 text-[15px] font-semibold text-muted">{info.area}</p>
                    </div>
                    <div>
                      <p className="mb-1.5 text-sm font-extrabold uppercase tracking-[0.12em] text-paprika">
                        {t.locations.hours}
                      </p>
                      <BranchHoursLine hours={branch.hours} />
                    </div>
                    <BranchStatus hours={branch.hours} className="self-start" />
                    <Button
                      variant="outline"
                      className="mt-auto w-full"
                      onClick={() => {
                        setBranch(branch.id);
                        setOpen(true);
                      }}
                    >
                      <ChatOrderIcon />
                      {t.locations.orderFrom(info.name)}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p data-fab-avoid className="mt-6 text-sm font-semibold text-muted">
          {t.locations.note}
        </p>
      </div>
    </section>
  );
}
