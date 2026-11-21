"use client";

import { Bike, ShoppingBag, Store, Trash2, X } from "lucide-react";
import type { ReactNode } from "react";
import { ChatOrderIcon } from "@/components/icons";
import { QuantityStepper } from "@/components/quantity-stepper";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { BRANCHES } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import { getItem } from "@/lib/menu";
import { cn, formatMoney } from "@/lib/utils";
import { buildOrderMessage, buildWhatsAppUrl, cleanLine, type OrderType } from "@/lib/whatsapp";

/**
 * Step 3: the cart drawer. Items, totals, pickup/delivery, branch, contact
 * fields, and the WhatsApp hand-off. Nothing is stored or sent anywhere by
 * the site itself: the button only opens a wa.me link.
 */
export function CartDrawer() {
  const { t, lang } = useLang();
  const cart = useCart();
  const c = t.cart;
  const isDelivery = cart.orderType === "delivery";

  // Why the send button is disabled (first unmet requirement), or null when ready.
  const blocker =
    cart.lines.length === 0
      ? c.needItems
      : cleanLine(cart.name) === ""
        ? c.needName
        : isDelivery && cleanLine(cart.address) === ""
          ? c.needAddress
          : null;

  const waUrl = blocker
    ? null
    : buildWhatsAppUrl(
        buildOrderMessage(
          {
            lines: cart.lines,
            orderType: cart.orderType,
            branchId: cart.branchId,
            name: cart.name,
            address: cart.address,
            notes: cart.notes,
          },
          lang,
        ),
      );

  return (
    <Sheet open={cart.isOpen} onOpenChange={cart.setOpen}>
      <SheetContent>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-charcoal px-5 py-4">
          <div>
            <SheetTitle>{c.title}</SheetTitle>
            <SheetDescription>{c.count(cart.count)}</SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant="outline" size="iconSm" aria-label={c.close} className="shadow-none active:translate-y-0">
              <X strokeWidth={2.5} />
            </Button>
          </SheetClose>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.lines.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-charcoal/30 px-6 py-10 text-center">
              <ShoppingBag className="size-10 text-paprika" aria-hidden="true" />
              <p className="mt-3 font-semibold">{c.empty}</p>
              <SheetClose asChild>
                <Button asChild variant="outline" className="mt-5">
                  <a href="#menu">{c.browse}</a>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {cart.lines.map((line) => {
                const item = getItem(line.id);
                const name = t.items[line.id].name;
                return (
                  <li key={line.id} className="rounded-2xl border-2 border-charcoal/15 bg-paper p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-lg font-bold leading-tight">{name}</p>
                        <p className="mt-0.5 text-sm text-muted">
                          <span dir="ltr">{formatMoney(item.price)}</span> {c.each}
                        </p>
                      </div>
                      <p className="shrink-0 font-display text-lg font-extrabold">
                        <span dir="ltr">{formatMoney(item.price * line.qty)}</span>
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantityStepper
                        size="sm"
                        value={line.qty}
                        onChange={(qty) => cart.setQty(line.id, qty)}
                        label={c.quantity(name)}
                      />
                      <button
                        type="button"
                        onClick={() => cart.removeItem(line.id)}
                        aria-label={c.remove(name)}
                        className="grid size-11 place-items-center rounded-xl text-muted transition-colors hover:bg-paprika/10 hover:text-paprika"
                      >
                        <Trash2 className="size-5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Order details */}
          <div className="mt-6 flex flex-col gap-5">
            <ChoiceGroup<OrderType>
              legend={c.orderType}
              name="order-type"
              value={cart.orderType}
              onChange={cart.setOrderType}
              options={[
                { value: "pickup", label: c.pickup, icon: <Store aria-hidden="true" /> },
                { value: "delivery", label: c.delivery, icon: <Bike aria-hidden="true" /> },
              ]}
            />

            <ChoiceGroup
              legend={c.branch}
              name="cart-branch"
              value={cart.branchId}
              onChange={cart.setBranch}
              options={BRANCHES.map((b) => ({ value: b.id, label: t.branchInfo[b.id].name }))}
            />

            <div>
              <Label htmlFor="order-name">
                {c.name} <span className="font-semibold text-muted">({c.required})</span>
              </Label>
              <Input
                id="order-name"
                name="name"
                autoComplete="name"
                maxLength={60}
                required
                placeholder={c.namePlaceholder}
                value={cart.name}
                onChange={(e) => cart.setField("name", e.target.value)}
              />
            </div>

            {isDelivery ? (
              <div>
                <Label htmlFor="order-address">
                  {c.address} <span className="font-semibold text-muted">({c.required})</span>
                </Label>
                <Input
                  id="order-address"
                  name="address"
                  autoComplete="street-address"
                  maxLength={200}
                  required
                  placeholder={c.addressPlaceholder}
                  value={cart.address}
                  onChange={(e) => cart.setField("address", e.target.value)}
                />
              </div>
            ) : null}

            <div>
              <Label htmlFor="order-notes">
                {c.notes} <span className="font-semibold text-muted">({c.optional})</span>
              </Label>
              <Textarea
                id="order-notes"
                name="notes"
                maxLength={300}
                rows={3}
                placeholder={c.notesPlaceholder}
                value={cart.notes}
                onChange={(e) => cart.setField("notes", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Totals + send, pinned to the bottom of the drawer */}
        <div className="border-t-2 border-charcoal bg-paper px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <dl className="flex flex-col gap-1.5 text-[15px]">
            <TotalRow label={c.subtotal} value={cart.subtotal} />
            {isDelivery ? <TotalRow label={c.deliveryFee} value={cart.deliveryFee} /> : null}
            <TotalRow label={c.total} value={cart.total} strong />
          </dl>

          {waUrl ? (
            <Button asChild size="lg" className="mt-4 w-full">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <ChatOrderIcon className="size-6" />
                {c.send}
              </a>
            </Button>
          ) : (
            <Button size="lg" className="mt-4 w-full" disabled aria-describedby="send-hint">
              <ChatOrderIcon className="size-6" />
              {c.send}
            </Button>
          )}
          <p id="send-hint" aria-live="polite" className="mt-3 text-center text-sm font-semibold text-muted">
            {blocker ?? c.ready}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TotalRow({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", strong && "mt-1 border-t-2 border-dashed border-charcoal/20 pt-2")}>
      <dt className={cn(strong ? "font-display text-lg font-extrabold" : "font-semibold text-muted")}>{label}</dt>
      <dd className={cn("tabular-nums", strong ? "font-display text-2xl font-extrabold text-paprika" : "font-bold")}>
        <span dir="ltr">{formatMoney(value)}</span>
      </dd>
    </div>
  );
}

/** Segmented control built on native radios (works with arrow keys and screen readers). */
function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  onChange,
  options,
}: {
  legend: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; icon?: ReactNode }[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[14px] border-2 border-charcoal/25 bg-paper px-3 font-bold transition-colors hover:border-charcoal has-[:checked]:border-charcoal has-[:checked]:bg-charcoal has-[:checked]:text-cream has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-charcoal [&_svg]:size-5"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.icon}
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
