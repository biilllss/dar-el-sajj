"use client";

import { useLang } from "@/lib/i18n";

/** Always-visible disclaimer: this is a portfolio concept, not a real restaurant. */
export function ConceptBadge() {
  const { t } = useLang();
  return (
    <aside className="on-dark bg-charcoal px-4 py-2 text-center text-[13px] font-semibold text-cream">
      <span aria-hidden="true" className="me-2 inline-block size-1.5 rounded-full bg-mustard align-middle" />
      {t.concept.badge}
    </aside>
  );
}
