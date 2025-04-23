import { motion } from "framer-motion";
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
        <div className="flex flex-col h-full">
            <motion.div
                className="flex-1 rounded-lg overflow-hidden relative group cursor-pointer"
                whileHover={{ scale: isClicking ? 1 : 1.05 }}
                whileTap={{ scale: isClicking ? 1 : 0.95 }}
                onAnimationComplete={() => setIsClicking(false)}
            >
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                {isInCart && (
                    <div className="absolute top-0 right-0">
                        <FiCheck className="text-white text-xl" />
                    </div>
                )}
            </motion.div>
            {isAddOpen && (
                <motion.button
                    className={`mt-2 py-2 px-4 rounded-lg transition-colors ${
                        isInCart 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                    onClick={handleCartAction}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </motion.button>
            )}
        </div>
    );
}   

export default Product;