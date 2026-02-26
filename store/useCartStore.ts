// store/useCartStore.ts
// Global cart state — persisted to localStorage via Zustand middleware.
// TODO: Replace persist storage with server-side cart once auth is wired.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Course } from "@/data/courses";

export interface CartState {
  items: Course[];
  couponCode: string;
  discount: number;
  // ── Actions ────────────────────────────────────────────────────
  addItem: (course: Course) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  // ── Derived helpers ────────────────────────────────────────────
  subtotal: () => number;
  total: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  NEXLEARN20: 0.2,  // 20 % off
  NEXLEARN10: 0.1,  // 10 % off
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: "",
      discount: 0,

      addItem: (course) =>
        set((s) => {
          // Prevent duplicates
          if (s.items.find((i) => i.id === course.id)) return s;
          return { items: [...s.items, course] };
        }),

      removeItem: (id) =>
        set((s) => {
          const next = s.items.filter((i) => i.id !== id);
          // Re-calculate discount amount after removal
          const sub = next.reduce((sum, c) => sum + c.price, 0);
          const rate = VALID_COUPONS[s.couponCode] ?? 0;
          return { items: next, discount: sub * rate };
        }),

      clearCart: () => set({ items: [], couponCode: "", discount: 0 }),

      applyCoupon: (code) => {
        const upper = code.trim().toUpperCase();
        const rate = VALID_COUPONS[upper];
        if (!rate) {
          // Keep existing coupon state, signal invalid via returned bool
          return;
        }
        const sub = get().items.reduce((sum, c) => sum + c.price, 0);
        set({ couponCode: upper, discount: sub * rate });
      },

      removeCoupon: () => set({ couponCode: "", discount: 0 }),

      subtotal: () => get().items.reduce((sum, c) => sum + c.price, 0),

      total: () => Math.max(0, get().subtotal() - get().discount),
    }),
    {
      name: "nexlearn-cart",   // localStorage key
      // Only persist items + coupon; derived values recomputed on load
      partialize: (s) => ({
        items: s.items,
        couponCode: s.couponCode,
        discount: s.discount,
      }),
    }
  )
);
