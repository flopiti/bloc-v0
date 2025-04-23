import { Item, Cart } from "@/types/core";
import { motion } from "framer-motion";
import ItemBox from "./ItemBox";

interface DrawerCartProps {
  cart: Cart | null;
}

const DrawerCart = ({ cart }: DrawerCartProps) => {
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    return (
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
                
    )
}

export default DrawerCart;