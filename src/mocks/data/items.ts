import { Cart, Item } from '@/types/core';
import dayjs from 'dayjs';
import { DELIVERY_DAYS } from '@/constants/core';

export const mockItems: Item[] = [
  { id: 1, name: 'Milk', image: '/milk.png' },
  { id: 2, name: 'Eggs', image: '/eggs.png' },
  { id: 3, name: 'Cereal', image: '/cereal.png' },
  { id: 4, name: 'Spaghetti', image: '/spagetti.png' },
  { id: 5, name: 'Ground Meat', image: '/ground-meat.png' },
  { id: 6, name: 'Coffee', image: '/coffee.png' }
]; 

// Helper function to convert day name to day number (0-6)
const getDayNumber = (dayName: string): number => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.indexOf(dayName);
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
    const today = dayjs();
    const nextDeliveryDay = DELIVERY_DAYS.find(day => {
      const nextDay = today.day(getDayNumber(day));
      return nextDay.isAfter(today);
    });
    return nextDeliveryDay ? today.day(getDayNumber(nextDeliveryDay)).toDate() : today.add(1, 'week').day(getDayNumber(DELIVERY_DAYS[0])).toDate();
  })()
};

// Random cart scenario
const getRandomCart = (): Cart => {
  const numItems = Math.floor(Math.random() * mockItems.length);
  const shuffled = [...mockItems].sort(() => 0.5 - Math.random());
  const selectedItems = shuffled.slice(0, numItems);
  
  const today = dayjs();
  const randomDeliveryDay = DELIVERY_DAYS[Math.floor(Math.random() * DELIVERY_DAYS.length)];
  const nextDelivery = today.add(Math.floor(Math.random() * 2), 'week').day(getDayNumber(randomDeliveryDay)).toDate();
  
  return {
    confirmedItems: selectedItems,
    pendingItems: [],
    confirmed: Math.random() > 0.5,
    nextDelivery
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

