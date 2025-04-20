import { http, HttpResponse, delay } from 'msw';
import { mockItems, getMockCart } from './data/items';
import { Cart, Item } from '@/types/core';

const DELAY = 1000;
// Create a mutable cart state
let currentCart: Cart;

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/items`, async () => {
    await delay(DELAY);
    return HttpResponse.json(mockItems);
  }),

  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart`, async () => {
    await delay(DELAY);
    
    // Get scenario from environment variable
    const scenario = import.meta.env.VITE_CART_SCENARIO || 'confirmed';
    
    // Initialize cart if not already set
    if (!currentCart) {
      const mockCart = getMockCart(scenario);
      currentCart = mockCart || {
        confirmedItems: [],
        pendingItems: [],
        confirmed: false,
        nextDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000) // Default to tomorrow
      };
    }
    
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
      confirmed: false,
    };
    
    return HttpResponse.json(currentCart);
  }),

  // Confirm cart
  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/confirm`, async () => {
    await delay(DELAY);
    
    // Move all pending items to confirmed items and mark cart as confirmed
    currentCart = {
      ...currentCart,
      confirmedItems: [...currentCart.confirmedItems, ...currentCart.pendingItems],
      pendingItems: [],
      confirmed: true,
    };
    
    return HttpResponse.json(currentCart);
  })
]; 