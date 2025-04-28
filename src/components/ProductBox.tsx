import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";

// Components
import { Product } from "@/types/core";
import QuantityInput from "./QuantityInput";
import LeftRightNavigator from "./LeftRightNavigator";
import ProductBoxSkeleton from "./ProductBoxSkeleton";
import useProduct from "@/hooks/useProduct";

// Types
interface ProductProps {
    isOpen: boolean;
    product: Product;
    isLoading?: boolean;
}

// Animation variants
const imageVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
};

const typeDisplayVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
};

// Sub-components
const ProductImage = ({ 
    product, 
    isOpen, 
    hasProductTypes, 
    isInCart, 
    currentIndex 
}: {
    product: Product;
    isOpen: boolean;
    hasProductTypes: boolean;
    isInCart: boolean;
    currentIndex: number;
}) => (
    <motion.div
        className={`h-full rounded-lg overflow-hidden relative group cursor-pointer ${
            isOpen && hasProductTypes ? 'w-[85%] mx-auto' : 'mx-auto w-full'
        } transition-all duration-300`}
        variants={imageVariants}
        whileHover="hover"
        whileTap="tap"
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
                variants={checkmarkVariants}
                initial="initial"
                animate="animate"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <FiCheck className="text-white text-xl" />
            </motion.div>
        )}
    </motion.div>
);

const ProductTypeDisplay = ({ 
    product, 
    currentIndex 
}: {
    product: Product;
    currentIndex: number;
}) => (
    <motion.div 
        className="flex items-center gap-2 mb-2 px-2"
        variants={typeDisplayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2, delay: 0.1 }}
    >
        <span className="text-xs text-white/70">{product.productTypes?.[currentIndex]}</span>
    </motion.div>
);

const ProductHeader = ({ product }: { product: Product }) => (
    <div className="h-[40px] px-2">
        <h3 className="text-sm font-medium text-white line-clamp-2">{product.name}</h3>
    </div>
);

const ProductBox = ({ isOpen, product, isLoading = false }: ProductProps) => {
    const { 
        currentIndex, 
        quantity, 
        updateQuantity, 
        updateProductType, 
        hasProductTypes, 
        isInCart 
    } = useProduct(product);

    if (isLoading) {
        return <ProductBoxSkeleton />;
    }

    return (
        <div className="relative h-full">
            {/* Top section */}
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem] relative">
                    <ProductImage 
                        product={product}
                        isOpen={isOpen}
                        hasProductTypes={hasProductTypes ?? false}
                        isInCart={isInCart ?? false}
                        currentIndex={currentIndex}
                    />
                    {isOpen && hasProductTypes && product.productTypes && product.productTypes.length > 1 && (
                        <LeftRightNavigator 
                            currentIndex={currentIndex}
                            updateProductType={updateProductType}
                            length={product.productTypes.length}
                        />
                    )}
                </div>
                <ProductHeader product={product} />
            </div>

            {/* Bottom section */}
            <div className="absolute bottom-0 left-0 right-0">
                <AnimatePresence mode="wait">
                    {isOpen && hasProductTypes && product.productTypes && (
                        <ProductTypeDisplay 
                            product={product}
                            currentIndex={currentIndex}
                        />
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