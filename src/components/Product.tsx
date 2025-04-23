import { motion } from "framer-motion";
import useCart from "@/hooks/useCart";
import { Item } from "@/types/core";
import { useState } from "react";

interface ProductProps {
    isAddOpen: boolean;
    item: Item;
}

const Product = ({ isAddOpen, item }: ProductProps) => {
    const { addItem } = useCart();
    const [isClicking, setIsClicking] = useState(false);

    const handleAddToCart = () => {
        if (isClicking) return;
        setIsClicking(true);
        addItem(item);
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
            </motion.div>
            {isAddOpen && (
                <motion.button
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={handleAddToCart}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    Add to Cart
                </motion.button>
            )}
        </div>
    );
}   

export default Product;