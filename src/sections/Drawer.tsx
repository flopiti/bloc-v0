import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import CartBox from '@/components/CartBox';
import ConfirmButton from '@/components/ConfirmButton';
import SuggestedItems from '@/components/SuggestedItems';

interface DrawerProps {
  isDrawerOpen: boolean;
}

const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const { cart, isLoading } = useCartStore();
  const { items } = useItemsStore();

  const cartItems = [...cart.confirmedItems, ...cart.pendingItems];
  const suggestedItems = items.filter(
    product => !cartItems.some(selected => selected.id === product.id)
  );

  return (
    <motion.div
      className={`full-screen h-[calc(100vh-5rem)] bottom-0 p-4`}
      initial={{ y: "100%" }}
      animate={{y: isDrawerOpen ? 0 : "100%"}}
      exit={{ y: "100%" }}
      transition={DEFAULT_TRANSITION}
  >
    
    {/* Cart Display */}
    <CartBox isLoading={isLoading} cartItems={cartItems} />
    
        {/* Suggested Items */}
    <AnimatePresence>
        <SuggestedItems suggestedItems={suggestedItems} />
    </AnimatePresence>

    {/* Confirm Button */}
    <ConfirmButton cart={cart} isLoading={isLoading}/>

  </motion.div>
  )
}

export default Drawer;