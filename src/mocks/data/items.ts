import { Cart, Product } from '@/types/core';
import dayjs from 'dayjs';
import { DELIVERY_DAYS } from '@/constants/core';

export const STRAWBERRIES : Product = {id: 7, name:'Strawberries', image: '/strawberries.png', price: 10}

export const mockItems: Product[] = [
  { id: 1, name: 'Milk', image: '/milk.png', productTypes: ['1%', '2%' ,'Oat'], price: 4 },
  { id: 2, name: 'Eggs', image: '/eggs.png', productTypes: ['12-pack', '18-pack'], price: 3 },
  { id: 3, name: 'Cereal', image: '/cereal.png', price: 5 },
  { id: 4, name: 'Spaghetti', image: '/spagetti.png', price: 2 },
  { id: 5, name: 'Ground Meat', image: '/ground-meat.png', price: 10 },
  { id: 6, name: 'Coffee', image: '/coffee.png', price: 10 },
STRAWBERRIES
]; 

// Helper function to convert day name to day number (0-6)
const getDayNumber = (dayName: string): number => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.indexOf(dayName);
};

// Confirmed cart with items
const confirmedCart: Cart = {
  confirmedItems: [
    { product: { id: 1, name: 'Milk', image: '/milk.png', price: 4 }, quantity: 1 },
    { product: { id: 2, name: 'Eggs', image: '/eggs.png', price: 3 }, quantity: 1 }
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
  const selectedItems = shuffled.slice(0, numItems).map(item => ({
    product: item,
    quantity: Math.floor(Math.random() * 5) + 1
  }));
  
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

