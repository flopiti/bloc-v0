import { create } from 'zustand';
import { Item, Cart } from '@/types/core';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  setCart: (cart: Cart) => void;
  addItem: (item: Item) => void;
  setLoading: (loading: boolean) => void;
  confirmCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  isLoading: false,
  setCart: (cart) => set((state) => ({ cart: { ...state.cart, ...cart } })),
  addItem: (item) => {
    return set((state) => {
      if (!state.cart) {
        throw new Error('Cart is not initialized');
      }
      const newCart = { 
        ...state.cart, 
        pendingItems: [...state.cart.pendingItems, item], 
        confirmed: false 
      };
      console.log('Updated cart state:', newCart);
      return { cart: newCart };
    });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  confirmCart: () => set((state) => {
    if (!state.cart) {
      throw new Error('Cart is not initialized');
    }
    return { cart: { ...state.cart, confirmed: true } };
  }),
})); 