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
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome</h1>
        <p className="text-white/60 text-center mb-6">Where would you like to go?</p>


        <div className="grid grid-cols-3 gap-4">
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
        </div>
      </motion.div>
            
        {/* Featured Section */}
        <div className="my-8">
          <FeaturedSection
            imageUrl="/featured.png"
            onAddToCart={() => goToPage(PAGE.PRODUCTS)}
          />
        </div>
    </div>
  );
};

export default Home;