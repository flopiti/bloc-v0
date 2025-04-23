import { CALENDAR_MODE } from "@/enums/core"
import Calendar from "./Calendar";
import { useCartStore } from "@/stores/cartStore";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";
import { IconType } from "react-icons";
import DrawerSectionTitle from "./DrawerSectionTitle";
    

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
                console.log("clicked outside")
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
        <div className="p-4">
            <DrawerSectionTitle 
                title="Next Delivery"
                subtitle={isDeliveryThisWeek() 
                    ? dayjs(cart?.nextDelivery).format('dddd, MMMM D, YYYY')
                    : "No delivery this week"
                }
                isPanelOpen={isPanelOpen}
                handleOpenDeliveries={handleOpenDeliveries}
                setIsPanelOpen={setIsPanelOpen}
                icon={TbTruckDelivery}
                buttonText="Go to deliveries"
            />
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
        
    )
}

export default DrawerCalendar;
