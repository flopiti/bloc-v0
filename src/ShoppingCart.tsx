import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShoppingCart = () => {
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; name: string; image: string }[]>([]);
  
  const allProducts = [
    { id: 1, name: 'Milk', image: '/milk.png' },
    { id: 2, name: 'Eggs', image: '/eggs.png' },
    { id: 3, name: 'Cereal', image: '/cereal.png' }
  ];

  const suggestedProducts = allProducts.filter(
    product => !selectedProducts.some(selected => selected.id === product.id)
  );

  const handleProductClick = (product: { id: number; name: string; image: string }) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
      <div className="p-4 h-full">
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
                    className="aspect-square rounded-lg overflow-hidden relative group"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveProduct(product.id)}
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
              <div className="grid grid-cols-3 gap-4">
                <AnimatePresence>
                  {suggestedProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  )
}

export default ShoppingCart;