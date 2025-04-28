import { FiChevronLeft } from "react-icons/fi"
import { motion } from "framer-motion"
import { FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";

interface LeftRightNavigatorProps {
    currentIndex: number;
    updateProductType: (newIndex: number) => void;
    length: number;
}

const LeftRightNavigator = ({ currentIndex, updateProductType, length }: LeftRightNavigatorProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (length === 0) return;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const newIndex = (currentIndex + 1) % length;
                updateProductType(newIndex);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const newIndex = (currentIndex - 1 + length) % length;
                updateProductType(newIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [length, currentIndex, updateProductType]);

    const handlePreviousType = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newIndex = (currentIndex - 1 + length) % length;
        updateProductType(newIndex);
    };

    const handleNextType = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % length;
        updateProductType(newIndex);
    };

    return (
        <>
        {currentIndex > 0 && (
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
        {currentIndex < length - 1 && (
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
    )
}

export default LeftRightNavigator;