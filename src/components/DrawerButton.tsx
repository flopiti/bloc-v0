import { BUTTON_HEIGHT, DEFAULT_TRANSITION } from "@/constants/animations";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion"
import { GrBasket } from "react-icons/gr";

interface DrawerButtonProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

export const DrawerButton = ({isDrawerOpen, setIsDrawerOpen} : DrawerButtonProps) => {
  const {cart} = useCartStore();
  const unconfirmedCount = cart?.pendingItems.length;

  return (
    <motion.div
      className="fixed bottom-4 left-0 right-0 z-[120] px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1,
        y: isDrawerOpen ? `calc(-100vh + ${BUTTON_HEIGHT} + 2rem)` : 0,
      }}
      transition={DEFAULT_TRANSITION}
      style={{ 
        pointerEvents: 'auto',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <div className="w-1/2 mx-auto">
        <motion.button
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}
          animate={{
              borderColor: !isDrawerOpen && unconfirmedCount && unconfirmedCount > 0 ? ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)'] : 'transparent',
              borderWidth: !isDrawerOpen && unconfirmedCount && unconfirmedCount > 0 ? ['2px', '3px', '2px'] : '0px'
          }}
          transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
          }}
          className={`w-full h-[3.25rem] ${isDrawerOpen ? 'bg-transparent' : 'bg-[#444f64] hover:bg-white/10'} text-white opacity-90 rounded-xl relative z-10 transition-colors flex items-center justify-center gap-2 ${!isDrawerOpen && unconfirmedCount && unconfirmedCount > 0 ? 'border' : ''}`}
          style={{
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)'
          }}
        >
          <AnimatePresence>
            {!isDrawerOpen && unconfirmedCount && unconfirmedCount > 0 ? (
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
            ) : !isDrawerOpen && (
              <GrBasket className="mx-2 w-6 h-6 text-secondary" />
            )}
          </AnimatePresence>
          {isDrawerOpen ? "Close" : "Shopping Cart"}
        </motion.button>
      </div>
    </motion.div>
  )
}