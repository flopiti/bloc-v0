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
        <div className="flex flex-col gap-4 items-center my-10">
            <span className="text-2xl font-bold">Home</span>

            <button onClick={() => goToPage(PAGE.CART)}>Go to cart</button>
            <button onClick={() => goToPage(PAGE.DELIVERIES)}>Go to deliveries</button>
        </div>
    </motion.div>

  )
}

export default Home;