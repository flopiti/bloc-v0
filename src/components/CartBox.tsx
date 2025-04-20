import { Item, Cart } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";
import { DEFAULT_TRANSITION } from "@/constants/animations";
import LoadingCartAnimation from "./LoadingCartAnimation";
import LoadingCart from "./LoadingCart";

interface CartBoxProps {
  isLoading: boolean;
  cart: Cart | null;
}

const CartBox = ({ isLoading, cart }: CartBoxProps) => {

    if (!cart) return null;

    const cartItems = [...cart.confirmedItems, ...cart.pendingItems];

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
            <motion.div 
                className="flex flex-row flex-wrap gap-3 p-4" 
                layout
            >
                {cartItems.map((item: Item) => (
                <motion.div
                    key={item.id}
                    layout
                    className="flex-shrink-0"
                >
                    <ItemBox item={item} />
                </motion.div>
                ))}
            </motion.div>
            )}
        </AnimatePresence>
        </motion.div>
    )
}

export default CartBox;