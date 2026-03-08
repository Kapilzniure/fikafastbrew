import { createContext, useContext, useState, ReactNode } from "react";
import { menuItems, MenuItem } from "@/data/menuData";

export interface CartCustomization {
  size: "S" | "M" | "L";
  temp: "hot" | "iced";
  milk: string;
  sugar: string;
  notes: string;
}

export interface CartEntry {
  itemId: number;
  qty: number;
  customization: CartCustomization;
  key: string; // unique key per item+customization combo
}

export const defaultCustomization = (canBeIced: boolean): CartCustomization => ({
  size: "M",
  temp: canBeIced ? "iced" : "hot",
  milk: "Regular",
  sugar: "Normal",
  notes: "",
});

const sizePrice: Record<"S" | "M" | "L", number> = { S: -50, M: 0, L: 100 };

export const entryPrice = (item: MenuItem, c: CartCustomization) =>
  item.price + sizePrice[c.size];

interface CartContextType {
  entries: CartEntry[];
  addEntry: (itemId: number, customization: CartCustomization) => void;
  removeEntry: (key: string) => void;
  updateQty: (key: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  specialInstructions: string;
  setSpecialInstructions: (v: string) => void;
  pickupTime: string;
  setPickupTime: (v: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [pickupTime, setPickupTime] = useState("ASAP");

  const addEntry = (itemId: number, customization: CartCustomization) => {
    const key = `${itemId}-${customization.size}-${customization.temp}-${customization.milk}-${customization.sugar}`;
    setEntries((prev) => {
      const existing = prev.find((e) => e.key === key);
      if (existing) return prev.map((e) => e.key === key ? { ...e, qty: e.qty + 1 } : e);
      return [...prev, { itemId, qty: 1, customization, key }];
    });
  };

  const removeEntry = (key: string) => setEntries((prev) => prev.filter((e) => e.key !== key));

  const updateQty = (key: string, delta: number) => {
    setEntries((prev) =>
      prev.map((e) => e.key === key ? { ...e, qty: Math.max(0, e.qty + delta) } : e)
          .filter((e) => e.qty > 0)
    );
  };

  const clearCart = () => { setEntries([]); setSpecialInstructions(""); setPickupTime("ASAP"); };

  const totalItems = entries.reduce((a, e) => a + e.qty, 0);
  const totalPrice = entries.reduce((sum, e) => {
    const item = menuItems.find((m) => m.id === e.itemId);
    return sum + (item ? entryPrice(item, e.customization) * e.qty : 0);
  }, 0);

  return (
    <CartContext.Provider value={{ entries, addEntry, removeEntry, updateQty, clearCart, totalItems, totalPrice, specialInstructions, setSpecialInstructions, pickupTime, setPickupTime }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
