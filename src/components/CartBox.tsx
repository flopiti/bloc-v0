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

    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    return (
        <motion.div 
        className="border-2 border-secondary rounded-3xl relative overflow-hidden min-h-[6rem]"
        layout
        transition={DEFAULT_TRANSITION}
        >
        {isLoading ? <LoadingCartAnimation /> : <div className="cart-box-background" />}
        <AnimatePresence mode="popLayout">
            {isLoading ? (
                <LoadingCart/>
            ) : cartItems.length > 0 ? (
                <motion.div 
                    className="flex flex-row flex-wrap gap-2 p-2 w-full" 
                    layout
                >
                    {cartItems.map((item: Item) => (
                    <motion.div
                        key={item.id}
                        layout
                        className="w-[calc(33.333%-0.5rem)]"
                    >
                        <ItemBox item={item} />
                    </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-white">
                    Please select your first items to schedule a delivery
                </div>
            )}
        </AnimatePresence>
        </motion.div>
    )
}

export default CartBox;