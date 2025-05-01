import { motion } from "framer-motion";

interface PulseContainerProps {
    children: React.ReactNode;
}

const PulseContainer = ({children}: PulseContainerProps) => {
    return (
        <motion.div
        className="border-[0.2rem] border-secondary rounded-xl overflow-hidden"
        animate={{
            borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.2)'],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    )
}

export default PulseContainer;