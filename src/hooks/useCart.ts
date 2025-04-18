import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";


const useCart = () => {
    const { setInitialItems, setLoading } = useCartStore();

    useEffect(() => {
      const fetchInitialCart = async () => {
          try {
            setLoading(true);
            const items = await cartService.getCart();
            setInitialItems(items);
          } catch (error) {
            console.error('Error fetching initial cart:', error);
          } finally {
            setLoading(false);
          }
      };
  
      fetchInitialCart();
    }, [setInitialItems, setLoading]);
  
};

export default useCart;
