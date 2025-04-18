import axios from 'axios';
import { Item } from '../types/core';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const productService = {
  async getAllProducts(): Promise<Item[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}; 