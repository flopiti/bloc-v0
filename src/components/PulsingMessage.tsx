import { motion } from 'framer-motion';

interface PulsingMessageProps {
    message: string;
}

const PulsingMessage = ({ message }: PulsingMessageProps) => {
    return (
        <motion.div
            animate={{ 
                color: ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.6)']
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="mt-4 text-center"
        >
            {message}
        </motion.div>
    );
};

export default PulsingMessage; 