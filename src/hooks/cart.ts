import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";


const useCart = () => {
    const setInitialItems = useCartStore(state => state.setInitialItems);

    useEffect(() => {
      const fetchInitialCart = async () => {
          try {
            const items = await cartService.getCart();
            setInitialItems(items);
          } catch (error) {
            console.error('Error fetching initial cart:', error);
          }
        
      };
  
      fetchInitialCart();
    }, [ setInitialItems]);
  
};

export default useCart;
