"use client";

import { ShoppingBag } from "lucide-react";
import { SajjMark } from "@/components/icons";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";
import { cn } from "@/lib/utils";

/** Sticky header: wordmark, EN | AR toggle, cart button with live count. */
export function SiteHeader() {
  const { t, lang } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-charcoal bg-cream">
      <a
        href="#menu"
        className="sr-only rounded-[14px] bg-charcoal px-4 py-3 font-bold text-cream focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50"
      >
        {t.header.skipToMenu}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" aria-label={t.header.homeLabel} className="flex min-w-0 items-center gap-2.5">
          <SajjMark className="size-9 shrink-0" />
          {/* Primary name in the active language; the other script as a quiet echo on wider screens. */}
          <span className="truncate font-display text-[22px] font-extrabold leading-none tracking-[-0.03em]">
            {lang === "ar" ? "دار الصاج" : "Dar el Sajj"}
          </span>
          <span
            lang={lang === "ar" ? "en" : "ar"}
            className="hidden text-sm font-bold text-muted sm:inline"
          >
            {lang === "ar" ? "Dar el Sajj" : "دار الصاج"}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ar", label: "AR" },
  ];

  return (
    <div
      role="group"
      aria-label={t.header.languageLabel}
      className="flex h-11 items-center rounded-full border-2 border-charcoal bg-paper p-0.5"
    >
      {options.map((option, i) => (
        <span key={option.value} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden="true" className="px-0.5 text-charcoal/40">
              |
            </span>
          ) : null}
          <button
            type="button"
            lang={option.value}
            aria-pressed={lang === option.value}
            onClick={() => setLang(option.value)}
            className={cn(
              "h-9 min-w-10 rounded-full px-2.5 text-sm font-extrabold transition-colors",
              lang === option.value ? "bg-charcoal text-cream" : "text-charcoal hover:bg-cream-deep",
            )}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}

function CartButton() {
  const { t } = useLang();
  const { count, bump, setOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={t.header.cartLabel(count)}
      className="relative grid size-12 place-items-center rounded-[14px] border-2 border-charcoal bg-paprika text-cream shadow-[0_3px_0_0_var(--color-charcoal)] transition-[transform,box-shadow] active:translate-y-[3px] active:shadow-none"
    >
      {/* Re-keyed on every add, which replays the bounce animation. */}
      <span key={bump} className={cn("grid place-items-center", bump > 0 && "animate-cart-bounce")}>
        <ShoppingBag className="size-6" aria-hidden="true" />
      </span>
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -end-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-charcoal bg-mustard px-1 text-xs font-extrabold text-charcoal tabular-nums"
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
