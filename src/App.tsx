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

      <motion.button
        className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white px-6 py-3 z-30"
        onClick={() => setIsCartOpen(!isCartOpen)}
        animate={{ 
          y: isCartOpen ? "calc(-100vh + 3rem)" : 0,
          backgroundColor: isCartOpen ? "#ffffff" : "#3b82f6",
          color: isCartOpen ? "#374151" : "#ffffff"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
      >
        {isCartOpen ? "Close" : "Shopping Cart"}
      </motion.button>

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
