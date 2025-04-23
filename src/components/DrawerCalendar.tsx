import { CALENDAR_MODE } from "@/enums/core"
import Calendar from "./Calendar";
import { useCartStore } from "@/stores/cartStore";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";
import EmptyStateButton from "./EmptyStateButton";
interface DrawerCalendarProps {
    handleOpenDeliveries: () => void;
}

const DrawerCalendar = ({ handleOpenDeliveries }: DrawerCalendarProps) => {
    const { cart } = useCartStore();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsPanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isDeliveryThisWeek = () => {
        if (!cart?.nextDelivery) return false;
        const deliveryDate = dayjs(cart.nextDelivery);
        const today = dayjs();
        const diffDays = deliveryDate.diff(today, 'day');
        return diffDays <= 7;
    };

    return (
        <motion.div
            ref={drawerRef}
            initial={false}
            className="bg-white/5 rounded-xl flex flex-col gap-3 my-4 cursor-pointer"
            onClick={() => !isPanelOpen && setIsPanelOpen(true)}
        >
            {cart?.nextDelivery ? (
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-white/60 text-sm">Next Delivery</div>
                            <motion.div 
                                className="text-white font-medium"
                                transition={{ duration: 2 }}
                            >
                                {isDeliveryThisWeek() 
                                    ? dayjs(cart.nextDelivery).format('dddd, MMMM D, YYYY')
                                    : "No delivery this week"}
                            </motion.div>
                        </div>
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                isPanelOpen ? handleOpenDeliveries() : setIsPanelOpen(true);
                            }}
                            className="flex items-center gap-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg px-3 py-2 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <TbTruckDelivery className="w-6 h-6 text-secondary" />
                            <AnimatePresence>
                                {isPanelOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-white font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        Go to deliveries
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                    <div className="mt-4">
                        <motion.div
                            animate={{opacity: isPanelOpen ? 1 : 0.8}}
                            transition={{duration: 0.2,ease: "easeOut"}}
                            layout
                        >
                            <Calendar nextDelivery={cart?.nextDelivery} mode={CALENDAR_MODE.ONE_WEEK}/>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <EmptyStateButton onClick={handleOpenDeliveries} title="No Delivery Schedule" subtitle="Set up your delivery frequency to get started" icon={TbTruckDelivery} />
            )}
        </motion.div>
    )
}

export default DrawerCalendar;