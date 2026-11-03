"use client";
import { createContext, useContext, useState } from "react";

export type CartItem = { id: string; kg: number };
type Ctx = {
  items: CartItem[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  setKg: (id: string, kg: number) => void;
  clear: () => void;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const has = (id: string) => items.some((i) => i.id === id);
  const add = (id: string) => setItems((s) => (s.some((i) => i.id === id) ? s : [...s, { id, kg: 1 }]));
  const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));
  const toggle = (id: string) => (has(id) ? remove(id) : add(id));
  const setKg = (id: string, kg: number) => setItems((s) => s.map((i) => (i.id === id ? { ...i, kg: Math.max(0.5, Math.round(kg * 2) / 2) } : i)));
  const clear = () => setItems([]);
  return <CartCtx.Provider value={{ items, has, toggle, add, remove, setKg, clear }}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx)!;
