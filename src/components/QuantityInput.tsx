import { motion } from "framer-motion";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useRef, useEffect } from "react";

interface QuantityInputProps {
    quantity: number;
    onIncrement: (e: React.MouseEvent) => void;
    onDecrement: (e: React.MouseEvent) => void;
}

const QuantityInput = ({ quantity, onIncrement, onDecrement }: QuantityInputProps) => {
    const prevQuantityRef = useRef(quantity);
    const isIncreasing = quantity > prevQuantityRef.current;

    useEffect(() => {
        prevQuantityRef.current = quantity;
    }, [quantity]);

    return (
        <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex items-center bg-white/10 rounded-lg px-4 mt-2 w-full justify-between">
                <motion.button
                    onClick={onDecrement}
                    className={`text-white/70 hover:text-white p-1 ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileTap={{ scale: quantity === 0 ? 1 : 0.8 }}
                    transition={{ duration: 0.1 }}
                    disabled={quantity === 0}
                >
                    {quantity <= 1 ? (
                        <FiTrash2 size={18} />
                    ) : (
                        <FiMinus size={24} />
                    )}
                </motion.button>
                <div className="w-8 h-6 relative overflow-hidden">
                    <motion.span
                        key={quantity}
                        initial={isIncreasing ? { y: -50, opacity: 0 } : { y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.1 }}
                        className="absolute inset-0 flex items-center justify-center text-white"
                    >
                        {quantity}
                    </motion.span>
                </div>
                <motion.button
                    onClick={onIncrement}
                    className="text-white/70 hover:text-white p-1"
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                >
                    <FiPlus size={24} />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default QuantityInput; 