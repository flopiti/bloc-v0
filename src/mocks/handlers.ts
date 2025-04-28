import { http, HttpResponse, delay } from 'msw';
import { mockItems, getMockCart } from './data/items';
import { Cart, Item } from '@/types/core';
import dayjs from 'dayjs';

const DELAY = 1000;
// Create a mutable cart state
let currentCart: Cart;

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, async () => {
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
    
    // Check if item already exists in either confirmed or pending items
    const isDuplicate = currentCart?.confirmedItems.some(item => item.productId === newItem.productId) ||
                       currentCart?.pendingItems.some(item => item.productId === newItem.productId);
    
    if (isDuplicate) {
      return new HttpResponse(null, { 
        status: 400,
        statusText: 'Item already exists in cart'
      });
    }
        
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
    
    // Update the cart with the new delivery date and set to unconfirmed
    currentCart = {
      ...currentCart,
      nextDelivery: dayjs(deliveryDate).toDate(),
      confirmed: false // Set to unconfirmed when delivery date changes
    };
    
    return HttpResponse.json(currentCart);
  }),

  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/remove`, async ({ request }) => {
    await delay(DELAY);
    const item = await request.json() as Item;
    
    // Remove the item from the cart
    currentCart = {
      ...currentCart,
      pendingItems: currentCart.pendingItems.filter(i => i.productId !== item.productId),
      confirmedItems: currentCart.confirmedItems.filter(i => i.productId !== item.productId)
    };
    
    return HttpResponse.json(currentCart);
  }),

  http.put(`${import.meta.env.VITE_API_BASE_URL}/cart/edit`, async ({ request }) => {
    await delay(DELAY);
    const editedItem = await request.json() as Item;
    
    // Find the item in either confirmed or pending items
    const existingItem = currentCart.confirmedItems.find(item => item.productId === editedItem.productId) ||
                        currentCart.pendingItems.find(item => item.productId === editedItem.productId);
    
    if (!existingItem) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: 'Item not found in cart'
      });
    }
    
    // Remove the item from both confirmed and pending items
    const newConfirmedItems = currentCart.confirmedItems.filter(item => item.productId !== editedItem.productId);
    const newPendingItems = currentCart.pendingItems.filter(item => item.productId !== editedItem.productId);
    
    // Add the edited item to pending items
    currentCart = {
      ...currentCart,
      confirmedItems: newConfirmedItems,
      pendingItems: [...newPendingItems, editedItem],
      confirmed: false // Set to unconfirmed when an item is edited
    };
    
    return HttpResponse.json(currentCart);
  })
]; 