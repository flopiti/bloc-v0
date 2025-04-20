import { Cart } from "@/types/core";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";

interface CartCalendarProps {               
    cart: Cart | null
}

const CartCalendar = ({ cart }: CartCalendarProps) => {
    const today = useMemo(() => new Date().getDay(), []);
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    const nextDeliveryDay = useMemo(() => {
        if (!cart) return -1;
        const deliveryDate = new Date(cart.nextDelivery);
        return deliveryDate.getDay();
    }, [cart?.nextDelivery]);

    const isThisWeek = useMemo(() => {
        if (!cart) return false;
        const deliveryDate = new Date(cart.nextDelivery);
        const today = new Date();
        const diffTime = deliveryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }, [cart?.nextDelivery]);

    return (
        <div className="flex flex-col p-4 border-2 border-secondary rounded-3xl my-2">
            <div className="flex justify-between items-center">
                <h1 className="text-white">Next Delivery</h1>
                <span className="text-white/80 text-sm">
                    {cart?.nextDelivery ? new Date(cart.nextDelivery).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    }) : 'No delivery date'}
                </span>
            </div>
            <div className="flex pt-4 pb-4 justify-between relative">
                {weekDays.map((day, index) => (
                    <motion.div
                        key={index}
                        className={`
                            w-8 h-8 flex items-center justify-center
                            border border-gray-200 rounded
                            text-white relative
                            ${index === today ? 'border-3 border-white font-bold' : ''}
                        `}
                        style={{
                            transformOrigin: "center center"
                        }}
                        animate={{
                            scale: isThisWeek && index === nextDeliveryDay ? 1.5 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {isThisWeek && index === nextDeliveryDay ? (
                            <TbTruckDelivery className="w-6 h-6" />
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