import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { Item } from '@/types/core';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import CartBox from '@/components/CartBox';
import ConfirmButton from '@/components/ConfirmButton';
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
        <ConfirmButton handleConfirm={handleConfirm} />
      )}
    </AnimatePresence>
    </motion.div>
  )
}

export default Drawer;