import { BUTTON_HEIGHT, DEFAULT_TRANSITION } from "@/constants/animations";
import { motion } from "framer-motion"


interface DrawerButtonProps {
    isDrawerOpen: boolean;
    setIsCartOpen: (isDrawerOpen: boolean) => void;
}

export const DrawerButton = ({isDrawerOpen,setIsCartOpen,} : DrawerButtonProps) => (
    <motion.button
    className={`full-screen bg-secondary h-[3rem] w-1/2 mx-auto rounded-3xl`} 
    initial={{ bottom: 0}}
    onClick={() => setIsCartOpen(!isDrawerOpen)}
    animate={{ 
      y: isDrawerOpen ? `calc(-100vh + ${BUTTON_HEIGHT})` : 0,
    }}
    transition={DEFAULT_TRANSITION}
  >
    {isDrawerOpen ? "Close" : "Shopping Cart"}
  </motion.button>  )