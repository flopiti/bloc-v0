import { create } from 'zustand';
import { Item, Cart } from '@/types/core';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  setCart: (cart: Cart) => void;
  addItem: (item: Item) => void;
  setLoading: (loading: boolean) => void;
  confirmCart: () => void;
  setDeliveryDate: (deliveryDate: Date) => void;
  isCartValid: () => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
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
  removeItem: (item: Item) => {
    return set((state) => {
      if (!state.cart) {
        throw new Error('Cart is not initialized');
      } 
      const newCart = { 
        ...state.cart, 
        pendingItems: state.cart.pendingItems.filter(i => i.productId !== item.productId), 
        confirmedItems: state.cart.confirmedItems.filter(i => i.productId !== item.productId)
      };
      console.log('Updated cart state:', newCart);
      return { cart: newCart }; 
    });
  },
  
  setDeliveryDate: (deliveryDate: Date) => set((state) => {
    if (!state.cart) {
      throw new Error('Cart is not initialized');
    }
    return { cart: { ...state.cart, nextDelivery: deliveryDate } };
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  confirmCart: () => set((state) => {
    if (!state.cart) {
      throw new Error('Cart is not initialized');
    }
    return { cart: { ...state.cart, confirmed: true } };
  }),
  isCartValid: () => {
    const state = get();
    if (!state.cart) return false;
    const hasItems = state.cart.pendingItems.length > 0 || state.cart.confirmedItems.length > 0;
    const hasDeliveryDate = !!state.cart.nextDelivery;
    return hasItems && hasDeliveryDate;
  },
})); 