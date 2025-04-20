import { Cart } from "@/types/core";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";

interface CartCalendarProps {               
    cart: Cart;
}

const CartCalendar = ({ cart }: CartCalendarProps) => {
    const today = useMemo(() => new Date().getDay(), []);
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    const nextDeliveryDay = useMemo(() => {
        if (!cart.nextDelivery) return -1;
        const deliveryDate = new Date(cart.nextDelivery);
        return deliveryDate.getDay();
    }, [cart.nextDelivery]);

    const isThisWeek = useMemo(() => {
        if (!cart.nextDelivery) return false;
        const deliveryDate = new Date(cart.nextDelivery);
        const today = new Date();
        const diffTime = deliveryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }, [cart.nextDelivery]);

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-white">Next Delivery</h1>
            <div className="flex pt-4 pb-4 justify-between">
                {weekDays.map((day, index) => (
                    <motion.div
                        key={index}
                        className={`
                            w-8 h-8 flex items-center justify-center
                            border border-gray-200 rounded
                            text-white relative
                            ${index === today ? 'border-3 border-white font-bold' : ''}
                        `}
                        animate={{
                            scale: isThisWeek && index === nextDeliveryDay ? 2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {isThisWeek && index === nextDeliveryDay ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <TbTruckDelivery className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            day
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default CartCalendar;    