"use client";

/**
 * Cart + order form state. In memory only (no localStorage), as per the brief:
 * a refresh starts a fresh order.
 */
import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { DEFAULT_BRANCH, MAX_QTY, type BranchId } from "./config";
import { MENU_ITEMS, type ItemId } from "./menu";
import { orderTotals, type OrderLine, type OrderType } from "./whatsapp";

type Field = "name" | "address" | "notes";

type CartState = {
  quantities: Partial<Record<ItemId, number>>;
  orderType: OrderType;
  branchId: BranchId;
  name: string;
  address: string;
  notes: string;
  isOpen: boolean;
  /** Increments on every add; the header cart button keys its bounce animation on it. */
  bump: number;
};

type Action =
  | { type: "add"; id: ItemId; qty: number }
  | { type: "setQty"; id: ItemId; qty: number }
  | { type: "remove"; id: ItemId }
  | { type: "setField"; field: Field; value: string }
  | { type: "setOrderType"; value: OrderType }
  | { type: "setBranch"; value: BranchId }
  | { type: "setOpen"; value: boolean };

const clampQty = (n: number) => Math.max(0, Math.min(MAX_QTY, Math.round(n)));

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "add": {
      const current = state.quantities[action.id] ?? 0;
      return {
        ...state,
        quantities: { ...state.quantities, [action.id]: clampQty(current + action.qty) },
        bump: state.bump + 1,
      };
    }
    case "setQty": {
      const quantities = { ...state.quantities };
      const qty = clampQty(action.qty);
      if (qty === 0) delete quantities[action.id];
      else quantities[action.id] = qty;
      return { ...state, quantities };
    }
    case "remove": {
      const quantities = { ...state.quantities };
      delete quantities[action.id];
      return { ...state, quantities };
    }
    case "setField":
      return { ...state, [action.field]: action.value };
    case "setOrderType":
      return { ...state, orderType: action.value };
    case "setBranch":
      return { ...state, branchId: action.value };
    case "setOpen":
      return { ...state, isOpen: action.value };
  }
}

const initialState: CartState = {
  quantities: {},
  orderType: "delivery",
  branchId: DEFAULT_BRANCH,
  name: "",
  address: "",
  notes: "",
  isOpen: false,
  bump: 0,
};

type CartContextValue = CartState & {
  lines: OrderLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (id: ItemId, qty: number) => void;
  setQty: (id: ItemId, qty: number) => void;
  removeItem: (id: ItemId) => void;
  setField: (field: Field, value: string) => void;
  setOrderType: (value: OrderType) => void;
  setBranch: (value: BranchId) => void;
  setOpen: (value: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<CartContextValue>(() => {
    // Lines follow menu order, so the cart and the WhatsApp message read like the menu.
    const lines: OrderLine[] = MENU_ITEMS.flatMap((item) => {
      const qty = state.quantities[item.id];
      return qty ? [{ id: item.id, qty }] : [];
    });
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const totals = orderTotals(lines, state.orderType);

    return {
      ...state,
      ...totals,
      lines,
      count,
      addItem: (id, qty) => dispatch({ type: "add", id, qty }),
      setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      setField: (field, value) => dispatch({ type: "setField", field, value }),
      setOrderType: (value) => dispatch({ type: "setOrderType", value }),
      setBranch: (value) => dispatch({ type: "setBranch", value }),
      setOpen: (value) => dispatch({ type: "setOpen", value }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
