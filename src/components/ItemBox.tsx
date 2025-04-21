import { motion } from "framer-motion";
import { Item } from "@/types/core";

interface ItemBoxProps {
  item: Item;
}

const ItemBox = ({ item }: ItemBoxProps) => {
  return (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25
        }}
        className="rounded-lg overflow-hidden relative group cursor-pointer aspect-square w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <img src={item.image} alt={item.name} className="object-cover" />
    </motion.div>  )
}

export default ItemBox;