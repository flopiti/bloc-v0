import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Home from './Home';
import ShoppingCart from './ShoppingCart';
import './App.css';
const SHOPPING_CART_DELAY = 0.1;
const SHOPPING_CART_TRANSITION = {
  type: "tween",
  stiffness: 200,
  damping: 30,
  duration: SHOPPING_CART_DELAY
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="relative">
      <AnimatePresence>
        {!isCartOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ delay: SHOPPING_CART_DELAY}}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="full-screen bg-blue-500 text-white px-6 z-30 h-[3rem]" 
        initial={{ bottom: 0}}
        onClick={() => setIsCartOpen(!isCartOpen)}
        animate={{ 
          y: isCartOpen ? "calc(-100vh + 3rem)" : 0,
        }}
        transition={SHOPPING_CART_TRANSITION}
      >
        {isCartOpen ? "Close" : "Shopping Cart"}
      </motion.button>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
              className="full-screen z-20 h-[calc(100vh-3rem)] bottom-0"
            initial={{ y: "100%" }}
            animate={{ 
              y: isCartOpen ? 0 : "100%"
            }}
            exit={{ y: "100%" }}
            transition={SHOPPING_CART_TRANSITION}
          >
              <ShoppingCart />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
