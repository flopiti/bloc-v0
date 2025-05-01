import { APP_VERSION } from "@/config/version";
import NavigationGrid from "@/components/NavigationGrid";
import { motion } from "framer-motion";
import Featured from "@/components/Featured";

const Home = () => {

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 pt-safe">
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-3xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Alpha {APP_VERSION}
        </motion.h1>

        <NavigationGrid />
      </motion.div>
            
      {/* Featured Section */}
      <motion.div 
        className="my-8 w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Featured />
      </motion.div>
    </div>
  );
};

export default Home;