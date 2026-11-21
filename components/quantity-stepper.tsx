"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** − 1 + control. 44px+ touch targets on both buttons. */
export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  /** Accessible name for the group, e.g. "Quantity for Fries" */
  label: string;
  min?: number;
  size?: "md" | "sm";
}) {
  const { t } = useLang();
  const btn = size === "md" ? "size-11" : "size-10";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center rounded-[14px] border-2 border-charcoal bg-cream",
        size === "md" ? "h-12" : "h-11",
      )}
    >
      <button
        type="button"
        aria-label={t.menu.decrease}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={cn(btn, "grid place-items-center rounded-[11px] transition-colors hover:bg-cream-deep disabled:opacity-35 disabled:hover:bg-transparent")}
      >
        <Minus className="size-4" strokeWidth={3} aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-7 text-center text-base font-extrabold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label={t.menu.increase}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        className={cn(btn, "grid place-items-center rounded-[11px] transition-colors hover:bg-cream-deep disabled:opacity-35 disabled:hover:bg-transparent")}
      >
        <Plus className="size-4" strokeWidth={3} aria-hidden="true" />
      </button>
    </div>
  );
}
