import { DELIVERY_FEE, WHATSAPP_NUMBER, type BranchId } from "./config";
import { getItem, type ItemId } from "./menu";
import { translations, type Lang } from "./translations";
import { formatMoney } from "./utils";

export type OrderType = "pickup" | "delivery";

export type OrderLine = { id: ItemId; qty: number };

export type OrderDetails = {
  lines: OrderLine[];
  orderType: OrderType;
  branchId: BranchId;
  name: string;
  address: string;
  notes: string;
};

/** Collapse whitespace and strip control characters from single-line fields. */
export function cleanLine(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
}

/** Keep line breaks in notes (max one blank line), strip other control characters. */
export function cleanNotes(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function orderTotals(lines: OrderLine[], orderType: OrderType) {
  const subtotal = lines.reduce((sum, line) => sum + getItem(line.id).price * line.qty, 0);
  const deliveryFee = orderType === "delivery" && lines.length > 0 ? DELIVERY_FEE : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

/**
 * Plain-text order message, in the site's current language.
 * Lines that don't apply (delivery fee and address for pickup, empty notes) are left out.
 */
export function buildOrderMessage(order: OrderDetails, lang: Lang): string {
  const t = translations[lang];
  const w = t.whatsapp;
  const { subtotal, deliveryFee, total } = orderTotals(order.lines, order.orderType);
  const isDelivery = order.orderType === "delivery";

  const out: string[] = [w.greeting];
  for (const line of order.lines) {
    const price = getItem(line.id).price * line.qty;
    out.push(w.itemLine(line.qty, t.items[line.id].name, formatMoney(price)));
  }
  out.push(`${w.subtotal}: ${formatMoney(subtotal)}`);
  if (isDelivery) out.push(`${w.deliveryFee}: ${formatMoney(deliveryFee)}`);
  out.push(`${w.total}: ${formatMoney(total)}`);
  out.push(`${w.type}: ${isDelivery ? w.delivery : w.pickup}`);
  out.push(`${w.branch}: ${t.branchInfo[order.branchId].name}`);
  out.push(`${w.name}: ${cleanLine(order.name)}`);
  if (isDelivery) out.push(`${w.address}: ${cleanLine(order.address)}`);
  const notes = cleanNotes(order.notes);
  if (notes) out.push(`${w.notes}: ${notes}`);

  return out.join("\n");
}

/**
 * wa.me deep link. The WHOLE message, including the visitor's name, address
 * and notes, goes through encodeURIComponent exactly once, so line breaks
 * become %0A and characters like "&", "#" or "?" can't break out of the
 * `text` parameter.
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
