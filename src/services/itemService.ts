import axios from 'axios';
import { Item } from '../types/core';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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