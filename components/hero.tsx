"use client";

import { ArrowDown, Check } from "lucide-react";
import Image from "next/image";
import { ChatOrderIcon, Squiggle } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { PHOTOS } from "@/lib/images";
import { getItem } from "@/lib/menu";
import { formatPrice } from "@/lib/utils";

export function Hero() {
  const { t } = useLang();
  const { setOpen } = useCart();
  const featured = getItem("chicken-shawarma-wrap");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
        <div data-fab-avoid>
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-paper px-3.5 py-1.5 text-sm font-bold">
            <span aria-hidden="true" className="size-2 rounded-full bg-paprika" />
            {t.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.75rem,11.5vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.035em]"
          >
            {t.hero.titleStart}{" "}
            <span className="relative inline-block text-paprika">
              {t.hero.titleAccent}
              <Squiggle className="absolute inset-x-0 -bottom-1 h-3 w-full sm:-bottom-2 sm:h-4" />
            </span>{" "}
            {t.hero.titleEnd}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t.hero.lede}</p>

          <div id="hero-ctas" data-fab-avoid className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={() => setOpen(true)}>
              <ChatOrderIcon className="size-6" />
              {t.hero.orderCta}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#menu">
                {t.hero.menuCta}
                <ArrowDown />
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
            {t.hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-1.5">
                <Check className="size-4 text-paprika" aria-hidden="true" strokeWidth={3} />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border-2 border-charcoal shadow-block-paprika sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={PHOTOS.hero}
              alt={t.hero.imageAlt}
              fill
              preload
              // ~100vw on phones, so a 360px @3x screen gets the 1080w file.
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Price sticker, inline-end top corner. */}
          <div
            aria-hidden="true"
            data-fab-avoid
            className="absolute -end-2 -top-5 grid size-24 rotate-[8deg] place-items-center rounded-full border-2 border-charcoal bg-mustard text-center text-charcoal sm:-end-4 sm:size-28"
          >
            <span className="px-2 text-[13px] font-bold leading-tight">
              {t.hero.sticker}
              <span dir="ltr" className="block font-display text-2xl font-extrabold leading-none sm:text-3xl">
                {formatPrice(3.5)}
              </span>
            </span>
          </div>

          {/* Best-seller tag, inline-start bottom corner. */}
          <div data-fab-avoid className="absolute -bottom-5 start-4 max-w-[80%] rounded-[14px] border-2 border-charcoal bg-paper px-4 py-3 shadow-block">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-paprika">{t.hero.tagLabel}</p>
            <p className="mt-0.5 font-display text-lg font-bold leading-tight">
              {t.items[featured.id].name} <span dir="ltr">{formatPrice(featured.price)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
