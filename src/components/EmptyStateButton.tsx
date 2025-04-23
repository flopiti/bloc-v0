import { motion } from "framer-motion";
import { TbShoppingCart } from "react-icons/tb";

interface EmptyStateButtonProps {
    onClick: () => void;
}

const EmptyStateButton = ({ onClick }: EmptyStateButtonProps) => {
    return (
        <motion.div 
            className="relative"
            initial={false}
        >
            <motion.div
                className="absolute inset-0 border-2 border-secondary rounded-2xl pointer-events-none"
                animate={{
                    borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)'],
                    borderWidth: ['2px', '3px', '4px', '3px', '2px']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                }}
            />
            <button onClick={onClick} className="flex items-center justify-center p-6 text-center relative z-10 w-full">
                <div className="flex flex-col items-center">
                    <TbShoppingCart className="w-12 h-12 text-secondary/60 mb-3" />
                    <span className="text-white/80 text-lg font-medium">Your Cart is Empty</span>
                    <span className="text-white/60 text-sm mt-1">Select items to start building your cart</span>
                </div>
            </button>
        </motion.div>
    );
};

export default EmptyStateButton; 