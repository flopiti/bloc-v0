import { Item } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";

interface CartBoxProps {
  isLoading: boolean;
  cartItems: Item[];
}

const CartBox = ({ isLoading, cartItems }: CartBoxProps) => {
  return (
    <motion.div 
      className="border-2 border-secondary rounded-3xl relative overflow-hidden"
      layout
      animate={{
        height: cartItems.length > 0 ? "auto" : "9rem",
        minHeight: "9rem"
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <div className="cart-box-background" />
      <AnimatePresence mode="popLayout">
        {cartItems.length > 0 && (
          <motion.div className="flex flex-row gap-4 p-4" layout>
            {cartItems.map((item: Item) => <ItemBox key={item.id} item={item} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CartBox;