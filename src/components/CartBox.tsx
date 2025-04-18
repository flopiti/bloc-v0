import { Item } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";
import { DEFAULT_TRANSITION } from "@/constants/animations";

interface CartBoxProps {
  isLoading: boolean;
  cartItems: Item[];
}

const CartBox = ({ isLoading, cartItems }: CartBoxProps) => {
  return (
    <motion.div 
      className="border-2 border-secondary rounded-3xl relative overflow-hidden"
      layout
      animate={{minHeight: "9rem"}}
      transition={DEFAULT_TRANSITION}
    >
      {isLoading ? (
        <>
          <motion.div 
            className="cart-box-background absolute inset-0"
            animate={{
              x: ["0%", "-100%"]
            }}
            transition={{
              x: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
          <motion.div 
            className="cart-box-background absolute inset-0"
            animate={{
              x: ["100%", "0%"]
            }}
            transition={{
              x: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        </>
      ) : (
        <div className="cart-box-background" />
      )}
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="text-secondary text-lg font-medium"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              fetching your items...
            </motion.div>
          </motion.div>
        ) : cartItems.length > 0 && (
          <motion.div className="flex flex-row gap-4 p-4" layout>
            {cartItems.map((item: Item) => <ItemBox key={item.id} item={item} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CartBox;