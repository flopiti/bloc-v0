import { Cart } from "@/types/core";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import dayjs from "dayjs";
import { useCartStore } from "@/stores/cartStore";
import useCart from "@/hooks/useCart";

interface CartCalendarProps {               
    cart: Cart | null
}

const CartCalendar = ({ cart }: CartCalendarProps) => {
    const { setDeliveryDate: setStoreDeliveryDate } = useCartStore();
    const { setDeliveryDate } = useCart();
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    
    const today = useMemo(() => dayjs().day(), []);
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            return dayjs().day(i).format('dd')[0];
        });
    }, []);
    const availableDays = ['Tuesday', 'Sunday'];
    
    const nextDeliveryDay = useMemo(() => {
        if (!cart?.nextDelivery) return null;
        return dayjs(cart.nextDelivery).day();
    }, [cart?.nextDelivery]);

    const isThisWeek = useMemo(() => {
        if (!cart?.nextDelivery) return false;
        const deliveryDate = dayjs(cart.nextDelivery);
        const today = dayjs();
        const diffDays = deliveryDate.diff(today, 'day');
        return diffDays <= 7;
    }, [cart?.nextDelivery]);

    const isDayAvailable = (dayIndex: number) => {
        const dayName = dayjs().day(dayIndex).format('dddd');
        return availableDays.includes(dayName);
    };

    const handleDayClick = (dayIndex: number) => {
        if (!isDayAvailable(dayIndex)) return;
        
        setSelectedDay(dayIndex);
        const today = dayjs();
        const daysUntilTarget = (dayIndex - today.day() + 7) % 7;
        const targetDate = today.add(daysUntilTarget, 'day').toDate();
        setDeliveryDate(targetDate);
    };

    return (
        <div className="flex flex-col p-4 border-2 border-secondary rounded-3xl my-2">
            <div className="flex justify-between items-center">
                <h1 className="text-white">Next Delivery</h1>
                <span className="text-white/80 text-sm">
                    {cart?.nextDelivery && dayjs(cart.nextDelivery).format('ddd, MMM D')}
                </span>
            </div>
            <div className="flex pt-6 px-2 pb-4 justify-between relative">
                <AnimatePresence>
                    {weekDays.map((day, index) => (
                        <motion.div
                            key={index}
                            layout
                            className={`
                                w-8 h-8 flex items-center justify-center
                                border border-gray-200 rounded
                                text-white relative
                                ${index === today  && nextDeliveryDay !== index ? 'border-[0.25rem] border-white font-bold' : ''}
                                ${isDayAvailable(index) ? 'bg-[#3399ff]/40 cursor-pointer hover:bg-[#3399ff]/60' : 'cursor-not-allowed'}
                                ${nextDeliveryDay === index ? 'bg-[#3399ff]' : ''}
                            `}
                            style={{
                                transformOrigin: "center center"
                            }}
                            animate={{
                                scale: isThisWeek && index === nextDeliveryDay ? 1.5 : 1,
                                margin: selectedDay === index ? "0 0.5rem" : "0 0.25rem"
                            }}
                            transition={{ 
                                duration: 0.3,
                                ease: "easeInOut",
                                layout: { duration: 0.3 }
                            }}
                            onClick={() => handleDayClick(index)}
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
                </AnimatePresence>
            </div>
        </div>
    )
}

export default CartCalendar;    