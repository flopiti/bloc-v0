import { http, HttpResponse, delay } from 'msw';
import { mockItems } from './data/items';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/items`, async () => {
    await delay(150);
    return HttpResponse.json(mockItems);
  }),
]; 