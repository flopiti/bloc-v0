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
      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ 
          backgroundImage: 'url("/shopping_cart.png")',
          opacity: 0.2
        }}
      />
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