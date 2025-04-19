import axios from 'axios';
import { Cart, Item } from '../types/core';
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
  
  async addItem(item: Item): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/cart/add`, item);
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  },

  async confirmCart(): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/cart/confirm`);
    } catch (error) {
      console.error('Error confirming cart:', error);
      throw error;
    }
  }
}; 