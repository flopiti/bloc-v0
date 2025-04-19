import axios from 'axios';
import { Cart } from '../types/core';
import { API_BASE_URL } from '@/constants/core';

export const cartService = {
  async getCart(): Promise<Cart> {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },
}; 