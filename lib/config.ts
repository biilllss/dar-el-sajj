/**
 * Site-wide constants. Everything a real client would need to change lives here.
 *
 * Dar el Sajj is a fictional restaurant: WHATSAPP_NUMBER is a deliberate
 * placeholder and must be replaced with a real number before going live.
 */

/** Digits only, country code first, no "+" (wa.me format). */
export const WHATSAPP_NUMBER = "961XXXXXXXX";

/** Canonical URL, used for metadata, Open Graph, robots and sitemap. */
export const SITE_URL = "https://dar-el-sajj.vercel.app";

/** Flat delivery fee in USD. Only added to delivery orders. */
export const DELIVERY_FEE = 2;

/** Opening hours are evaluated in this time zone, whatever the visitor's clock says. */
export const TIMEZONE = "Asia/Beirut";

/** Upper bound per line, so nobody sends a 999x shawarma order by accident. */
export const MAX_QTY = 20;

export type BranchHours = {
  /** 24h "HH:MM" */
  open: string;
  /** 24h "HH:MM". "00:00" means midnight (closes after the day ends). */
  close: string;
};

/**
 * Branches. Names and areas are translated in lib/translations.ts.
 * Hours and area only: no street addresses on purpose (concept project).
 */
export const BRANCHES = [
  { id: "hamra", hours: { open: "11:00", close: "23:00" } },
  { id: "jounieh", hours: { open: "11:00", close: "00:00" } },
] as const satisfies ReadonlyArray<{ id: string; hours: BranchHours }>;

export type BranchId = (typeof BRANCHES)[number]["id"];

export const DEFAULT_BRANCH: BranchId = "hamra";
