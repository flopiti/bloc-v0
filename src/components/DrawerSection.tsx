import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import EmptyStateButton from "@/components/EmptyStateButton";
import { IconType } from "react-icons";
import DrawerSectionTitle from "@/components/DrawerSectionTitle";

interface DrawerSectionProps {
    children: React.ReactNode;
    isEmpty?: boolean;
    emptyOnClick: () => void;
    emptyTitle: string;
    emptySubtitle: string;
    emptyIcon: IconType;
    title: string;
    subtitle: string;
    icon: IconType;
    goToPage: () => void;
    buttonText: string;
}

const DrawerSection = ({
    children, 
    isEmpty=false,
     emptyOnClick,
     emptyTitle, 
     emptySubtitle, 
     emptyIcon,
     title,
     subtitle,
      icon, 
      goToPage,
      buttonText
    }: DrawerSectionProps) => {

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


    return (
        <motion.div
            ref={drawerRef}
            initial={false}
            className="bg-white/5 rounded-xl flex flex-col gap-3 my-4 cursor-pointer"
            onClick={() => !isPanelOpen && setIsPanelOpen(true)}
        >
            {isEmpty ? (
                <EmptyStateButton
                    onClick={emptyOnClick}
                    title={emptyTitle}
                    subtitle={emptySubtitle}
                    icon={emptyIcon}
                />
            ) : (
                <div className="p-4">
                <DrawerSectionTitle 
                    title={title}
                    subtitle={subtitle}
                    isPanelOpen={isPanelOpen}
                    handleOpenDeliveries={goToPage}
                    setIsPanelOpen={setIsPanelOpen}
                    icon={icon}
                    buttonText={buttonText}
                />
                {children}
                </div>
            )}
        </motion.div>
    )
}

export default DrawerSection;