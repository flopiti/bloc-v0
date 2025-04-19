import { http, HttpResponse, delay } from 'msw';
import { mockItems, mockCart as initialCart } from './data/items';
import { Cart, Item } from '@/types/core';


const DELAY = 1000;
// Create a mutable cart state
let currentCart: Cart = { ...initialCart };

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/items`, async () => {
    await delay(DELAY);
    return HttpResponse.json(mockItems);
  }),

  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart`, async () => {
    await delay(DELAY);
    return HttpResponse.json(currentCart);
  }),

  // Add item to cart, which means the cart is unconfirmed
  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/add`, async ({ request }) => {
    await delay(DELAY);
    const newItem = await request.json() as Item;
    
    // Create a new cart state that includes the new item in pendingItems
    currentCart = {
      ...currentCart,
      pendingItems: [...currentCart.pendingItems, newItem],
      confirmed: false  
    };
    
    return HttpResponse.json(currentCart);
  }),
]; 