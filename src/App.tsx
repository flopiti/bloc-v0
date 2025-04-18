import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Home from './sections/Home';
import Drawer, { DRAWER_TRANSITION, SHOPPING_CART_DELAY } from './sections/Drawer';
import './App.css';
import useCart from './hooks/useCart';
import useItems from './hooks/useItems';

const BUTTON_HEIGHT = "3rem";


const App = () => {
  const [isDrawerOpen, setIsCartOpen] = useState(false)

  // Load initial data
  useCart();
  useItems();

  return (
    <div className="relative">
      <AnimatePresence>
        {!isDrawerOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ delay: SHOPPING_CART_DELAY}}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`full-screen bg-blue-500 h-[3rem]`} 
        initial={{ bottom: 0}}
        onClick={() => setIsCartOpen(!isDrawerOpen)}
        animate={{ 
          y: isDrawerOpen ? `calc(-100vh + ${BUTTON_HEIGHT})` : 0,
        }}
        transition={DRAWER_TRANSITION}
      >
        {isDrawerOpen ? "Close" : "Shopping Cart"}
      </motion.button>

      <AnimatePresence>
        {isDrawerOpen && <Drawer isDrawerOpen={isDrawerOpen} />}
      </AnimatePresence>
    </div>
  )
}

export default App;
