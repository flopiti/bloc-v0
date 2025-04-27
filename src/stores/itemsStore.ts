import { create } from 'zustand';
import { Product } from '@/types/core';

interface ProductsStore {
  products: Product[];
  isLoading: boolean;
  setInitialProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  isLoading: false, 
  setInitialProducts: (products) => set({ products }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
