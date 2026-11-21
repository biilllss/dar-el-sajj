/**
 * Menu data: ids, prices (USD), categories and best-seller flags.
 * All visible names and descriptions live in lib/translations.ts, keyed by id.
 */

export const CATEGORIES = ["wraps", "plates", "sides", "drinks", "desserts"] as const;
export type CategoryId = (typeof CATEGORIES)[number];

const ITEMS = [
  // Wraps
  { id: "chicken-shawarma-wrap", category: "wraps", price: 5, bestSeller: true },
  { id: "beef-shawarma-wrap", category: "wraps", price: 6 },
  { id: "falafel-wrap", category: "wraps", price: 3.5 },
  { id: "halloumi-wrap", category: "wraps", price: 5 },
  { id: "spicy-chicken-sajj", category: "wraps", price: 6, bestSeller: true },
  // Plates
  { id: "chicken-shawarma-plate", category: "plates", price: 9, bestSeller: true },
  { id: "beef-shawarma-plate", category: "plates", price: 11 },
  { id: "mixed-grill-plate", category: "plates", price: 13 },
  { id: "falafel-plate", category: "plates", price: 7 },
  { id: "half-grilled-chicken", category: "plates", price: 10 },
  // Sides
  { id: "fries", category: "sides", price: 3 },
  { id: "hummus", category: "sides", price: 4 },
  { id: "tabbouleh", category: "sides", price: 4.5 },
  { id: "garlic-toum", category: "sides", price: 1.5 },
  { id: "pickles", category: "sides", price: 1.5 },
  // Drinks
  { id: "ayran", category: "drinks", price: 1.5 },
  { id: "lemonade", category: "drinks", price: 2.5 },
  { id: "mint-lemonade", category: "drinks", price: 3 },
  { id: "soft-drink", category: "drinks", price: 1.5 },
  { id: "water", category: "drinks", price: 1 },
  // Desserts
  { id: "mini-knefe", category: "desserts", price: 4 },
  { id: "baklava-trio", category: "desserts", price: 4.5 },
  { id: "rice-pudding", category: "desserts", price: 3 },
  { id: "halawet-el-jibn", category: "desserts", price: 4.5 },
  { id: "date-cookie", category: "desserts", price: 3 },
] as const satisfies ReadonlyArray<{
  id: string;
  category: CategoryId;
  price: number;
  bestSeller?: boolean;
}>;

export type ItemId = (typeof ITEMS)[number]["id"];

export type MenuItem = {
  id: ItemId;
  category: CategoryId;
  price: number;
  bestSeller?: boolean;
};

export const MENU_ITEMS: readonly MenuItem[] = ITEMS;

const BY_ID = new Map<ItemId, MenuItem>(MENU_ITEMS.map((item) => [item.id, item]));

export function getItem(id: ItemId): MenuItem {
  const item = BY_ID.get(id);
  if (!item) throw new Error(`Unknown menu item: ${id}`);
  return item;
}

export function itemsInCategory(category: CategoryId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === category);
}
