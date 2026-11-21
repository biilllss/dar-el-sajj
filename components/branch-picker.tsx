"use client";

import { Check, MapPin } from "lucide-react";
import { BranchHoursLine, BranchStatus } from "@/components/branch-status";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useCart } from "@/lib/cart";
import { BRANCHES } from "@/lib/config";
import { useLang } from "@/lib/i18n";

/**
 * Step 1: choose a branch. Native radio inputs (keyboard + screen reader
 * friendly for free), styled as big cards. Shares state with the cart.
 */
export function BranchPicker() {
  const { t } = useLang();
  const { branchId, setBranch } = useCart();

  return (
    <section id="branches" aria-labelledby="branches-title" className="border-y-2 border-charcoal bg-cream-deep py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading id="branches-title" eyebrow={t.branches.eyebrow} title={t.branches.title} lede={t.branches.lede} />
        </Reveal>

        <fieldset className="mt-10">
          <legend className="sr-only">{t.branches.title}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            {BRANCHES.map((branch, i) => {
              const info = t.branchInfo[branch.id];
              const checked = branchId === branch.id;
              return (
                <Reveal key={branch.id} delay={i * 90}>
                  <label
                    data-fab-avoid
                    className="group relative flex h-full cursor-pointer flex-col gap-4 rounded-2xl border-2 border-charcoal bg-paper p-5 transition-[box-shadow,transform] has-[:checked]:shadow-block-paprika has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-charcoal sm:p-6"
                  >
                    <input
                      type="radio"
                      name="branch"
                      value={branch.id}
                      checked={checked}
                      onChange={() => setBranch(branch.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="block font-display text-3xl font-extrabold leading-none tracking-[-0.02em]">
                          {info.name}
                        </span>
                        <span className="mt-2 flex items-center gap-1.5 text-[15px] font-semibold text-muted">
                          <MapPin className="size-4 shrink-0" aria-hidden="true" />
                          {info.area}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-charcoal bg-cream transition-colors group-has-[:checked]:bg-paprika group-has-[:checked]:text-cream"
                      >
                        <Check className="size-5 opacity-0 transition-opacity group-has-[:checked]:opacity-100" strokeWidth={3} />
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-muted">{info.blurb}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <BranchHoursLine hours={branch.hours} />
                      <BranchStatus hours={branch.hours} />
                    </div>
                    {checked ? <span className="sr-only">{t.branches.selected}</span> : null}
                  </label>
                </Reveal>
              );
            })}
          </div>
        </fieldset>
      </div>
    </section>
  );
}
