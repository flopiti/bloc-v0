import { motion } from "framer-motion";
import HomeNavigationButton from "@/components/HomeNavigationButton";
import { useNavigationStore } from "@/stores/navigationStore";
import { CART_PAGE, DELIVERY_PAGE, PRODUCTS_PAGE } from "@/constants/core";

const NavigationGrid = () => {
  const { goToPage } = useNavigationStore();

  return (
    <div>
      <p className="text-white/60 text-center mb-6" >
          Where would you like to go?
      </p>

      <motion.div 
        className="grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}  
      >
        <HomeNavigationButton
          icons={Array.isArray(CART_PAGE.icons) ? CART_PAGE.icons : [CART_PAGE.icons] }
          label={CART_PAGE.title}
          onClick={() => goToPage(CART_PAGE.page)}
        />
        <HomeNavigationButton
          icons={Array.isArray(DELIVERY_PAGE.icons) ? DELIVERY_PAGE.icons : [DELIVERY_PAGE.icons]}
          label={DELIVERY_PAGE.title}
          onClick={() => goToPage(DELIVERY_PAGE.page)}
        />
        <HomeNavigationButton
          icons={Array.isArray(PRODUCTS_PAGE.icons) ? PRODUCTS_PAGE.icons : [PRODUCTS_PAGE.icons]}
          label={PRODUCTS_PAGE.title}
          onClick={() => goToPage(PRODUCTS_PAGE.page)}
        />
      </motion.div>
    </div>
  );
};

export default NavigationGrid; 