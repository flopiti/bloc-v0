import { Cart, Item } from '@/types/core';

export const mockItems: Item[] = [
  { id: 1, name: 'Milk', image: '/milk.png' },
  { id: 2, name: 'Eggs', image: '/eggs.png' },
  { id: 3, name: 'Cereal', image: '/cereal.png' },
  { id: 4, name: 'Spaghetti', image: '/spagetti.png' },
  { id: 5, name: 'Ground Meat', image: '/ground-meat.png' },
  { id: 6, name: 'Coffee', image: '/coffee.png' }
]; 

// Cart with confirmed items, and no pending items
export const mockCart: Cart = {
  confirmedItems: [
    { id: 1, name: 'Milk', image: '/milk.png' },
    { id: 2, name: 'Eggs', image: '/eggs.png' }
  ],
  pendingItems: [],
  confirmed: true,
  nextDelivery: (() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const saturday = new Date(today);
    saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
    
    const randomTime = Math.random() * (saturday.getTime() - tomorrow.getTime());
    return new Date(tomorrow.getTime() + randomTime);
  })()
};

