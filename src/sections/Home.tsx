import { APP_VERSION } from "@/config/version";
import NavigationGrid from "@/components/NavigationGrid";
import { motion } from "framer-motion";
import Featured from "@/components/Featured";

const Home = () => {

  return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
        className="flex flex-col p-6 pt-safe gap-8"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Alpha {APP_VERSION}
        </h1>

        <NavigationGrid />

        <Featured />
      </motion.div>
  );
};

export default Home;