import { PAGE } from "@/enums/core";
import { motion } from "framer-motion";
import { FiShoppingCart, FiCalendar, FiPackage } from "react-icons/fi";
import { GiKetchup } from "react-icons/gi";
import { PiBread, PiCheese, PiCoffeeBeanBold } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import { useState } from "react";
import HomeNavigationButton from "@/components/HomeNavigationButton";
import FeaturedSection from "@/components/FeaturedSection";

const Home = ({ goToPage }: { goToPage: (page: PAGE) => void }) => {
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
    <div className="flex flex-col items-center justify-start min-h-screen p-6">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-3xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Welcome
        </motion.h1>
        <motion.p 
          className="text-white/60 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Where would you like to go?
        </motion.p>

        <motion.div 
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <HomeNavigationButton
            icon={<FiShoppingCart className="w-8 h-8 text-secondary mb-2" />}
            label="Cart"
            onClick={() => goToPage(PAGE.CART)}
          />
          <HomeNavigationButton
            icon={<FiCalendar className="w-8 h-8 text-secondary mb-2" />}
            label="Deliveries"
            onClick={() => goToPage(PAGE.DELIVERIES)}
          />
          <HomeNavigationButton
            icon={icons[currentIconIndex]}
            label="Products"
            onClick={() => goToPage(PAGE.PRODUCTS)}
          />
        </motion.div>
      </motion.div>
            
      {/* Featured Section */}
      <motion.div 
        className="my-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <motion.h2 
          className="text-white/80 text-sm font-medium tracking-wider mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          Featured
        </motion.h2>
        <FeaturedSection
          imageUrl="/featured.png"
          onAddToCart={() => goToPage(PAGE.PRODUCTS)}
        />
      </motion.div>
    </div>
  );
};

export default Home;