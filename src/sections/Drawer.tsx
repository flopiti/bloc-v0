import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useItemsStore } from '@/stores/itemsStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import DrawerCart from '@/components/DrawerCart';
import ConfirmButton from '@/components/ConfirmButton';
import SuggestedItems from '@/components/SuggestedItems';
import DrawerCalendar from '@/components/DrawerCalendar';
import { PAGE } from '@/enums/core';
import DrawerSection from '@/components/DrawerSection';
import { TbShoppingCart, TbTruckDelivery } from 'react-icons/tb';

interface DrawerProps {
  isDrawerOpen: boolean;
  goToPage: (page: PAGE) => void;
} 

const Drawer = ({ isDrawerOpen, goToPage }: DrawerProps) => {
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

    <AnimatePresence>
      {cart && <DrawerSection
        onClick={() => goToPage(PAGE.DELIVERIES)}
        title="No Delivery Schedule"
        subtitle="Set up your delivery frequency to get started"
        icon={TbTruckDelivery}
      >
        <DrawerCalendar handleOpenDeliveries={() => goToPage(PAGE.DELIVERIES)} />
      </DrawerSection>}
    </AnimatePresence>
    
    {/* Cart Display */}
    <DrawerSection                         
      onClick={() => goToPage(PAGE.CART)}
      title="Your Cart is Empty"
      subtitle="Select items to start building your cart"
      icon={TbShoppingCart}
      >
      <DrawerCart isLoading={isLoading} cart={cart} handleOpenCart={() => goToPage(PAGE.CART)}/>
    </DrawerSection>
    
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