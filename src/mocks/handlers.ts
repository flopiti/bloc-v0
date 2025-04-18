import { http, HttpResponse, delay } from 'msw';
import { mockItems } from './data/items';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/items`, async () => {
    await delay(1000);
    return HttpResponse.json(mockItems);
  }),
  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart`, async () => {
    await delay(1000);
    // Return just the first item (Milk) as the initial cart item
    return HttpResponse.json(
      mockItems
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * (mockItems.length + 1)))
    );
  }),
]; 