import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface DrawerSectionTitleProps {
    title: string;
    subtitle: string;
    isPanelOpen: boolean;
    handleOpenDeliveries: () => void;
    setIsPanelOpen: (isPanelOpen: boolean) => void;
    icon: IconType;
    buttonText: string;
}

const DrawerSectionTitle = ({
    title, 
    subtitle, 
    isPanelOpen, 
    handleOpenDeliveries, 
    setIsPanelOpen,
    icon : Icon,
    buttonText
}: DrawerSectionTitleProps) => {

    console.log(isPanelOpen)
    return (
        <div className="flex items-center justify-between mb-4">
        <div className="max-w-2/5">
            <div className="text-white/60 text-sm">{title}</div>
            <motion.div 
                className="text-white font-medium "
                transition={{ duration: 2 }}
            >
                {
                    subtitle
                    }
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
         <Icon className="w-6 h-6 text-secondary" />
            <AnimatePresence>
                {isPanelOpen && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white font-medium whitespace-nowrap overflow-hidden"
                    >
                        {buttonText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    </div>    )
}

export default DrawerSectionTitle;