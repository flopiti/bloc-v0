import { PAGE } from "@/enums/core";
import { ReactElement } from "react";
import React from 'react';
import Home from '@/sections/Home';
import DeliveriesPage from '@/sections/DeliveriesPage';
import CartPage from '@/sections/CartPage';
import ProductsPage from '@/sections/ProductsPage';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface PageConfig {
  page: PAGE;
  title: string;
  component: () => ReactElement;
  rightElementText?: string;
}

export const PAGES: PageConfig[] = [
  {
    page: PAGE.HOME,
    title: "Home",
    component: () => React.createElement(Home)
  },
  {
    page: PAGE.DELIVERIES,
    title: "Deliveries",
    component: () => React.createElement(DeliveriesPage),
    rightElementText: "Biweekly"
  },
  {
    page: PAGE.CART,
    title: "Cart",
    component: () => React.createElement(CartPage)
  },
  {
    page: PAGE.PRODUCTS,
    title: "Products",
    component: () => React.createElement(ProductsPage)
  }
];

export const DELIVERY_DAYS = ['Wednesday', 'Friday']; 