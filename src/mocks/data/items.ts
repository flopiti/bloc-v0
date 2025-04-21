import { Cart, Item } from '@/types/core';
import dayjs from 'dayjs';

export const mockItems: Item[] = [
  { id: 1, name: 'Milk', image: '/milk.png' },
  { id: 2, name: 'Eggs', image: '/eggs.png' },
  { id: 3, name: 'Cereal', image: '/cereal.png' },
  { id: 4, name: 'Spaghetti', image: '/spagetti.png' },
  { id: 5, name: 'Ground Meat', image: '/ground-meat.png' },
  { id: 6, name: 'Coffee', image: '/coffee.png' }
]; 

// Confirmed cart with items
const confirmedCart: Cart = {
  confirmedItems: [
    { id: 1, name: 'Milk', image: '/milk.png' },
    { id: 2, name: 'Eggs', image: '/eggs.png' }
  ],
  pendingItems: [],
  confirmed: true,
  nextDelivery: (() => {
    const today = dayjs();
    const tomorrow = today.add(1, 'day');
    const saturday = today.day(6);
    const randomTime = Math.random() * (saturday.diff(tomorrow, 'millisecond'));
    return tomorrow.add(randomTime, 'millisecond').toDate();
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
    nextDelivery: dayjs().add(Math.random() * 7, 'day').toDate()
  }
};

export const getMockCart = (scenario: string = 'confirmed'): Cart  => {
  switch (scenario) {
    case 'new':
        return {
            confirmedItems: [],
            pendingItems: [],
            confirmed: false,
        };
      case 'random':
      return getRandomCart();
    case 'confirmed':
    default:
      return confirmedCart;
  }
};

