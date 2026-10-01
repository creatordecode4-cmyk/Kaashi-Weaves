"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Size } from "./config";
import { getProduct } from "./products";

export type CartItem = { slug: string; size: Size; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (item: CartItem) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kw-cart-v1";
export const MAX_QTY = 10;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
        setItems(parsed.filter((i) => getProduct(i.slug)));
      }
    } catch {
      /* storage unavailable — start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.slug === item.slug && p.size === item.size);
      if (i === -1) return [...prev, { ...item, qty: Math.min(item.qty, MAX_QTY) }];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(next[i].qty + item.qty, MAX_QTY) };
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, size: Size, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => !(p.slug === slug && p.size === size))
        : prev.map((p) =>
            p.slug === slug && p.size === size ? { ...p, qty: Math.min(qty, MAX_QTY) } : p,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + (getProduct(i.slug)?.price ?? 0) * i.qty, 0);
    return { items, count, subtotal, ready, add, setQty, remove, clear };
  }, [items, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
