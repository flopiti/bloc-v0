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
import { DEFAULT_DELAY } from './constants/animations';

const START_WITH_DRAWER = false

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

  return (
    <div className="relative">

      <AnimatePresence>
        {!isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              delay: DEFAULT_DELAY/2,
              duration: 0.3
            }}
            >
            {currentView === PAGE.HOME && <Home />}
            {currentView === PAGE.DELIVERIES && <DeliveriesPage />}
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
