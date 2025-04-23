import { motion } from "framer-motion";
import { useRef, useState } from "react";
import EmptyStateButton from "./EmptyStateButton";
import { IconType } from "react-icons";

interface DrawerSectionProps {
    children: React.ReactNode;
    isEmpty?: boolean;
    onClick: () => void;
    title: string;
    subtitle: string;
    icon: IconType;
}

const DrawerSection = ({children, isEmpty=false, onClick, title, subtitle, icon}: DrawerSectionProps) => {

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={drawerRef}
            initial={false}
            className="bg-white/5 rounded-xl flex flex-col gap-3 my-4 cursor-pointer"
            onClick={() => !isPanelOpen && setIsPanelOpen(true)}
        >
            {isEmpty ? (
                <EmptyStateButton
                    onClick={onClick}
                    title={title}
                    subtitle={subtitle}
                    icon={icon}
                />
            ) : (
                children
            )}
        </motion.div>
    )
}

export default DrawerSection;