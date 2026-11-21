"use client";

import { useEffect, useState } from "react";
import { ChatOrderIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Size of the corner the button occupies (56px button + 16px gap + margin). */
const ZONE = 88;

/**
 * Mobile-only floating "order" button, docked to the inline-end corner
 * (bottom-right in English, bottom-left in Arabic).
 *
 * It must never sit on top of a button or text. Anything that matters is
 * marked `data-fab-avoid`; an IntersectionObserver watches only the corner
 * the button lives in, and the button steps aside (fades out, unfocusable)
 * whenever one of those elements passes through that corner.
 */
export function FloatingOrderButton() {
  const { t, dir } = useLang();
  const { count, isOpen, setOpen } = useCart();
  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const inCorner = new Set<Element>();

    const setup = () => {
      io?.disconnect();
      inCorner.clear();
      // Shrink the observer's root to the bottom inline-end corner of the viewport.
      // rootMargin is physical (top right bottom left), hence the dir switch.
      const top = -(window.innerHeight - ZONE);
      const side = -(window.innerWidth - ZONE);
      const rootMargin = dir === "rtl" ? `${top}px ${side}px 0px 0px` : `${top}px 0px 0px ${side}px`;

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) inCorner.add(entry.target);
            else inCorner.delete(entry.target);
          }
          setBlocked(inCorner.size > 0);
        },
        { rootMargin },
      );
      document.querySelectorAll("[data-fab-avoid]").forEach((el) => io?.observe(el));
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      io?.disconnect();
    };
  }, [dir]);

  const hidden = blocked || isOpen;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={t.floating.label(count)}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-30 grid size-14 place-items-center rounded-full border-2 border-charcoal bg-paprika text-cream shadow-block transition-[opacity,transform] duration-200 md:hidden",
        hidden ? "pointer-events-none scale-75 opacity-0" : "scale-100 opacity-100",
      )}
    >
      <ChatOrderIcon className="size-7" />
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -end-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full border-2 border-charcoal bg-mustard px-1 text-xs font-extrabold text-charcoal tabular-nums"
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
