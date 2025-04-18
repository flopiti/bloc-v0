import { create } from 'zustand';
import { Item } from '@/types/core';

interface ItemsStore {
  items: Item[];
  isLoading: boolean;
  setInitialItems: (items: Item[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: [],
  isLoading: false, 
  setInitialItems: (items) => set({ items }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
