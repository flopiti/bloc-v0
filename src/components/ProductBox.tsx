import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/core";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { FiCheck, FiChevronRight, FiChevronLeft, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

interface ProductProps {
    isAddOpen: boolean;
    product: Product;
}

const ProductBox = ({ isAddOpen, product }: ProductProps) => {
    const { addItem, removeItem, editItem } = useCart();
    const { cart } = useCartStore();
    
    const [isClicking, setIsClicking] = useState(false);
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const isInCart = cart ? [...cart.confirmedItems, ...cart.pendingItems].some(cartItem => cartItem.productId === product.id) : false;
    const hasProductTypes = product.productTypes && product.productTypes.length > 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isClicking) return;
        setIsClicking(true);
        const productType = hasProductTypes && product.productTypes ? product.productTypes[currentTypeIndex] : undefined;
        addItem({
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            productType,
            quantity: 1
        });
        setQuantity(1);
        setIsClicking(false);
    };

    const handleRemoveFromCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isClicking) return;
        setIsClicking(true);
        removeItem({
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            productType: hasProductTypes && product.productTypes ? product.productTypes[currentTypeIndex] : undefined,
            quantity: 1
        });
        setQuantity(0);
        setIsClicking(false);
    };

    const handleEditQuantity = (e: React.MouseEvent, newQuantity: number) => {
        e.stopPropagation();
        if (isClicking) return;
        setIsClicking(true);
        const productType = hasProductTypes && product.productTypes ? product.productTypes[currentTypeIndex] : undefined;
        editItem({
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            productType,
            quantity: newQuantity
        });
        setQuantity(newQuantity);
        setIsClicking(false);
    };

    const incrementQuantity = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newQuantity = quantity + 1;
        if (quantity === 0) {
            handleAddToCart(e);
        } else {
            handleEditQuantity(e, newQuantity);
        }
    };

    const decrementQuantity = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity === 1) {
            handleRemoveFromCart(e);
        } else if (quantity > 1) {
            handleEditQuantity(e, quantity - 1);
        }
    };

    const handleNextType = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!hasProductTypes || !product.productTypes) return;
        const types = product.productTypes;
        const newIndex = (currentTypeIndex + 1) % types.length;
        setCurrentTypeIndex(newIndex);
        
        // If item is in cart, update its type
        if (isInCart && cart) {
            const cartItem = [...cart.confirmedItems, ...cart.pendingItems].find(item => item.productId === product.id);
            if (cartItem) {
                editItem({
                    ...cartItem,
                    productType: types[newIndex]
                });
            }
        }
    };

    const handlePreviousType = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!hasProductTypes || !product.productTypes) return;
        const types = product.productTypes;
        const newIndex = (currentTypeIndex - 1 + types.length) % types.length;
        setCurrentTypeIndex(newIndex);
        
        // If item is in cart, update its type
        if (isInCart && cart) {
            const cartItem = [...cart.confirmedItems, ...cart.pendingItems].find(item => item.productId === product.id);
            if (cartItem) {
                editItem({
                    ...cartItem,
                    productType: types[newIndex]
                });
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isAddOpen || !hasProductTypes || !product.productTypes) return;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setCurrentTypeIndex((prev) => (prev + 1) % product.productTypes!.length);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setCurrentTypeIndex((prev) => (prev - 1 + product.productTypes!.length) % product.productTypes!.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAddOpen, hasProductTypes, product.productTypes]);

    return (
        <div className="relative h-full">
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem] relative">
                    <motion.div
                        className={`h-full rounded-lg overflow-hidden relative group cursor-pointer ${
                            isAddOpen && hasProductTypes ? 'w-[85%] mx-auto' : 'mx-auto w-full'
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
                        {isInCart && !isAddOpen && (
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
                                    onClick={handlePreviousType}
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
                                    onClick={handleNextType}
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
                        <motion.div
                            className="flex items-center justify-center gap-2 "
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                        >
                            <div className="flex items-center bg-white/10 rounded-lg px-4 mt-2 w-full justify-between">
                                <button
                                    onClick={decrementQuantity}
                                    className="text-white/70 hover:text-white p-1"
                                >
                                    {quantity === 1 ? (
                                        <FiTrash2 size={18} />
                                    ) : (
                                        <FiMinus size={24} />
                                    )}
                                </button>
                                <span className="w-8 text-white text-center">{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="text-white/70 hover:text-white p-1"
                                >
                                    <FiPlus size={24} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}   

export default ProductBox;