import {  AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
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

const START_WITH_DRAWER = false

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(START_WITH_DRAWER)
  const [currentView, setCurrentView] = useState<PAGE>(PAGE.HOME)

  // Load initial data
  useCart();
  useProducts();

  const goHome = () => {
    setCurrentView(PAGE.HOME)
    setIsDrawerOpen(false)
  }

  const goToPage = (page: PAGE) => {
    setCurrentView(page)
    setIsDrawerOpen(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === PAGE.HOME && (
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
            <Home goToPage={goToPage} />
          </motion.div>
        )}
        {currentView !== PAGE.HOME && (
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
                goHome={goHome}
                rightElement={
                  <span className="px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm">
                    Biweekly
                  </span>
                }
              >
                <DeliveriesPage openDrawer={() => setIsDrawerOpen(true)} goToPage={goToPage} />
              </PageLayout>
            )}
            {currentView === PAGE.CART && (
              <PageLayout 
                title="Cart"
                goHome={goHome}
              >
                <CartPage goToPage={goToPage}/>  
              </PageLayout>
            )}
            {currentView === PAGE.PRODUCTS && (
              <PageLayout 
                title="Products"
                goHome={goHome}
              >
                <ProductsPage />
              </PageLayout>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Button */}
      {!isDrawerOpen && <DrawerButton isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />}

      {/* Drawer */}
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} goToPage={goToPage} />
    </div>
  )
}

export default App;
