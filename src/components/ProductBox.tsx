import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import { Item, Product } from "@/types/core";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { FiCheck, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import QuantityInput from "./QuantityInput";
import LeftRightNavigator from "./LeftRightNavigator";
import ProductBoxSkeleton from "./ProductBoxSkeleton";

interface ProductProps {
    isOpen: boolean;
    product: Product;
    isLoading?: boolean;
}

const ProductBox = ({ isOpen, product, isLoading = false }: ProductProps) => {
    const { addItem, removeItem, editItem } = useCart();
    const { cart } = useCartStore();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const isInCart = cart ? [...cart.confirmedItems, ...cart.pendingItems].some(cartItem => cartItem.product.id === product.id) : false;
    const hasProductTypes = product.productTypes && product.productTypes.length > 0;

    // Helper function to create cart item
    const createCartItem = (quantity: number): Item => ({
        product,
        quantity,
        productType: hasProductTypes && product.productTypes ? product.productTypes[currentIndex] : undefined
    });

    // Helper function to handle click events
    type ClickHandler = (() => void) | ((arg: number) => void);

    const withClickHandler = (handler: ClickHandler) => 
        (e: React.MouseEvent, arg?: number) => {
            e.stopPropagation();
            if (arg !== undefined) {
                (handler as (arg: number) => void)(arg);
            } else {
                (handler as () => void)();
            }
        };

    const updateQuantity = withClickHandler((delta: number) => {
        if (delta === 0) {
            removeItem(createCartItem(1));
            setQuantity(0);
        } else if (quantity === 0 && delta > 0) {
            addItem(createCartItem(1));
            setQuantity(1);
        } else if (delta > 0) {
            editItem(createCartItem(delta));
            setQuantity(delta);
        }
    });

    // Helper function to update product type
    const updateProductType = (newIndex: number) => {
        if (!hasProductTypes || !product.productTypes) return;
        
        setCurrentIndex(newIndex);
        
        // If item is in cart, update its type
        if (isInCart && cart) {
            const cartItem = [...cart.confirmedItems, ...cart.pendingItems].find(item => item.product.id === product.id);
            if (cartItem) {
                editItem({
                    ...cartItem,
                    productType: product.productTypes[newIndex]
                });
            }
        }
    };

    if (isLoading) {
        return <ProductBoxSkeleton />;
    }

    return (
        <div className="relative h-full">
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem] relative">
                    <motion.div
                        className={`h-full rounded-lg overflow-hidden relative group cursor-pointer ${
                            isOpen && hasProductTypes ? 'w-[85%] mx-auto' : 'mx-auto w-full'
                        } transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain"
                            key={currentIndex}
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
                        {isInCart && !isOpen && (
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
                    {isOpen && hasProductTypes && product.productTypes && product.productTypes.length > 1 && (
                        <LeftRightNavigator 
                            currentIndex={currentIndex}
                            updateProductType={updateProductType}
                            length={product.productTypes.length}
                        />
                    )}
                </div>
                <div className="h-[40px] px-2">
                    <h3 className="text-sm font-medium text-white line-clamp-2">{product.name}</h3>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <AnimatePresence mode="wait">
                    {isOpen && hasProductTypes && product.productTypes && (
                        <motion.div 
                            className="flex items-center gap-2 mb-2 px-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        >
                            <span className="text-xs text-white/70">{product.productTypes[currentIndex]}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <QuantityInput
                            quantity={quantity}
                            onUpdateQuantity={updateQuantity}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}   

export default ProductBox;