import type { SVGProps } from "react";

/** Brand mark: a sajj dome on its burner, with three wisps of steam. */
export function SajjMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" {...props}>
      <rect width="40" height="40" rx="11" fill="var(--color-paprika)" />
      <path d="M8 26 A12 9.5 0 0 1 32 26 Z" fill="var(--color-cream)" />
      <rect x="6" y="27.5" width="28" height="3.5" rx="1.75" fill="var(--color-mustard)" />
      <path
        d="M15 12.5c-1.2-1.4 1.2-2.6 0-4M20 11.5c-1.2-1.4 1.2-2.6 0-4M25 12.5c-1.2-1.4 1.2-2.6 0-4"
        stroke="var(--color-cream)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Chat bubble with a handset, readable as "order on WhatsApp" without
 * shipping a third-party logo. Not mirrored in RTL (it's a symbol, not an arrow).
 */
export function ChatOrderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill="currentColor"
        transform="translate(7.2 7.2) scale(0.4)"
      />
    </svg>
  );
}

/** Hand-drawn underline for the hero headline accent word. */
export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M3 9c22-6 40-6 60-1s38 5 60 0 48-5 74 1"
        stroke="var(--color-mustard)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
