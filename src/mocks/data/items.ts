import { Cart, Item } from '@/types/core';

export const mockItems: Item[] = [
  { id: 1, name: 'Milk', image: '/milk.png' },
  { id: 2, name: 'Eggs', image: '/eggs.png' },
  { id: 3, name: 'Cereal', image: '/cereal.png' },
  { id: 4, name: 'Spaghetti', image: '/spagetti.png' },
  { id: 5, name: 'Ground Meat', image: '/ground-meat.png' },
  { id: 6, name: 'Coffee', image: '/coffee.png' }
]; 

// Empty cart scenario
const emptyCart: Cart = {
  confirmedItems: [],
  pendingItems: [],
  confirmed: true,
  nextDelivery: null
};

// Confirmed cart with items
const confirmedCart: Cart = {
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

// Random cart scenario
const getRandomCart = (): Cart => {
  const numItems = Math.floor(Math.random() * mockItems.length);
  const shuffled = [...mockItems].sort(() => 0.5 - Math.random());
  const selectedItems = shuffled.slice(0, numItems);
  
  return {
    confirmedItems: selectedItems,
    pendingItems: [],
    confirmed: Math.random() > 0.5,
    nextDelivery: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) : null
  };
};

export const getMockCart = (scenario: string = 'confirmed'): Cart => {
  switch (scenario) {
    case 'new':
      return emptyCart;
    case 'random':
      return getRandomCart();
    case 'confirmed':
    default:
      return confirmedCart;
  }
};

