import { create } from 'zustand';
import { Item } from '@/types/core';

interface CartStore {
  cartItems: Item[];
  isLoading: boolean;
  setInitialItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  setLoading: (loading: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  isLoading: false,
  setInitialItems: (items) => set({ cartItems: items }),
  addItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  setLoading: (loading) => set({ isLoading: loading }),
})); 