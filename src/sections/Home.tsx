import { DRAWER_DELAY } from "@/constants/animations";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ delay: DRAWER_DELAY}}
    >
      <h1>Home</h1>
    </motion.div>
  )
}

export default Home;