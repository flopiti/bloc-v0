import './App.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main content */}
      <div className="p-4">
        <h1>Bloc Home Page</h1>
      </div>

      {/* Shopping Cart Button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg z-10"
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Shopping Cart
      </motion.button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-20"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsCartOpen(false)}
                >
                  Close
                </button>
              </div>
              {/* Cart content goes here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
