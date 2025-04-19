import { Item } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion"

interface SuggestedItemsProps {
    suggestedItems: Item[];
    addItem: (item: Item) => void;
}

const SuggestedItems = ({ suggestedItems, addItem }: SuggestedItemsProps) => {
  
    if (suggestedItems.length === 0) {
      return null;
    }

    return (
      <motion.div 
      id="suggested-products" 
      className="mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-bold mb-4">Suggested Products</h2>
            <div className="grid grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {suggestedItems.map((item) => (
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
                            className="rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => addItem(item)}
                        >
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default SuggestedItems;