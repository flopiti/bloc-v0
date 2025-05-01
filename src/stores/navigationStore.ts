import { PAGE } from "@/enums/core";
import { create } from "zustand";

interface NavigationStore {
  currentView: PAGE;
  isDrawerOpen: boolean;
  goToPage: (page: PAGE) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
    currentView: PAGE.HOME,
    isDrawerOpen: false,
    goToPage: (page: PAGE) => set({ currentView: page, isDrawerOpen: false }),
    setIsDrawerOpen: (isOpen: boolean) => {
        console.log('Drawer state changing to:', isOpen);
        set({ isDrawerOpen: isOpen });
    },
}));