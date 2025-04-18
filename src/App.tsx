import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Home from './sections/Home';
import Drawer from './sections/Drawer';
import './App.css';

const SHOPPING_CART_DELAY = 0.25;
const BUTTON_HEIGHT = "3rem";
const DRAWER_TRANSITION = {
  type: "tween",
  stiffness: 200,
  damping: 30,
  duration: SHOPPING_CART_DELAY
}

const App = () => {
  const [isDrawerOpen, setIsCartOpen] = useState(true)

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
        {isDrawerOpen && (
          <motion.div
            className={`full-screen h-[calc(100vh-3rem)] bottom-0`}
            initial={{ y: "100%" }}
            animate={{ 
              y: isDrawerOpen ? 0 : "100%"
            }}
            exit={{ y: "100%" }}
            transition={DRAWER_TRANSITION}
          >
              <Drawer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App;
