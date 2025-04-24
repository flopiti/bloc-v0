import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import { Item } from "@/types/core";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { FiCheck } from "react-icons/fi";

interface ProductProps {
    isAddOpen: boolean;
    item: Item;
}

const Product = ({ isAddOpen, item }: ProductProps) => {
    const { addItem, removeItem } = useCart();
    const { cart } = useCartStore();
    const [isClicking, setIsClicking] = useState(false);

    const isInCart = cart ? [...cart.confirmedItems, ...cart.pendingItems].some(cartItem => cartItem.id === item.id) : false;

    const handleCartAction = () => {
        if (isClicking) return;
        setIsClicking(true);
        const action = isInCart ? removeItem : addItem;
        action(item);
    };

    return (
        <div className="relative h-full">
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem]">
                    <motion.div
                        className="h-full rounded-lg overflow-hidden relative group cursor-pointer"
                        whileHover={{ scale: isClicking ? 1 : 1.05 }}
                        whileTap={{ scale: isClicking ? 1 : 0.95 }}
                        onAnimationComplete={() => {
                            setIsClicking(false);
                        }}
                    >
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        {isInCart && (
                            <motion.div 
                                className="absolute top-0 right-0"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <FiCheck className="text-white text-xl" />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
                <div className="h-[40px] mt-3 px-2">
                    <h3 className="text-sm font-medium text-white line-clamp-2">{item.name}</h3>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <AnimatePresence mode="wait">
                    {isAddOpen && (
                        <motion.button
                            className={`w-full py-2 px-4 rounded-lg transition-colors ${
                                isInCart 
                                    ? 'bg-red-500/50 hover:bg-red-600' 
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white`}
                            onClick={handleCartAction}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                        >
                            {isInCart ? 'Remove' : 'Add to Cart'}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}   

export default Product;