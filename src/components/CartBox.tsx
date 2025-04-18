import { Item } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";
import { DEFAULT_TRANSITION } from "@/constants/animations";
import LoadingCartAnimation from "./LoadingCartAnimation";
import LoadingCart from "./LoadingCart";

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
      {isLoading ? <LoadingCartAnimation /> : <div className="cart-box-background" />}
      <AnimatePresence mode="popLayout">
        {isLoading ? (<LoadingCart/>) : cartItems.length > 0 && (
          <motion.div className="flex flex-row gap-4 p-4" layout>
            {cartItems.map((item: Item) => <ItemBox key={item.id} item={item} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CartBox;