import { Item } from "@/types/core";
import { motion } from "framer-motion";
import ItemBox from "@/components/ItemBox";
import { useCartStore } from "@/stores/cartStore";
import { IoAdd } from "react-icons/io5";
import { PAGE } from "@/enums/core";
import EmptyStateButton from "@/components/EmptyStateButton";
import { TbShoppingCart } from "react-icons/tb";

interface CartPageProps {
    goToPage: (page: PAGE) => void;
}

const CartPage = ({ goToPage }: CartPageProps) => {
    const { cart } = useCartStore();
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

    return (
        <div className="container mx-auto ">
            <div className="bg-white/5 rounded-xl">
                {cartItems.length === 0 ? (
                    <EmptyStateButton
                        onClick={() => goToPage(PAGE.PRODUCTS)}
                        title="Your Cart is Empty"
                        subtitle="Select items to start building your cart"
                        icon={TbShoppingCart}
                    />  
                ) : (
                    <div className="flex flex-row flex-wrap gap-4 p-4">
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
                                onClick={() => goToPage(PAGE.PRODUCTS)}
                                className="rounded-lg overflow-hidden relative group cursor-pointer aspect-square w-full border-2 border-dashed border-gray-400 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                            >
                                <IoAdd className="text-gray-400 text-5xl" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage;