import {  AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Home from './sections/Home';
import Drawer from './sections/Drawer';
import './App.css';
import useCart from './hooks/useCart';
import useItems from './hooks/useItems';
import { DrawerButton } from './components/DrawerButton';
import DeliveriesPage from './components/DeliveriesPage';
const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isDeliveriesOpen, setIsDeliveriesOpen] = useState(false)
  // Load initial data
  useCart();
  useItems();

  const handleOpenDeliveries = () => {
    setIsDeliveriesOpen(true)
    setIsDrawerOpen(false)
  }

  return (
    <div className="relative">

      {/* Home */}
      <AnimatePresence>
        {!isDrawerOpen && <Home />}
      </AnimatePresence>

      {/* Deliveries Page */}
      <AnimatePresence>
        {isDeliveriesOpen && <DeliveriesPage />}
      </AnimatePresence>

        {/* Drawer Button */}
        <DrawerButton isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && <Drawer isDrawerOpen={isDrawerOpen} />}
      </AnimatePresence>
    </div>
  )
}

export default App;
