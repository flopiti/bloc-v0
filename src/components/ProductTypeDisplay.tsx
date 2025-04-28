import { motion } from "framer-motion";
import { Product } from "@/types/core";

// Animation variants
const typeDisplayVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
};

interface ProductTypeDisplayProps {
    product: Product;
    currentIndex: number;
}

const ProductTypeDisplay = ({ 
    product, 
    currentIndex 
}: ProductTypeDisplayProps) => (
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

export default ProductTypeDisplay; 