import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import CartBox from '@/components/CartBox';
import ConfirmButton from '@/components/ConfirmButton';
import SuggestedItems from '@/components/SuggestedItems';
import CartCalendar from '@/components/CartCalendar';

interface DrawerProps {
  isDrawerOpen: boolean;
  handleOpenDeliveries: () => void;
} 

const Drawer = ({ isDrawerOpen, handleOpenDeliveries }: DrawerProps) => {
  const { cart, isLoading } = useCartStore();
  const { items } = useItemsStore();
  const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];
  const suggestedItems = items.filter(({ id }) => !cartItems.some(({ id: cartId }) => cartId === id));

  return (
    <motion.div
      className={`full-screen h-[calc(100vh-5rem)] bottom-0 p-4`}
      initial={{ y: "100%" }}
      animate={{y: isDrawerOpen ? 0 : "100%"}}
      exit={{ y: "100%" }}
      transition={DEFAULT_TRANSITION}
  >

    {/* Cart Calendar */}
    <CartCalendar cart={cart} handleOpenDeliveries={handleOpenDeliveries} />
    
    {/* Cart Display */}
    <CartBox isLoading={isLoading} cart={cart} />
    
        {/* Suggested Items */}
    <AnimatePresence>
        <SuggestedItems suggestedItems={suggestedItems} />
    </AnimatePresence>

    {/* Confirm Button */}
    <AnimatePresence>
      {cart && <ConfirmButton cart={cart} isLoading={isLoading}/>}
    </AnimatePresence>

  </motion.div>
  )
}

export default Drawer;