"use client";

import { useSyncExternalStore } from "react";

/**
 * The current moment (an absolute UTC instant, refreshed every 30 seconds), or
 * `null` during server rendering and hydration, so a status is never baked
 * into the static HTML. The device's time zone plays no part: lib/hours.ts
 * converts this instant to Asia/Beirut wall-clock time before comparing.
 */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

// Snapshot is the current minute, so React only re-renders when it changes.
const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => null;

export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date(minute * 60_000);
}
