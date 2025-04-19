import { Item } from "@/types/core";
import { motion } from "framer-motion"

interface SuggestedItemsProps {
    suggestedItems: Item[];
    handleItemClick: (item: Item) => void;
}
const SuggestedItems = ({ suggestedItems, handleItemClick }: SuggestedItemsProps) => {
    return (
        suggestedItems.map((item) => (
            <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          transition={{ 
            duration: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg overflow-hidden cursor-pointer "
          onClick={() => handleItemClick(item)}
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
        </motion.div>
      ))
    )
}

export default SuggestedItems;