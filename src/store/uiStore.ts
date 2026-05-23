"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  recentlyViewed: number[]; // product ids
  addRecentlyViewed: (id: number) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),

      recentlyViewed: [],
      addRecentlyViewed: (id) => {
        const prev = get().recentlyViewed.filter((x) => x !== id);
        set({ recentlyViewed: [id, ...prev].slice(0, 10) });
      },

      wishlist: [],
      toggleWishlist: (id) => {
        const has = get().wishlist.includes(id);
        set({
          wishlist: has
            ? get().wishlist.filter((x) => x !== id)
            : [...get().wishlist, id],
        });
      },
    }),
    {
      name: "gb-wear-ui",
    }
  )
);
