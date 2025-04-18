const ShoppingCart = () => {
  const suggestedProducts = [
    { id: 1, name: 'Milk', image: '/milk.png' },
    { id: 2, name: 'Eggs', image: '/eggs.png' },
    { id: 3, name: 'Cereal', image: '/cereal.png' }
  ];

  return (
      <div className="p-4  h-full">
        <div id="cart-items" className="bg-gray-200 p-4 rounded-lg">
          <img src="/shopping_cart.png" alt="Shopping Cart" className="w-32 h-32 opacity-50 mx-auto" />
        </div>
        <div id="suggested-products" className="mt-4">
          <h2 className="text-xl font-bold mb-4">Suggested Products</h2>
          <div className="grid grid-cols-3 gap-4">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="aspect-square rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ShoppingCart;