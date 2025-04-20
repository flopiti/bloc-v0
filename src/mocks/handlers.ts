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
    console.log('currentCart', currentCart);
    
    // If currentCart is not initialized, initialize it with mock data
    if (!currentCart) {
      const scenario = import.meta.env.VITE_CART_SCENARIO || 'confirmed';
      currentCart = getMockCart(scenario) || { confirmedItems: [], pendingItems: [], confirmed: false };
    }
    
    return HttpResponse.json(currentCart);
  }),

  // Add item to cart, which means the cart is unconfirmed
  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/add`, async ({ request }) => {
    await delay(DELAY);
    const newItem = await request.json() as Item;
    
    // Initialize currentCart if it's undefined
    if (!currentCart) {
      currentCart = {
        confirmedItems: [],
        pendingItems: [],
        confirmed: false
      };
    }
    
    // Create a new cart state that includes the new item in pendingItems
    // while preserving existing confirmedItems
    currentCart = {
      confirmedItems: currentCart.confirmedItems || [],
      pendingItems: [...(currentCart.pendingItems || []), newItem],
      confirmed: false,
    };
    
    return HttpResponse.json(currentCart);
  }),

  // Confirm cart
  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/confirm`, async () => {
    await delay(DELAY);
    
    // Initialize currentCart if it's undefined
    if (!currentCart) {
      currentCart = {
        confirmedItems: [],
        pendingItems: [],
        confirmed: false
      };
    }

    // Move all pending items to confirmed items and mark cart as confirmed
    currentCart = {
      confirmedItems: [
        ...(currentCart.confirmedItems || []),
        ...(currentCart.pendingItems || [])
      ],
      pendingItems: [],
      confirmed: true,
    };
    
    return HttpResponse.json(currentCart);
  })
]; 