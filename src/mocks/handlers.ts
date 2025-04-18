import { http, HttpResponse, delay } from 'msw';
import { mockProducts } from './data/products';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, async () => {
    await delay(150);
    return HttpResponse.json(mockProducts);
  }),
]; 