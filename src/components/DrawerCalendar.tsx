import { CALENDAR_MODE } from "@/enums/core"
import Calendar from "./Calendar";
import { useCartStore } from "@/stores/cartStore";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";

interface DrawerCalendarProps {
    handleOpenDeliveries: () => void;
}

const DrawerCalendar = ({ handleOpenDeliveries }: DrawerCalendarProps) => {
    const { cart } = useCartStore();

    const isDeliveryThisWeek = () => {
        if (!cart?.nextDelivery) return false;
        const deliveryDate = dayjs(cart.nextDelivery);
        const today = dayjs();
        const diffDays = deliveryDate.diff(today, 'day');
        return diffDays <= 7;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
            className="bg-white/5 rounded-xl flex flex-col gap-3 my-4"
        >
            {cart?.nextDelivery ? (
                <div className="p-4">
                        <div className="text-white/60 text-sm">Next Delivery</div>
                        <div className="text-white font-medium mb-4">
                        {isDeliveryThisWeek() 
                            ? dayjs(cart.nextDelivery).format('dddd, MMMM D, YYYY')
                            : "No delivery this week"}

                    </div>
                    <Calendar nextDelivery={cart?.nextDelivery} mode={CALENDAR_MODE.ONE_WEEK}/>
                </div>
            ) : (
                <motion.div className="relative">
                    <motion.div
                        className="absolute inset-0 border-2 border-secondary rounded-2xl pointer-events-none"
                        animate={{
                            borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)'],
                            borderWidth: ['2px', '3px', '4px', '3px', '2px']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1]
                        }}
                    />
                    <button 
                        onClick={handleOpenDeliveries}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl w-full hover:bg-white/5 transition-colors relative z-10"
                    >
                        <TbTruckDelivery className="w-12 h-12 text-secondary/60 mb-3" />
                        <span className="text-white/80 text-lg font-medium">No Delivery Schedule</span>
                        <span className="text-white/60 text-sm mt-1">Set up your delivery frequency to get started</span>
                    </button>
                </motion.div>
            )}
        </motion.div>
    )
}

export default DrawerCalendar;