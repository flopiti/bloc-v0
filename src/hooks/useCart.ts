import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";


const useCart = () => {
    const { setCart, setLoading } = useCartStore();

    useEffect(() => {
      const fetchInitialCart = async () => {
          try {
            setLoading(true);
            const cart = await cartService.getCart();
            console.log(cart)
            setCart(cart);
          } catch (error) {
            console.error('Error fetching initial cart:', error);
          } finally {
            setLoading(false);
          }
      };
  
      fetchInitialCart();
    }, [setCart, setLoading]);
  
};

export default useCart;
