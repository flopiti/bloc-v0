import { DEFAULT_DELAY } from "@/constants/animations";
import { motion } from "framer-motion";

const DeliveriesPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          delay: DEFAULT_DELAY/2,
          duration: 0.3
        }}
      >
        <h1>Deliveries</h1>
      </motion.div>
    )
}

export default DeliveriesPage;