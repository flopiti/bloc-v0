import { Item } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";

interface CartBoxProps {
  isLoading: boolean;
  cartItems: Item[];
}

const CartBox = ({ isLoading, cartItems }: CartBoxProps) => {
  return (
    <motion.div 
      className="border-2 border-secondary rounded-3xl relative overflow-hidden"
      layout
      animate={{
        height: cartItems.length > 0 ? "auto" : "9rem",
        minHeight: "9rem"
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ 
          backgroundImage: 'url("/shopping_cart.png")',
          opacity: 0.2
        }}
      />
      <AnimatePresence mode="popLayout">
        {
        cartItems.length > 0 && (
          <motion.div 
            className="flex flex-row gap-4 p-4"
            layout
          >
            {
            cartItems.map((product) => (
              <motion.div
                key={product.id}
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
                className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer max-h-[9rem]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={product.image} alt={product.name} className="object-cover" />
              </motion.div>
            ))}
          </motion.div>
        ) 
        }
      </AnimatePresence>
    </motion.div>
  )
}

export default CartBox;