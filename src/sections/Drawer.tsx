import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import CartBox from '@/components/CartBox';
import ConfirmButton from '@/components/ConfirmButton';
import SuggestedItems from '@/components/SuggestedItems';
import useCart from '@/hooks/useCart';

interface DrawerProps {
  isDrawerOpen: boolean;
}

const Drawer = ({ isDrawerOpen }: DrawerProps) => {
  const { cart, isLoading } = useCartStore();
  const { items } = useItemsStore();
  const { fetchCart, addItem } = useCart();


  const cartItems = [...cart.confirmedItems, ...cart.pendingItems];
  const suggestedItems = items.filter(
    product => !cartItems.some(selected => selected.id === product.id)
  );

  const handleConfirm = () => {
    // Handle confirmation logic here

    console.log('Order confirmed:', cartItems);
    // When the order is confirmed, fetch the cart again to update the state
    fetchCart();
  };

  return (
    <motion.div
      className={`full-screen h-[calc(100vh-3rem)] bottom-0 p-4`}
      initial={{ y: "100%" }}
      animate={{y: isDrawerOpen ? 0 : "100%"}}
      exit={{ y: "100%" }}
      transition={DEFAULT_TRANSITION}
  >
    
    {/* Cart Display */}
    <CartBox isLoading={isLoading} cartItems={cartItems} />
    
        {/* Suggested Items */}
    <AnimatePresence>
        <SuggestedItems suggestedItems={suggestedItems} addItem={addItem} />
    </AnimatePresence>

    {/* Confirm Button */}
    <ConfirmButton handleConfirm={handleConfirm} cart={cart} isLoading={isLoading}/>

  </motion.div>
  )
}

export default Drawer;