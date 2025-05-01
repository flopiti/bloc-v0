import { motion } from "framer-motion";
import { FiShoppingCart, FiCalendar } from "react-icons/fi";
import { GiKetchup } from "react-icons/gi";
import { PiBread, PiCheese, PiCoffeeBeanBold } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import { IoMdNutrition } from "react-icons/io";
import { useState } from "react";
import HomeNavigationButton from "@/components/HomeNavigationButton";
import { PAGE } from "@/enums/core";
import { useNavigationStore } from "@/stores/navigationStore";

const NavigationGrid = () => {
  const { goToPage } = useNavigationStore();
  const icons = [
    <GiKetchup key="ketchup" className="w-8 h-8 text-secondary mb-2" />,
    <PiCoffeeBeanBold key="coffee" className="w-8 h-8 text-secondary mb-2" />,
    <TbMeat key="meat" className="w-8 h-8 text-secondary mb-2" />,
    <PiBread key="bread" className="w-8 h-8 text-secondary mb-2" />,
    <PiCheese key="cheese" className="w-8 h-8 text-secondary mb-2" />,
    <IoMdNutrition key="apple" className="w-8 h-8 text-secondary mb-2" />,
  ];
  const [currentIconIndex] = useState(() => Math.floor(Math.random() * icons.length));

  return (
    <>
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
    </>
  );
};

export default NavigationGrid; 