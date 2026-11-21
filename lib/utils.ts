import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui class helper: conditional classes + Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "$5" for whole numbers, "$3.50" otherwise. Used on the menu. */
export function formatPrice(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

/** Always two decimals ("$13.00"). Used in the cart and the WhatsApp message. */
export function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`;
}
