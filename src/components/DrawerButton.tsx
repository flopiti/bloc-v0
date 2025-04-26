import { BUTTON_HEIGHT, DEFAULT_TRANSITION } from "@/constants/animations";
import { motion } from "framer-motion"
import { GrBasket } from "react-icons/gr";


interface DrawerButtonProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

export const DrawerButton = ({isDrawerOpen,setIsDrawerOpen,} : DrawerButtonProps) => (
    <motion.div
      className="full-screen w-1/2 mx-auto rounded-3xl z-20"
      initial={{ bottom: 0}}
      animate={{ 
        y: isDrawerOpen ? `calc(-100vh + ${BUTTON_HEIGHT} + 2rem)` : 0,
      }}
      transition={DEFAULT_TRANSITION}
    >
      <motion.button
        className="w-full h-[3.25rem] bg-white/5 hover:bg-white/10 text-white opacity-65 rounded-xl relative z-10 transition-colors flex items-center justify-center gap-2"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
      <GrBasket className="mx-2 w-6 h-6 text-secondary" />
          {isDrawerOpen ? "Close" : "Shopping Cart"}
      </motion.button>
    </motion.div>
)