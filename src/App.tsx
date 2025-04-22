import {  AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Home from './sections/Home';
import Drawer from './sections/Drawer';
import './App.css';
import useCart from './hooks/useCart';
import useItems from './hooks/useItems';
import { DrawerButton } from './components/DrawerButton';
import DeliveriesPage from './components/DeliveriesPage';
import { PAGE } from './enums/core';

const START_WITH_DRAWER = true

const App = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(START_WITH_DRAWER)
  const [currentView, setCurrentView] = useState<PAGE>(PAGE.HOME)

  // Load initial data
  useCart();
  useItems();

  const handleOpenDeliveries = () => {
    setCurrentView(PAGE.DELIVERIES)
    setIsDrawerOpen(false)
  }

  const goHome = () => {
    setCurrentView(PAGE.HOME)
    setIsDrawerOpen(false)
  }

  const goToPage = (page: PAGE) => {
    setCurrentView(page)
    setIsDrawerOpen(false)
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
      {currentView === PAGE.HOME && <Home goToPage={goToPage} />}

        {!isDrawerOpen && (
          <motion.div
            key={currentView}
            initial={{ x: 390 }}
            animate={{ x: 0 }}
            exit={{ x: 390 }}
            transition={{ 
              duration: 0.1,
              ease: "easeInOut"
            }}
            className="w-full"
            >
            {currentView === PAGE.DELIVERIES && <DeliveriesPage openDrawer={() => setIsDrawerOpen(true)} goHome={goHome} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Button */}
      <DrawerButton isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}  />

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && <Drawer isDrawerOpen={isDrawerOpen} handleOpenDeliveries={handleOpenDeliveries}  />}
      </AnimatePresence>
    </div>
  )
}

export default App;
