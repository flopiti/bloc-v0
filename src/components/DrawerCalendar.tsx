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
            className="p-4 bg-white/5 rounded-xl flex flex-col gap-3"
        >
            {cart?.nextDelivery ? (
                <div>
                    <div className="text-white/60 text-sm">Next Delivery</div>
                    <div className="text-white font-medium">
                        {isDeliveryThisWeek() 
                            ? dayjs(cart.nextDelivery).format('dddd, MMMM D, YYYY')
                            : "No delivery this week"}
                    </div>
                </div>
            ) : (
                <button 
                    onClick={handleOpenDeliveries}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl w-full hover:bg-white/5 transition-colors"
                >
                    <TbTruckDelivery className="w-12 h-12 text-secondary/60 mb-3" />
                    <span className="text-white/80 text-lg font-medium">No Delivery Schedule</span>
                    <span className="text-white/60 text-sm mt-1">Set up your delivery frequency to get started</span>
                </button>
            )}
            <Calendar nextDelivery={cart?.nextDelivery} mode={CALENDAR_MODE.ONE_WEEK}/>
        </motion.div>
    )
}

export default DrawerCalendar;