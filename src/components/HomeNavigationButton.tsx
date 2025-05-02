import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface HomeNavigationButtonProps {
    icons: ReactNode[];
    label: string;
    onClick: () => void;
  }
  
  const HomeNavigationButton = ({ icons, label, onClick }: HomeNavigationButtonProps) => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
      }, 3000);

      return () => clearInterval(interval);
    }, [icons.length]);

    return (
      <motion.button
        onClick={onClick}
        className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="h-10 w-10 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIconIndex}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              {icons[currentIconIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="text-white/80 text-sm font-medium">{label}</span>    
      </motion.button>
    );
  };

export default HomeNavigationButton;