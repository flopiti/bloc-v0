import { motion } from "framer-motion";
import HomeNavigationButton from "@/components/HomeNavigationButton";
import { useNavigationStore } from "@/stores/navigationStore";
import { NAVIGATION_ITEMS } from "@/constants/core";
import { PageConfig } from "@/types/core";

const NavigationGrid = () => {
  const { goToPage } = useNavigationStore();

  return (
    <div>
      <p className="text-white/60 text-center mb-6" >
          Where would you like to go?
      </p>
      <motion.div className="grid grid-cols-3 gap-4">
        {NAVIGATION_ITEMS.map((item: PageConfig) => (
          <HomeNavigationButton
            key={item.page}
            icons={Array.isArray(item.icons) ? item.icons : [item.icons]}
            label={item.title}
            onClick={() => goToPage(item.page)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default NavigationGrid; 