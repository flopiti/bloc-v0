import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productService, Product } from '../services/productService';

const Drawer = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        setAllProducts(products);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const suggestedProducts = allProducts.filter(
    product => !selectedProducts.some(selected => selected.id === product.id)
  );

  const handleProductClick = (product: Product) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log('Order confirmed:', selectedProducts);
  };

  return (
      <div className="p-4 h-full relative">
        <div 
          id="cart-items" 
          className="bg-gray-200 p-4 rounded-lg min-h-[9rem] relative"
        >
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url("/shopping_cart.png")',
              opacity: 0.2
            }}
          />
          <AnimatePresence>
            {selectedProducts.length > 0 && (
              <div className="grid grid-cols-3 gap-4 relative z-10">
                {selectedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {suggestedProducts.length > 0 && (
            <motion.div 
              id="suggested-products" 
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Suggested Products</h2>
              <motion.div 
                className="grid grid-cols-3 gap-4"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {suggestedProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.5, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: 20 }}
                      transition={{ 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 right-4"
            >
              <motion.button
                onClick={handleConfirm}
                className="px-8 py-3 rounded-md text-white font-medium text-base relative overflow-hidden bg-black shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Confirm Order
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  )
}

export default Drawer;