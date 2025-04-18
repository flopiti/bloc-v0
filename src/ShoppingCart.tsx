const ShoppingCart = () => {

  
  return (
      <div className="p-4 bg-red-300 h-full">
        <div id="cart-items">
        </div>
        <div id="suggested-products" className="mt-4">
          <h2 className="text-xl font-bold mb-4">Suggested Products</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src="/milk.png" alt="Milk" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src="/eggs.png" alt="Eggs" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src="/cereal.png" alt="Cereal" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default ShoppingCart;