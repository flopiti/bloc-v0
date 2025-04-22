import { CALENDAR_MODE } from "@/enums/core"
import Calendar from "./Calendar";
import { useCartStore } from "@/stores/cartStore";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const DrawerCalendar = () => {
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
            {cart?.nextDelivery && (
                <div>
                    <div className="text-white/60 text-sm">Next Delivery</div>
                    <div className="text-white font-medium">
                        {isDeliveryThisWeek() 
                            ? dayjs(cart.nextDelivery).format('dddd, MMMM D, YYYY')
                            : "No delivery this week"}
                    </div>
                </div>
            )}
            <Calendar nextDelivery={cart?.nextDelivery} mode={CALENDAR_MODE.ONE_WEEK}/>
        </motion.div>
    )
}

export default DrawerCalendar;