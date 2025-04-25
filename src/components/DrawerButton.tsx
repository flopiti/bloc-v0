import { BUTTON_HEIGHT, DEFAULT_TRANSITION } from "@/constants/animations";
import { motion } from "framer-motion"


interface DrawerButtonProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

export const DrawerButton = ({isDrawerOpen,setIsDrawerOpen,} : DrawerButtonProps) => (
    <motion.div
      className="full-screen w-2/5 mx-auto rounded-3xl p-[0.35rem] z-20"
      initial={{ bottom: 0}}
      animate={{ 
        y: isDrawerOpen ? `calc(-100vh + ${BUTTON_HEIGHT} + 2rem)` : 0,
      }}
      transition={DEFAULT_TRANSITION}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-white rounded-3xl"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.button
        className="w-full h-[2.25rem] bg-secondary opacity-65 rounded-3xl relative z-10"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        {isDrawerOpen ? "Close" : "Shopping Cart"}
      </motion.button>
    </motion.div>
)