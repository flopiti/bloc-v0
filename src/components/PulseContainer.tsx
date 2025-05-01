import { motion } from "framer-motion";

interface PulseContainerProps {
    children: React.ReactNode;
    pulse?: boolean;
}

const PulseContainer = ({children, pulse = true}: PulseContainerProps) => {
    return (
        <motion.div
        className={`rounded-xl overflow-hidden ${pulse ? 'border-[0.2rem] border-secondary' : ''}`}
        animate={pulse ? {
            borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.2)'],
        } : {}}
        transition={pulse ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        } : {}}
        >
            {children}
        </motion.div>
    );
}

export default PulseContainer;