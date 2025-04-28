import { motion } from "framer-motion";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

interface QuantityInputProps {
    quantity: number;
    onIncrement: (e: React.MouseEvent) => void;
    onDecrement: (e: React.MouseEvent) => void;
}

const QuantityInput = ({ quantity, onIncrement, onDecrement }: QuantityInputProps) => {
    return (
        <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: 0.2 }}
        >
            <div className="flex items-center bg-white/10 rounded-lg px-4 mt-2 w-full justify-between">
                <motion.button
                    onClick={onDecrement}
                    className="text-white/70 hover:text-white p-1"
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                >
                    {quantity === 1 ? (
                        <FiTrash2 size={18} />
                    ) : (
                        <FiMinus size={24} />
                    )}
                </motion.button>
                <span className="w-8 text-white text-center">{quantity}</span>
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