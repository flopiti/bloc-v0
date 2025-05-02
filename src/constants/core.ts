import { PAGE } from "@/enums/core";
import React from 'react';
import Home from '@/sections/Home';
import DeliveriesPage from '@/sections/DeliveriesPage';
import CartPage from '@/sections/CartPage';
import ProductsPage from '@/sections/ProductsPage';
import { FiCalendar, FiShoppingCart } from "react-icons/fi";
import { PageConfig } from "@/types/core";
import { GiKetchup } from "react-icons/gi";
import { IoMdNutrition } from "react-icons/io";
import { PiCoffeeBeanBold, PiBread, PiCheese } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ICON_CLASSNAME = "w-8 h-8 text-secondary mb-2";

const DELIVERY_PAGE : PageConfig = {
  page: PAGE.DELIVERIES,
  title: "Deliveries",
  component: () => React.createElement(DeliveriesPage),
  icons: React.createElement(FiCalendar, { className: ICON_CLASSNAME })
}

const CART_PAGE : PageConfig = {
  page: PAGE.CART,
  title: "Cart",
  component: () => React.createElement(CartPage),
  icons: React.createElement(FiShoppingCart, { className: ICON_CLASSNAME })
}

const PRODUCTS_PAGE : PageConfig = {
  page: PAGE.PRODUCTS,
  title: "Products",
  component: () => React.createElement(ProductsPage),
  icons: [
    React.createElement(GiKetchup, { className: ICON_CLASSNAME }),   
    React.createElement(PiCoffeeBeanBold, { className: ICON_CLASSNAME }),
    React.createElement(TbMeat, { className: ICON_CLASSNAME }),
    React.createElement(PiBread, { className: ICON_CLASSNAME }),
    React.createElement(PiCheese, { className: ICON_CLASSNAME }),
    React.createElement(IoMdNutrition, { className: ICON_CLASSNAME }),  
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

export const NAVIGATION_ITEMS = [
  DELIVERY_PAGE,
  CART_PAGE,
  PRODUCTS_PAGE
];

export const DELIVERY_DAYS = ['Wednesday', 'Friday']; 