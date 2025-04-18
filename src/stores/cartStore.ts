import { create } from 'zustand';
import { Item } from '@/types/core';

interface CartStore {
  items: Item[];
  setInitialItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  setInitialItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
})); 