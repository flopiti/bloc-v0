import {  AnimatePresence, motion } from 'framer-motion'
import Home from '@/sections/Home';
import Drawer from '@/sections/Drawer';
import useCart from '@/hooks/useCart';
import useProducts from '@/hooks/useProducts';
import { DrawerButton } from '@/components/DrawerButton';
import DeliveriesPage from '@/sections/DeliveriesPage';
import { PAGE } from '@/enums/core';
import CartPage from '@/sections/CartPage';
import PageLayout from '@/components/PageLayout';
import ProductsPage from '@/sections/ProductsPage';
import { useNavigationStore } from '@/stores/navigationStore';

const App = () => {
  const { isDrawerOpen, currentView } = useNavigationStore();

  // Load initial data that will be be in stores
  useCart();
  useProducts();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === PAGE.HOME ?  (
          <motion.div
            key={currentView}
            initial={{ x: -390 }}
            animate={{ x: 0 }}
            exit={{ x: -390 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="w-full h-full"
          >
            <Home />
          </motion.div>
        ) : (
          <motion.div
            key={currentView}
            initial={{ x: 390 }}
            animate={{ x: 0 }}
            exit={{ x: 390 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="w-full h-full"
          > 
            {currentView === PAGE.DELIVERIES && (
              <PageLayout 
                title="Deliveries"
                rightElementText="Biweekly"
              >
                <DeliveriesPage />
              </PageLayout>
            )}
            {currentView === PAGE.CART && (
              <PageLayout title="Cart">
                <CartPage />  
              </PageLayout>
            )}
            {currentView === PAGE.PRODUCTS && (
              <PageLayout title="Products">
                <ProductsPage />
              </PageLayout>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Button */}
      {!isDrawerOpen && <DrawerButton />}

      {/* Drawer */}
      <Drawer />
    </div>
  )
}

export default App;
