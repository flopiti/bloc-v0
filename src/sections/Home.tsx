import { PAGE } from "@/enums/core";
import { motion } from "framer-motion";

const Home = ({ goToPage }: { goToPage: (page: PAGE) => void }  ) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.3
      }}
    >
        <h1>Home</h1>

        <button onClick={() => goToPage(PAGE.DELIVERIES)}>Go to deliveries</button>
    </motion.div>

  )
}

export default Home;