import { Item, Cart } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import ItemBox from "./ItemBox";
import { DEFAULT_TRANSITION } from "@/constants/animations";
import LoadingCart from "./LoadingCart";
import EmptyStateButton from "./EmptyStateButton";
import { TbShoppingCart } from "react-icons/tb";

interface DrawerCartProps {
  isLoading: boolean;
  cart: Cart | null;
  handleOpenCart: () => void;
}

const DrawerCart = ({ isLoading, cart, handleOpenCart }: DrawerCartProps) => {
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    return (
        <motion.div 
            className="bg-white/5 rounded-2xl flex flex-col gap-3 my-4 relative overflow-hidden"
            layout
            transition={DEFAULT_TRANSITION}
        >
            <AnimatePresence mode="popLayout">
                {isLoading ? (
                    <LoadingCart/>
                ) : cartItems.length > 0 ? (
                    <motion.div 
                        className="flex flex-col gap-4 p-4 w-full" 
                        layout
                    >
                        <div>
                            <div className="text-white/60 text-sm">Your Cart</div>
                            <div className="text-white font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</div>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2">
                            {cartItems.map((item: Item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="w-[calc(33.333%-0.5rem)]"
                                >
                                    <ItemBox item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <EmptyStateButton 
                        onClick={handleOpenCart}
                        title="Your Cart is Empty"
                        subtitle="Select items to start building your cart"
                        icon={TbShoppingCart}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default DrawerCart;