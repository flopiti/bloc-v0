import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { Item } from '@/types/core';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import CartBox from '@/components/CartBox';
import ConfirmButton from '@/components/ConfirmButton';
import SuggestedItems from '@/components/SuggestedItems';
interface DrawerProps {
  isDrawerOpen: boolean;
}

const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const { cart, addItem, isLoading } = useCartStore();
  const { items } = useItemsStore();


  const cartItems = [...cart.confirmedItems, ...cart.pendingItems];
  const suggestedItems = items.filter(
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
      {suggestedItems.length > 0 && (
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
                <SuggestedItems suggestedItems={suggestedItems} handleItemClick={handleProductClick} />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <ConfirmButton handleConfirm={handleConfirm} cart={cart}/>
    </motion.div>
  )
}

export default Drawer;