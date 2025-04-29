import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Product } from "@/types/core";

// Animation variants
const imageVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
};

const priceVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
};

interface ProductImageProps {
    product: Product;
    isOpen: boolean;
    hasProductTypes: boolean;
    isInCart: boolean;
    currentIndex: number;
}

const ProductImage = ({ 
    product, 
    isOpen, 
    hasProductTypes, 
    isInCart, 
    currentIndex 
}: ProductImageProps) => {
    console.log(product);
    return (
        <div className="relative">
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
            <motion.div
                className="absolute -top-6 -left-6 z-50"
                initial="initial"
                animate="animate"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <div className="w-10 h-10 rounded-full  bg-white/25 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-medium text-white">${Math.round(product.price)}</span>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductImage; 