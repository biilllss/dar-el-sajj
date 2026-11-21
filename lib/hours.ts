import { TIMEZONE, type BranchHours } from "./config";

const DAY = 24 * 60;

/** "HH:MM" -> minutes since midnight. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Minutes since midnight right now in Beirut, regardless of the visitor's time zone. */
function minutesInTimezone(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

/**
 * Open/closed for a branch at a given moment.
 * Handles closing times at or after midnight ("00:00", "01:30"...) by
 * treating them as the next day.
 */
export function isBranchOpen(hours: BranchHours, date: Date): boolean {
  const now = minutesInTimezone(date);
  const open = toMinutes(hours.open);
  let close = toMinutes(hours.close);
  if (close <= open) close += DAY;

  // Check today's window, and yesterday's window spilling past midnight.
  return (now >= open && now < close) || (now + DAY >= open && now + DAY < close);
}
