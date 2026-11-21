"use client";

import { Clock } from "lucide-react";
import type { BranchHours } from "@/lib/config";
import { isBranchOpen } from "@/lib/hours";
import { useLang } from "@/lib/i18n";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

/**
 * "Open now / Closed" pill, computed in Asia/Beirut time (lib/hours.ts),
 * whatever time zone the visitor's device is set to.
 *
 * Renders nothing until it has resolved in the browser right after load,
 * so the static HTML never bakes in a stale status. Every place that shows
 * this pill also shows the branch hours (BranchHoursLine), so visitors see
 * the hours first and the status appears next to them.
 */
export function BranchStatus({ hours, className }: { hours: BranchHours; className?: string }) {
  const { t } = useLang();
  const now = useNow();

  if (!now) return null;

  const open = isBranchOpen(hours, now);
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border-2 px-3 text-sm font-bold",
        open ? "border-charcoal bg-charcoal text-cream" : "border-charcoal/30 bg-transparent text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-2 rounded-full", open ? "bg-mustard" : "bg-muted/60")}
      />
      {open ? t.status.open : t.status.closed}
      <span className="font-semibold opacity-80">
        · {open ? t.status.closesAt(hours.close) : t.status.opensAt(hours.open)}
      </span>
    </span>
  );
}

/** "Daily 11:00–23:00" (EN) / "كل يوم من 11:00 لـ 23:00" (AR). */
export function BranchHoursLine({ hours, tone = "light" }: { hours: BranchHours; tone?: "light" | "dark" }) {
  const { t } = useLang();
  return (
    <p className="flex items-center gap-2 text-[15px] font-semibold">
      <Clock
        className={cn("size-4 shrink-0", tone === "dark" ? "text-mustard" : "text-paprika")}
        aria-hidden="true"
      />
      <span>
        {t.status.daily} {t.status.range(hours.open, hours.close)}
      </span>
    </p>
  );
}
