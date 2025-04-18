import { useState } from 'react';

const ShoppingCart = () => {
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; name: string; image: string }[]>([]);
  
  const suggestedProducts = [
    { id: 1, name: 'Milk', image: '/milk.png' },
    { id: 2, name: 'Eggs', image: '/eggs.png' },
    { id: 3, name: 'Cereal', image: '/cereal.png' }
  ];

  const handleProductClick = (product: { id: number; name: string; image: string }) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  return (
      <div className="p-4 h-full">
        <div 
          id="cart-items" 
          className="bg-gray-200 p-4 rounded-lg min-h-[200px] relative"
        >
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url("/shopping_cart.png")',
              opacity: 0.2
            }}
          />
          {selectedProducts.length > 0 && (
            <div className="grid grid-cols-3 gap-4 relative z-10">
              {selectedProducts.map((product) => (
                <div key={product.id} className="aspect-square rounded-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="suggested-products" className="mt-4">
          <h2 className="text-xl font-bold mb-4">Suggested Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {suggestedProducts.map((product) => (
              <div 
                key={product.id} 
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ShoppingCart;