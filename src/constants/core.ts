import { PAGE } from "@/enums/core";
import React from 'react';
import Home from '@/sections/Home';
import DeliveriesPage from '@/sections/DeliveriesPage';
import CartPage from '@/sections/CartPage';
import ProductsPage from '@/sections/ProductsPage';
import { FiCalendar, FiShoppingCart, FiPackage } from "react-icons/fi";
import { PageConfig } from "@/types/core";
import { GiKetchup } from "react-icons/gi";
import { IoMdNutrition } from "react-icons/io";
import { PiCoffeeBeanBold, PiBread, PiCheese } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DELIVERY_PAGE : PageConfig = {
  page: PAGE.DELIVERIES,
  title: "Deliveries",
  component: () => React.createElement(DeliveriesPage),
  icons: React.createElement(FiCalendar, { className: "w-8 h-8 text-secondary mb-2" })
}

export const CART_PAGE : PageConfig = {
  page: PAGE.CART,
  title: "Cart",
  component: () => React.createElement(CartPage),
  icons: React.createElement(FiShoppingCart, { className: "w-8 h-8 text-secondary mb-2" })
}

export const PRODUCTS_PAGE : PageConfig = {
  page: PAGE.PRODUCTS,
  title: "Products",
  component: () => React.createElement(ProductsPage),
  icons: [
    React.createElement(FiPackage, { className: "w-8 h-8 text-secondary mb-2" }),
    React.createElement(GiKetchup, { className: "w-8 h-8 text-secondary mb-2" }),   
    React.createElement(PiCoffeeBeanBold, { className: "w-8 h-8 text-secondary mb-2" }),
    React.createElement(TbMeat, { className: "w-8 h-8 text-secondary mb-2" }),
    React.createElement(PiBread, { className: "w-8 h-8 text-secondary mb-2" }),
    React.createElement(PiCheese, { className: "w-8 h-8 text-secondary mb-2" }),
    React.createElement(IoMdNutrition, { className: "w-8 h-8 text-secondary mb-2" }),  
  ]
}

export const PAGES: PageConfig[] = [
  {
    page: PAGE.HOME,
    title: "Home",
    component: () => React.createElement(Home)
  },
  DELIVERY_PAGE,
  CART_PAGE,
  PRODUCTS_PAGE
];

export const DELIVERY_DAYS = ['Wednesday', 'Friday']; 