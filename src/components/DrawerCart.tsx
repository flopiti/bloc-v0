import { Item, Cart } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";
import { DEFAULT_TRANSITION } from "@/constants/animations";
import LoadingCart from "./LoadingCart";
import EmptyStateButton from "./EmptyStateButton";
import { TbShoppingCart } from "react-icons/tb";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

interface DrawerCartProps {
  isLoading: boolean;
  cart: Cart | null;
  handleOpenCart: () => void;
}

const DrawerCart = ({ isLoading, cart, handleOpenCart }: DrawerCartProps) => {
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsPanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
            <div className="p-4">
                <div>
                    <div className="text-white/60 text-sm">Your Cart</div>
                    <div className="text-white font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</div>
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                    {cartItems.map((item: Item) => (
                        <motion.div
                            key={item.id}
                            layout
                            className="w-[calc(33.333%-0.5rem)]"
                        >
                            <ItemBox item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
                
    )
}

export default DrawerCart;