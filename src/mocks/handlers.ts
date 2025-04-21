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
    
    // If currentCart is not initialized, initialize it with mock data
    if (!currentCart) {
      const scenario = import.meta.env.VITE_CART_SCENARIO || 'confirmed';
      currentCart =  getMockCart(scenario);
    }
    
    return HttpResponse.json(currentCart);
  }),

  http.post(`${import.meta.env.VITE_API_BASE_URL}/cart/initialize`, async () => {
    await delay(DELAY);
    
    const scenario = import.meta.env.VITE_CART_SCENARIO || 'confirmed';
    const mockCart = getMockCart(scenario);
    if (!mockCart) {
      return new HttpResponse(null, { status: 500 });
    }
    
    currentCart = mockCart;
    return HttpResponse.json(currentCart);
  }),

  // Add item to cart, which means the cart is unconfirmed
  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/add`, async ({ request }) => {
    await delay(DELAY);
    const newItem = await request.json() as Item;
        
    // Create a new cart state that includes the new item in pendingItems
    // while preserving existing confirmedItems
    currentCart = {
      confirmedItems: currentCart?.confirmedItems || [],
      pendingItems: currentCart ? [...currentCart.pendingItems, newItem] : [newItem],
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
  }),

  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/delivery-date`, async ({ request }) => {
    await delay(DELAY);
    const { deliveryDate } = await request.json() as { deliveryDate: Date };
    
    // Update the cart with the new delivery date
    currentCart = {
      ...currentCart,
      nextDelivery: deliveryDate
    };
    
  })
]; 