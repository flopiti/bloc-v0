import { Item, Cart } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";
import { DEFAULT_TRANSITION } from "@/constants/animations";
import LoadingCartAnimation from "./LoadingCartAnimation";
import LoadingCart from "./LoadingCart";

interface DrawerCartProps {
  isLoading: boolean;
  cart: Cart | null;
}

const DrawerCart = ({ isLoading, cart }: DrawerCartProps) => {
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    return (
        <motion.div 
            className="bg-white/5 rounded-xl flex flex-col gap-3 my-4 relative overflow-hidden"
            layout
            transition={DEFAULT_TRANSITION}
        >
            {isLoading ? <LoadingCartAnimation /> : <div className="cart-box-background" />}
            <AnimatePresence mode="popLayout">
                {isLoading ? (
                    <LoadingCart/>
                ) : cartItems.length > 0 ? (
                    <motion.div 
                        className="flex flex-row flex-wrap gap-2 p-4 w-full" 
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
                    <motion.div 
                        className="relative"
                        initial={false}
                    >
                        <motion.div
                            className="absolute inset-0 border-2 border-secondary rounded-xl pointer-events-none"
                            animate={{
                                borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)'],
                                borderWidth: ['2px', '3px', '4px', '3px', '2px']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: [0, 0.25, 0.5, 0.75, 1]
                            }}
                        />
                        <div className="flex items-center justify-center p-6 text-center relative z-10">
                            <span className="text-white/80 text-lg font-medium">Please select your first items to schedule a delivery</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default DrawerCart;