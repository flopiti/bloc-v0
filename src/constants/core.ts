import { PAGE } from "@/enums/core";
import { ReactElement } from "react";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface PageConfig {
  page: PAGE;
  title: string;
  component: () => ReactElement;
  rightElementText?: string;
}


export const DELIVERY_DAYS = ['Wednesday', 'Friday'];
