import { PAGE } from "@/enums/core";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiCalendar, FiPackage } from "react-icons/fi";
import { GiKetchup } from "react-icons/gi";
import { PiBread, PiCheese, PiCoffeeBeanBold } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import { useState } from "react";

const Home = ({ goToPage }: { goToPage: (page: PAGE) => void }  ) => {
  const icons = [
    <FiPackage key="package" className="w-8 h-8 text-secondary mb-2" />,
    <GiKetchup key="ketchup" className="w-8 h-8 text-secondary mb-2" />,
    <PiCoffeeBeanBold key="coffee" className="w-8 h-8 text-secondary mb-2" />,
    <TbMeat key="meat" className="w-8 h-8 text-secondary mb-2" />,
    <PiBread key="bread" className="w-8 h-8 text-secondary mb-2" />,
    <PiCheese key="cheese" className="w-8 h-8 text-secondary mb-2" />
  ];
  const [currentIconIndex] = useState(() => Math.floor(Math.random() * icons.length));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome</h1>
        
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            onClick={() => goToPage(PAGE.CART)}
            className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiShoppingCart className="w-8 h-8 text-secondary mb-2" />
            <span className="text-white/80 text-sm font-medium">Cart</span>
          </motion.button>

          <motion.button
            onClick={() => goToPage(PAGE.DELIVERIES)}
            className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiCalendar className="w-8 h-8 text-secondary mb-2" />
            <span className="text-white/80 text-sm font-medium">Deliveries</span>
          </motion.button>

          <motion.button
            onClick={() => goToPage(PAGE.PRODUCTS)}
            className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="h-10 w-10 flex items-center justify-center">
              {icons[currentIconIndex]}
            </div>
            <span className="text-white/80 text-sm font-medium">Products</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home;