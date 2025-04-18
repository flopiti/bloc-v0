import { Item } from "@/types/core";
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";  

interface CartBoxProps {
  isLoading: boolean;
  cartItems: Item[];
}

const CartBox = ({ isLoading, cartItems }: CartBoxProps) => {
  return (
    <div className="border-2 border-secondary rounded-3xl min-h-[9rem] relative">
          <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ 
              backgroundImage: 'url("/shopping_cart.png")',
              opacity: 0.2
            }}
          />
          <AnimatePresence>
            {
            cartItems.length > 0 && (
              <div className="flex flex-row gap-4">
                {
                cartItems.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer max-h-[9rem]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            ) 
            }
          </AnimatePresence>
    </div>
  )
}

export default CartBox;