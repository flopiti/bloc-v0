import axios from 'axios';
import { Product } from '@/types/core';
import { API_BASE_URL } from '@/constants/core';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}; 