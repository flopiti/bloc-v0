import { Item } from "@/types/core";
import { motion } from "framer-motion";
import ItemBox from "@/components/ItemBox";
import { useCartStore } from "@/stores/cartStore";
import { IoAdd } from "react-icons/io5";
import { PAGE } from "@/enums/core";
import EmptyStateButton from "@/components/EmptyStateButton";
import { TbShoppingCart } from "react-icons/tb";
import { useState } from "react";
import { IoGridOutline, IoListOutline } from "react-icons/io5";

interface CartPageProps {
    goToPage: (page: PAGE) => void;
}

const CartPage = ({ goToPage }: CartPageProps) => {
    const { cart } = useCartStore();
    const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];
    const [isGridView, setIsGridView] = useState(true);
    console.log(cartItems);
    return (
        <div className="container mx-auto ">
            <div className="flex justify-between items-center mb-4">
                <motion.h2 
                    className="text-white/80 text-sm font-medium tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                >
                    Next Delivery Items
                </motion.h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsGridView(true)}
                        className={`p-2 rounded-lg ${isGridView ? 'bg-white/10' : 'bg-white/5'}`}
                    >
                        <IoGridOutline className="text-white/80 text-xl" />
                    </button>
                    <button
                        onClick={() => setIsGridView(false)}
                        className={`p-2 rounded-lg ${!isGridView ? 'bg-white/10' : 'bg-white/5'}`}
                    >
                        <IoListOutline className="text-white/80 text-xl" />
                    </button>
                </div>
            </div>
            <div className="bg-white/5 rounded-xl">
                {cartItems.length === 0 ? (
                    <EmptyStateButton
                        onClick={() => goToPage(PAGE.PRODUCTS)}
                        title="Your Cart is Empty"
                        subtitle="Select items to start building your cart"
                        icon={TbShoppingCart}
                    />  
                ) : (
                    <div className={`${isGridView ? 'flex flex-row flex-wrap' : 'flex flex-col'} gap-4 p-4`}>
                        <motion.div
                            layout
                            className={isGridView ? "w-[calc(33.333%-1rem)]" : "w-full"}
                        >
                            <button
                                onClick={() => goToPage(PAGE.PRODUCTS)}
                                className={`rounded-lg overflow-hidden relative group cursor-pointer ${isGridView ? 'aspect-square' : 'h-24'} w-full border-2 border-dashed border-gray-400 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center`}
                            >
                                <IoAdd className="text-gray-400 text-5xl" />
                            </button>
                        </motion.div>
                        {cartItems.map((item: Item) => (
                            <motion.div
                                key={item.product.id}
                                layout
                                className={isGridView ? "w-[calc(33.333%-1rem)]" : "w-full"}
                            >
                                <div className={!isGridView ? "flex gap-4 items-center" : ""}>
                                    <div className={!isGridView ? "w-24" : ""}>
                                        <ItemBox item={item} />
                                    </div>
                                    <div className={`${isGridView ? "mt-2 text-center" : "flex-1"}`}>
                                        <h3 className="font-medium text-white">{item.product.name}</h3>
                                        {item.productType && (
                                            <p className="text-sm text-gray-400">{item.productType}</p>
                                        )}
                                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                    </div>
                                    {!isGridView && (
                                        <div className="w-24 text-right">
                                            <p className="text-sm text-white">${item.product.price.toFixed(2)}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage;