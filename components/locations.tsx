"use client";

import { MapPin } from "lucide-react";
import { BranchHoursLine, BranchStatus } from "@/components/branch-status";
import { ChatOrderIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { BRANCHES } from "@/lib/config";
import { useLang } from "@/lib/i18n";

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
                  {/* Branch info card (no map embed: addresses are only shared once an order is placed). */}
                  <div
                    data-fab-avoid
                    className="on-dark relative overflow-hidden border-b-2 border-charcoal bg-charcoal p-5 text-cream sm:p-6"
                  >
                    <MapPin
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="pointer-events-none absolute -end-8 -top-8 size-40 text-cream/[0.07]"
                    />
                    <h3 className="relative font-display text-3xl font-extrabold leading-none tracking-[-0.02em]">
                      {info.name}
                    </h3>
                    <p className="relative mt-2.5 flex items-center gap-1.5 text-[15px] font-semibold text-cream/85">
                      <MapPin className="size-4 shrink-0 text-mustard" aria-hidden="true" />
                      {info.area}
                    </p>

                    <div className="relative mt-5 flex flex-col gap-4 border-t-2 border-dashed border-cream/20 pt-4">
                      <div>
                        <p className="mb-1.5 text-sm font-extrabold uppercase tracking-[0.12em] text-mustard">
                          {t.locations.hours}
                        </p>
                        <BranchHoursLine hours={branch.hours} tone="dark" />
                      </div>
                      <p className="inline-flex items-center gap-2 self-start rounded-full border-2 border-cream/25 px-3 py-1.5 text-sm font-bold">
                        <ChatOrderIcon className="size-4 shrink-0 text-mustard" />
                        {t.locations.addressOnOrder}
                      </p>
                    </div>
                  </div>

                  <div data-fab-avoid className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
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
