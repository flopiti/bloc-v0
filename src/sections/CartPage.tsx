import { Item, Cart } from "@/types/core";
import { motion } from "framer-motion";
import ItemBox from "@/components/ItemBox";
import { useCartStore } from "@/stores/cartStore";

const CartPage = () => {

    const { cart } = useCartStore();
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    return (
        <div className="container mx-auto ">
            <div className="bg-white/5 rounded-xl p-6">
                <div className="flex flex-row flex-wrap gap-4">
                    {cartItems.map((item: Item) => (
                        <motion.div
                            key={item.id}
                            layout
                            className="w-[calc(33.333%-1rem)]"
                        >
                            <ItemBox item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CartPage;