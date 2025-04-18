import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  image: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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