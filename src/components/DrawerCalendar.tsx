import { CALENDAR_MODE } from "@/enums/core"
import Calendar from "./Calendar";
import { useCartStore } from "@/stores/cartStore";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
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

    return (

            <div className="mt-4">
                <motion.div
                    animate={{opacity: isPanelOpen ? 1 : 0.8}}
                    transition={{duration: 0.2,ease: "easeOut"}}
                    layout
                >
                    <Calendar nextDelivery={cart?.nextDelivery} mode={CALENDAR_MODE.ONE_WEEK}/>
                </motion.div>
            </div>
        
    )
}

export default DrawerCalendar;
