import { motion } from "framer-motion"
import { Cart } from "@/types/core";
import useCart from "@/hooks/useCart";
import { FiChevronRight } from "react-icons/fi";

interface ConfirmButtonProps {
    cart: Cart;
    isLoading: boolean;
}

const ConfirmButton = ({ cart, isLoading }: ConfirmButtonProps) => {
    const { confirmCart } = useCart();

    if (isLoading) return null; 
    return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4"
        >
          <motion.button
            onClick={() => confirmCart()}
            disabled={cart.confirmed}
            className={`px-8 py-3 rounded-md text-white font-medium text-base relative overflow-hidden shadow-lg ${
              cart.confirmed ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'
            }`}
            whileHover={!cart.confirmed ? { scale: 1.02 } : {}}
            whileTap={!cart.confirmed ? { scale: 0.98 } : {}}
          >
            {!cart.confirmed && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {cart.confirmed ? 'On Schedule' : 'Confirm Order'}
              {!cart.confirmed && (
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FiChevronRight size={16} />
                </motion.div>
              )}
            </span>
          </motion.button>
        </motion.div>
    )
}

export default ConfirmButton;