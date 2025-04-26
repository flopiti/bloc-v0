import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HomeNavigationButtonProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }
  
  const HomeNavigationButton = ({ icon, label, onClick }: HomeNavigationButtonProps) => (
    <motion.button
      onClick={onClick}
      className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-10 w-10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white/80 text-sm font-medium">{label}</span>    
    </motion.button>
  );

export default HomeNavigationButton;