import { motion } from "framer-motion"
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
        if (cart.confirmed && !prevConfirmedRef.current) {
            setShowCheckmark(true);
            const timer = setTimeout(() => {
                setShowCheckmark(false);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (!cart.confirmed) {
            setShowCheckmark(false);
        }
        prevConfirmedRef.current = cart.confirmed;
    }, [cart.confirmed]);

    if (isLoading) return null; 

    const getButtonState = () => {
        if (showCheckmark) return "checkmark";
        if (cart.confirmed) return "onSchedule";
        return "confirm";
    };

    const currentState = getButtonState();
    console.log("Current state:", currentState, "Cart confirmed:", cart.confirmed, "Show checkmark:", showCheckmark);

    return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4"
        >
          <motion.button
            onClick={() => !cart.confirmed && confirmCart()}
            className="px-8 py-3 rounded-md text-white font-medium text-base relative overflow-hidden shadow-lg"
            whileHover={!cart.confirmed ? { scale: 1.02 } : {}}
            whileTap={!cart.confirmed ? { scale: 0.98 } : {}}
            animate={currentState}
            variants={{
              confirm: {
                backgroundColor: "#000000",
                transition: { duration: 0.3 }
              },
              checkmark: {
                backgroundColor: "#4F46E5",
                transition: { duration: 0.3 }
              },
              onSchedule: {
                backgroundColor: "#9CA3AF",
                transition: { duration: 0.3 }
              }
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={currentState}
              variants={{
                confirm: {
                  background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
                  opacity: 1,
                  transition: { duration: 0.3 }
                },
                checkmark: {
                  background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
                  opacity: 1,
                  transition: { duration: 0.3 }
                },
                onSchedule: {
                  background: "linear-gradient(to right, #9CA3AF, #9CA3AF)",
                  opacity: 0,
                  transition: { duration: 0.3 }
                }
              }}
            />
            <div className="relative z-10 flex items-center justify-center min-w-[140px] h-[24px]">
              {currentState === "checkmark" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <FiCheck size={20} />
                </motion.div>
              )}
              {currentState === "onSchedule" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  On Schedule
                </motion.div>
              )}
              {currentState === "confirm" && (
                <div className="flex items-center gap-2">
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
                </div>
              )}
            </div>
          </motion.button>
        </motion.div>
    )
}

export default ConfirmButton;