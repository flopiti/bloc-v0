import { Item, Cart } from "@/types/core";
import { motion } from "framer-motion";
import ItemBox from "@/components/ItemBox";
import { useCartStore } from "@/stores/cartStore";
import { IoAdd } from "react-icons/io5";

const CartPage = () => {
    const { cart } = useCartStore();
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    const goToProduct = () => {
        // TODO: Implement navigation to product selection page
        console.log("Navigating to product selection");
    };

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
                    <motion.div
                        layout
                        className="w-[calc(33.333%-1rem)]"
                    >
                        <button
                            onClick={goToProduct}
                            className="rounded-lg overflow-hidden relative group cursor-pointer aspect-square w-full border-2 border-dashed border-gray-400 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                        >
                            <IoAdd className="text-gray-400 text-5xl" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;