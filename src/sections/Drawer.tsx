import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { Item } from '@/types/core';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import CartBox from '@/components/CartBox';

interface DrawerProps {
  isDrawerOpen: boolean;
}

const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const { cart, addItem, isLoading } = useCartStore();
  const { items } = useItemsStore();


  const cartItems = [...cart.confirmedItems, ...cart.pendingItems];
  const suggestedProducts = items.filter(
    product => !cartItems.some(selected => selected.id === product.id)
  );

  const handleProductClick = (product: Item) => {
    addItem(product);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log('Order confirmed:', cartItems);
  };

  return (
    <motion.div
      className={`full-screen h-[calc(100vh-3rem)] bottom-0 p-4`}
      initial={{ y: "100%" }}
      animate={{y: isDrawerOpen ? 0 : "100%"}}
      exit={{ y: "100%" }}
      transition={DEFAULT_TRANSITION}
  >
    <CartBox isLoading={isLoading} cartItems={cartItems} />
    <AnimatePresence>
      {suggestedProducts.length > 0 && (
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
              {suggestedProducts.map((product) => (
                <motion.div 
                  key={product.id}
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
                  onClick={() => handleProductClick(product)}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <AnimatePresence>
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4"
        >
          <motion.button
            onClick={handleConfirm}
            className="px-8 py-3 rounded-md text-white font-medium text-base relative overflow-hidden bg-black shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
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
            <span className="relative z-10 flex items-center gap-2">
              Confirm Order
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
    </motion.div>
  )
}

export default Drawer;