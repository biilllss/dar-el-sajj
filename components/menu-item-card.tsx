"use client";

import { Check, Plus, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { QuantityStepper } from "@/components/quantity-stepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import type { MenuItem } from "@/lib/menu";
import { translations } from "@/lib/translations";
import { cn, formatPrice } from "@/lib/utils";

/**
 * One menu item: name (plus the name in the other language as a small echo),
 * description, price, best-seller tag, quantity stepper and Add button.
 */
export function MenuItemCard({ item, onAdded }: { item: MenuItem; onAdded: (message: string) => void }) {
  const { t, lang } = useLang();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const text = t.items[item.id];
  const otherLang = lang === "ar" ? "en" : "ar";
  const otherName = translations[otherLang].items[item.id].name;

  function handleAdd() {
    addItem(item.id, qty);
    onAdded(t.menu.announceAdded(qty, text.name));
    setQty(1);
    setJustAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <article
      data-fab-avoid
      className="flex h-full flex-col gap-3 rounded-2xl border-2 border-charcoal bg-paper p-5 transition-shadow hover:shadow-block"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {item.bestSeller ? (
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-mustard px-2.5 py-1 text-xs font-extrabold text-charcoal">
              <Star className="size-3.5 fill-current" aria-hidden="true" />
              {t.menu.bestSeller}
            </span>
          ) : null}
          <h4 className="font-display text-xl font-bold leading-tight tracking-[-0.01em]">{text.name}</h4>
          <p lang={otherLang} className="mt-0.5 text-sm font-semibold text-muted">
            {otherName}
          </p>
        </div>
        <p className="shrink-0 font-display text-2xl font-extrabold leading-none text-paprika">
          <span dir="ltr">{formatPrice(item.price)}</span>
        </p>
      </div>

      <p className="text-[15px] leading-relaxed text-muted">{text.desc}</p>

      <div className="mt-auto flex items-center gap-3 pt-2">
        <QuantityStepper value={qty} onChange={setQty} label={t.menu.quantity(text.name)} />
        <Button
          onClick={handleAdd}
          aria-label={t.menu.addLabel(qty, text.name)}
          variant={justAdded ? "dark" : "primary"}
          className={cn("min-w-0 flex-1")}
        >
          {justAdded ? <Check strokeWidth={3} aria-hidden="true" /> : <Plus strokeWidth={3} aria-hidden="true" />}
          <span>{justAdded ? t.menu.added : t.menu.add}</span>
        </Button>
      </div>
    </article>
  );
}
