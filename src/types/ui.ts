import { PAGE } from "@/enums/core";

export interface PageConfig {
    page: PAGE;
    title: string;
    component: React.ReactNode;
    rightElementText?: string;
  }