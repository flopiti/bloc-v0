import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/core";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { FiCheck, FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface ProductProps {
    isAddOpen: boolean;
    product: Product;
}

const ProductBox = ({ isAddOpen, product }: ProductProps) => {
    const { addItem, removeItem } = useCart();
    const { cart } = useCartStore();
    const [isClicking, setIsClicking] = useState(false);
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);

    const isInCart = cart ? [...cart.confirmedItems, ...cart.pendingItems].some(cartItem => cartItem.productId === product.id) : false;
    const hasProductTypes = product.productTypes && product.productTypes.length > 0;

    const handleCartAction = () => {
        if (isClicking) return;
        setIsClicking(true);
        const action = isInCart ? removeItem : addItem;
        const productType = hasProductTypes && product.productTypes ? product.productTypes[currentTypeIndex] : undefined;
        action({
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            productType
        });
    };

    const handleNextType = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!hasProductTypes || !product.productTypes) return;
        const types = product.productTypes;
        setCurrentTypeIndex((prev) => (prev + 1) % types.length);
    };

    return (
        <div className="relative h-full">
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem] relative">
                    <motion.div
                        className={`h-full rounded-lg overflow-hidden relative group cursor-pointer ${
                            isAddOpen && hasProductTypes ? 'w-[85%] mx-auto' : 'w-full'
                        } transition-all duration-300`}
                        whileHover={{ scale: isClicking ? 1 : 1.05 }}
                        whileTap={{ scale: isClicking ? 1 : 0.95 }}
                        onAnimationComplete={() => {
                            setIsClicking(false);
                        }}
                    >
                        <motion.img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain"
                            key={currentTypeIndex}
                            initial={{ y: 0 }}
                            animate={{ 
                                y: [1, -1, 1],
                                transition: {
                                    duration: 0.3,
                                    times: [0, 0.5, 1],
                                    ease: "easeInOut"
                                }
                            }}
                        />
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
                    {isAddOpen && hasProductTypes && product.productTypes && product.productTypes.length > 1 && (
                        <>
                            {currentTypeIndex > 0 && (
                                <motion.button
                                    className="absolute top-1/2 left-[-20px] -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNextType(e);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiChevronLeft className="text-2xl" size={50} strokeWidth={1} />
                                </motion.button>
                            )}
                            {currentTypeIndex < product.productTypes.length - 1 && (
                                <motion.button
                                    className="absolute top-1/2 right-[-20px] -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNextType(e);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiChevronRight className="text-2xl" size={50} strokeWidth={1} />
                                </motion.button>
                            )}
                        </>
                    )}
                </div>
                <div className="h-[40px] px-2">
                    <h3 className="text-sm font-medium text-white line-clamp-2">{product.name}</h3>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <AnimatePresence mode="wait">
                    {isAddOpen && hasProductTypes && product.productTypes && (
                        <motion.div 
                            className="flex items-center gap-2 mb-2 px-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        >
                            <span className="text-xs text-white/70">{product.productTypes[currentTypeIndex]}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
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

export default ProductBox;