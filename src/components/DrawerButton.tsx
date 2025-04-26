import { BUTTON_HEIGHT, DEFAULT_TRANSITION } from "@/constants/animations";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion"
import { GrBasket } from "react-icons/gr";

interface DrawerButtonProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

export const DrawerButton = ({isDrawerOpen,setIsDrawerOpen,} : DrawerButtonProps) => {

  const {cart} = useCartStore();
  const unconfirmedCount = cart?.pendingItems.length;

  return (
    <motion.div
      className="full-screen w-1/2 mx-auto rounded-3xl z-20"
      initial={{ bottom: 0}}
      animate={{ 
        y: isDrawerOpen ? `calc(-100vh + ${BUTTON_HEIGHT} + 2rem)` : 0,
      }}
      transition={DEFAULT_TRANSITION}
    >
      <motion.button
        className="w-full h-[3.25rem] bg-[#444f64] hover:bg-white/10 text-white opacity-80 rounded-xl relative z-10 transition-colors flex items-center justify-center gap-2"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <AnimatePresence>
          {unconfirmedCount && unconfirmedCount > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: 1,
                  scale: [1, 1.1, 1]
                }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-[#a70104]/75 rounded-full px-3 py-1 text-sm font-medium"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={unconfirmedCount}
              >
                {unconfirmedCount}
              </motion.div>
            </AnimatePresence>
          ) : (
            <GrBasket className="mx-2 w-6 h-6 text-secondary" />
          )}
        </AnimatePresence>
        {isDrawerOpen ? "Close" : "Shopping Cart"}
      </motion.button>
    </motion.div>
  )
}