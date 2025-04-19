import { motion, AnimatePresence } from "framer-motion"
import { Cart } from "@/types/core";
import useCart from "@/hooks/useCart";
import { FiChevronRight, FiCheck } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

interface ConfirmButtonProps {
    cart: Cart;
    isLoading: boolean;
}

const ConfirmButton = ({ cart, isLoading }: ConfirmButtonProps) => {
    const { confirmCart } = useCart();
    const [showCheckmark, setShowCheckmark] = useState(false);
    const prevConfirmedRef = useRef(cart.confirmed);

    useEffect(() => {
        // Only show checkmark when transitioning from unconfirmed to confirmed
        if (cart.confirmed && !prevConfirmedRef.current) {
            setShowCheckmark(true);
            const timer = setTimeout(() => {
                setShowCheckmark(false);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (!cart.confirmed) {
            // Reset checkmark when cart becomes unconfirmed
            setShowCheckmark(false);
        }
        prevConfirmedRef.current = cart.confirmed;
    }, [cart.confirmed]);

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
            animate={{
              backgroundColor: cart.confirmed ? '#9CA3AF' : '#000000',
              transition: { duration: 0.3 }
            }}
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
            <span className="relative z-10 flex items-center justify-center min-w-[140px] h-[24px]">
              <AnimatePresence mode="wait">
                {showCheckmark ? (
                  <motion.div
                    key="checkmark"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center h-full"
                  >
                    <FiCheck size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 h-full"
                  >
                    {cart.confirmed ? "On Schedule" : (
                      <>
                        Confirm Order
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
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        </motion.div>
    )
}

export default ConfirmButton;