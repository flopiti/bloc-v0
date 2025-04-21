import { Cart } from "@/types/core";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import dayjs from "dayjs";
import { useCartStore } from "@/stores/cartStore";
interface CartCalendarProps {               
    cart: Cart | null
}

const CartCalendar = ({ cart }: CartCalendarProps) => {

    const { setDeliveryDate } = useCartStore();
    
    const today = useMemo(() => new Date().getDay(), []);
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            return dayjs().day(i).format('dd')[0];
        });
    }, []);
    const availableDays = ['Tuesday', 'Sunday'];
    
    const nextDeliveryDay = useMemo(() => {
        if (!cart) return null;
        return cart.nextDelivery ? new Date(cart.nextDelivery).getDay() : null;
    }, [cart?.nextDelivery]);

    const isThisWeek = useMemo(() => {
        if (!cart || !cart.nextDelivery) return false;
        const deliveryDate = new Date(cart.nextDelivery);
        const today = new Date();
        const diffTime = deliveryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }, [cart?.nextDelivery]);

    const isDayAvailable = (dayIndex: number) => {
        const dayName = dayjs().day(dayIndex).format('dddd');
        return availableDays.includes(dayName);
    };

    return (
        <div className="flex flex-col p-4 border-2 border-secondary rounded-3xl my-2">
            <div className="flex justify-between items-center">
                <h1 className="text-white">Next Delivery</h1>
                <span className="text-white/80 text-sm">
                    {cart?.nextDelivery &&  new Date(cart.nextDelivery).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    }) }
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
                            ${index === today  && nextDeliveryDay !== index ? 'border-[0.25rem] border-white font-bold' : ''}
                            ${isDayAvailable(index) ? 'bg-[#3399ff]/40' : ''}
                        `}
                        style={{
                            transformOrigin: "center center"
                        }}
                        animate={{
                            scale: isThisWeek && index === nextDeliveryDay ? 1.5 : 1,
                            backgroundColor: isDayAvailable(index) 
                                ? ['#3399ff80', '#3399ffb3', '#3399ff80'] 
                                : undefined
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 1]
                        }}
                    >
                        {isThisWeek && index === nextDeliveryDay ? (
                            <motion.div
                                animate={{
                                    y: [0.5, -0.5, 0.5],
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <TbTruckDelivery className="w-6 h-6" strokeWidth={0.75} />
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