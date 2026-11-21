"use client";

import { useSyncExternalStore } from "react";

/**
 * Current time, refreshed every 30 seconds, or `null` during server rendering
 * and hydration. Open/closed status depends on the visitor's clock, so it must
 * never be baked into the static HTML.
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
