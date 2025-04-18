import { motion } from "framer-motion";

const LoadingCart = () => {
  return (
    <motion.div 
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <motion.div 
            className="text-secondary text-lg font-medium"
            animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
            }}
        >
            fetching your items...
        </motion.div>
    </motion.div>
  )
}

export default LoadingCart;