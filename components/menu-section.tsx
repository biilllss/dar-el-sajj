"use client";

import Image from "next/image";
import { useState } from "react";
import { MenuItemCard } from "@/components/menu-item-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLang } from "@/lib/i18n";
import { PHOTOS } from "@/lib/images";
import { CATEGORIES, itemsInCategory, type CategoryId } from "@/lib/menu";

/**
 * Step 2: the menu. Category tabs stick under the header while scrolling.
 * All panels stay in the DOM (forceMount) so the whole menu is in the HTML
 * for search engines; inactive panels are display:none.
 */
export function MenuSection() {
  const { t } = useLang();
  const [category, setCategory] = useState<CategoryId>("wraps");
  const [announcement, setAnnouncement] = useState("");

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading id="menu-title" eyebrow={t.menu.eyebrow} title={t.menu.title} lede={t.menu.lede} />
        </Reveal>

        <Tabs value={category} onValueChange={(v) => setCategory(v as CategoryId)} className="mt-8">
          <div data-fab-avoid className="sticky top-16 z-30 -mx-4 border-b-2 border-charcoal/10 bg-cream px-4 py-3 sm:-mx-6 sm:px-6">
            <TabsList aria-label={t.menu.categoriesLabel} className="no-scrollbar -my-1 overflow-x-auto py-1">
              {CATEGORIES.map((id) => (
                <TabsTrigger key={id} value={id}>
                  {t.categories[id].label}
                  <span className="text-xs font-extrabold opacity-60 tabular-nums">{itemsInCategory(id).length}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {CATEGORIES.map((id) => {
            const cat = t.categories[id];
            return (
              <TabsContent
                key={id}
                value={id}
                forceMount
                className="mt-6 data-[state=inactive]:hidden"
              >
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
                  {/* Category banner: short on phones, tall and sticky beside the list on desktop. */}
                  <div
                    data-fab-avoid
                    className="relative aspect-[16/9] overflow-hidden rounded-[18px] border-2 border-charcoal sm:aspect-[21/9] lg:sticky lg:top-40 lg:aspect-[4/5]"
                  >
                    <Image
                      src={PHOTOS.categories[id]}
                      alt={cat.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 460px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/90 via-charcoal/50 to-transparent px-5 pb-5 pt-16 text-cream">
                      <h3 className="font-display text-3xl font-extrabold leading-none tracking-[-0.02em] sm:text-4xl">
                        {cat.label}
                      </h3>
                      <p className="mt-2 text-[15px] font-semibold text-cream/90">{cat.tagline}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {itemsInCategory(id).map((item) => (
                      <MenuItemCard key={item.id} item={item} onAdded={setAnnouncement} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Screen-reader confirmation when something is added. */}
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </section>
  );
}
