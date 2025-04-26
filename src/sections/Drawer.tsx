import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { DEFAULT_TRANSITION } from '@/constants/animations';
import DrawerCart from '@/components/DrawerCart';
import ConfirmButton from '@/components/ConfirmButton';
import { CALENDAR_MODE, PAGE } from '@/enums/core';
import DrawerSection from '@/components/DrawerSection';
import { TbShoppingCart, TbTruckDelivery } from 'react-icons/tb';
import dayjs from 'dayjs';
import Calendar from '@/components/Calendar';

interface DrawerProps {
  isDrawerOpen: boolean;
  goToPage: (page: PAGE) => void;
} 

const Drawer = ({ isDrawerOpen, goToPage }: DrawerProps) => {
  const { cart, isLoading } = useCartStore();
  const cartItems = cart ? [...cart.confirmedItems, ...cart.pendingItems] : [];

  const isDeliveryThisWeek = () => {
    if (!cart?.nextDelivery) return false;
    const deliveryDate = dayjs(cart.nextDelivery);
    const today = dayjs();
    const diffDays = deliveryDate.diff(today, 'day');
    return diffDays <= 7;
};

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
        goToPage={() => goToPage(PAGE.DELIVERIES)}
        emptyTitle="No Delivery Schedule"
        emptySubtitle="Set up your delivery frequency to get started"
        emptyIcon={TbTruckDelivery}
        title="Next Delivery"
        emptyOnClick={() => goToPage(PAGE.DELIVERIES)}
        subtitle={isDeliveryThisWeek() 
          ? dayjs(cart?.nextDelivery).format('dddd, MMMM D, YYYY')
          : "No delivery this week"
      }
      icon={TbTruckDelivery}
      isEmpty={!cart?.nextDelivery}
      buttonText="View Deliveries"
      >
        <Calendar nextDelivery={cart?.nextDelivery} mode={CALENDAR_MODE.ONE_WEEK}/>
      </DrawerSection>}
    </AnimatePresence>
    
    {/* Cart Display */}
    <DrawerSection                         
      emptyOnClick={() => goToPage(PAGE.PRODUCTS)}
      emptyTitle="Your Cart is Empty"
      emptySubtitle="Select items to start building your cart"
      emptyIcon={TbShoppingCart}
      isEmpty={cartItems.length === 0}
      title="Your Cart"
      subtitle={`${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'}`}
      icon={TbShoppingCart}
      goToPage={() => goToPage(PAGE.CART)}
      buttonText="View Cart"
      >
      <DrawerCart cart={cart}/>
    </DrawerSection>

    {/* Confirm Button */}
    <AnimatePresence>
      {cart && <ConfirmButton cart={cart} isLoading={isLoading}/>}
    </AnimatePresence>

  </motion.div>
  )
}

export default Drawer;