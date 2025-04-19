import { Cart, Item } from '@/types/core';

export const mockItems: Item[] = [
  { id: 1, name: 'Milk', image: '/milk.png' },
  { id: 2, name: 'Eggs', image: '/eggs.png' },
  { id: 3, name: 'Cereal', image: '/cereal.png' },
  { id: 4, name: 'Spaghetti', image: '/spagetti.png' },
  { id: 5, name: 'Ground Meat', image: '/ground-meat.png' },
  { id: 6, name: 'Coffee', image: '/coffee.png' }
]; 
export const mockCart: Cart = {
  confirmedItems: [],
  pendingItems: [],
  confirmed: Math.random() > 0.5
};

// Randomly select a subset of items to be in the cart
const shuffledItems = [...mockItems].sort(() => Math.random() - 0.5);
const totalItemsInCart = Math.floor(Math.random() * (mockItems.length + 1));
const itemsInCart = shuffledItems.slice(0, totalItemsInCart);

// Randomly split the selected items between confirmed and pending
const splitIndex = Math.floor(Math.random() * (itemsInCart.length + 1));
mockCart.confirmedItems = itemsInCart.slice(0, splitIndex);
mockCart.pendingItems = itemsInCart.slice(splitIndex);