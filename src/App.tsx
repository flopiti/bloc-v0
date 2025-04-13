import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)


  const SHOPPING_CART_DELAY = 0.1;
  const SHOPPING_CART_TRANSITION = {
    type: "tween",
    stiffness: 200,
    damping: 30,
    duration: SHOPPING_CART_DELAY
  }
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {!isCartOpen && (
          <motion.div
            className="p-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ delay: SHOPPING_CART_DELAY}}
          >
            <h1>Bloc Home Page</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed left-0 right-0 bg-blue-500 text-white px-6 z-30 h-[3rem]" 
        initial={{ bottom: 0, y: 0 }}
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
            className="fixed left-0 right-0 z-20 h-[calc(100vh-3rem)] bottom-0"
            initial={{ y: "100%" }}
            animate={{ 
              y: isCartOpen ? 0 : "100%"
            }}
            exit={{ y: "100%" }}
            transition={SHOPPING_CART_TRANSITION}
          >
            <div className="p-4 bg-red-300 h-full">
              greger

              
              {/* Cart content goes here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
