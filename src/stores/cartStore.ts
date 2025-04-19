import { create } from 'zustand';
import { Item, Cart } from '@/types/core';

interface CartStore {
  cart: Cart;
  isLoading: boolean;
  setCart: (cart: Cart) => void;
  addItem: (item: Item) => void;
  setLoading: (loading: boolean) => void;

}

export const useCartStore = create<CartStore>((set) => ({
  cart: {
    confirmedItems: [],
    pendingItems: [],
    confirmed: false,
  },
  isLoading: false,
  setCart: (cart) => set((state) => ({ cart: { ...state.cart, ...cart } })),
  addItem: (item) => set((state) => ({ cart: { ...state.cart, pendingItems: [...state.cart.pendingItems, item] } })),
  setLoading: (loading) => set({ isLoading: loading }),
})); 