import axios from 'axios';
import { Item } from '../types/core';
import { API_BASE_URL } from '@/constants/core';

export const itemService = {
  async getAllItems(): Promise<Item[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
}; 